-- All code to create/propgate db should be called within here

CREATE DATABASE IF NOT EXISTS smartcal_mysqldb;
USE smartcal_mysqldb;

----------------------------------------------------------------------------
--  PURGE DB CODE HERE                                                    --
----------------------------------------------------------------------------
-- Since pretty much everything has a foreign key attached to something, we
-- have to drop everything in roguhly this order:
--
--  * Lookups
--  * Tables
--
-- ... and we need to do so in the order that they occur in this file. All
-- procedures get dropped in the order they occur, then lookups, and so on.
----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0; -- Disable warnings while we kill everything

-- Procedures
DROP PROCEDURE IF EXISTS purge_Times;
DROP PROCEDURE IF EXISTS find_Times;
DROP PROCEDURE IF EXISTS check_All;
DROP PROCEDURE IF EXISTS is_Available;
DROP PROCEDURE IF EXISTS is_DND;
DROP PROCEDURE IF EXISTS is_Event;
DROP PROCEDURE IF EXISTS friend_Search;
DROP PROCEDURE IF EXISTS user_Create;
DROP PROCEDURE IF EXISTS cal_Create;
DROP PROCEDURE IF EXISTS link_UserCal;
DROP PROCEDURE IF EXISTS create_DND;
DROP PROCEDURE IF EXISTS day_Convert;
DROP PROCEDURE IF EXISTS cal_getAll;
DROP PROCEDURE IF EXISTS cal_getOne;

-- Lookups
DROP TABLE IF EXISTS UserDoNotDisturbHoursLookup;
DROP TABLE IF EXISTS UserCalendarsLookup;
DROP TABLE IF EXISTS EventTypeLookup;
DROP TABLE IF EXISTS PriorityLookup;
DROP TABLE IF EXISTS EventColorLookup;
DROP TABLE IF EXISTS guestLookup;
DROP TABLE IF EXISTS friendLookup;
DROP TABLE IF EXISTS UserFriends;
DROP TABLE IF EXISTS PossibleTimes;

-- Tables
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Calendars;
DROP TABLE IF EXISTS Events;

SET FOREIGN_KEY_CHECKS = 1; -- Enable warnings 

----------------------------------------------------------------------------
--  TABLES/LOOKUPS                                                        --
----------------------------------------------------------------------------
CREATE TABLE Users (
    uID INT UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE, 
    password VARCHAR(256),
    email VARCHAR(256) UNIQUE
);

-- Users can have different DND hours on different days, and different DND 
-- hours on different time periods
CREATE TABLE UserDoNotDisturbHoursLookup (
    dndID INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    uID INT,
    startDate TIME,
    endDate TIME,
    recurrence VARCHAR(7),

    FOREIGN KEY (uID) REFERENCES Users(UID) ON DELETE CASCADE
);

----------------------------------------------------------------------------

-- Unique calendar ID's since multiple people "can" share a calendar
CREATE TABLE Calendars (
    cID INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    title VARCHAR(256)
);

-- 'calendars <-> users' is a many to many relationship
CREATE TABLE UserCalendarsLookup (
    cID INT,
    uID INT,
    
    FOREIGN KEY (cID) REFERENCES Calendars(cID) ON DELETE CASCADE,
    FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE,

    PRIMARY KEY (cID, uID)
);

----------------------------------------------------------------------------

CREATE TABLE EventTypeLookup (
    etID INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    typeName VARCHAR(50)
);

CREATE TABLE PriorityLookup (
    pID INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    priorityName VARCHAR(50)
);

-- stores a hexcode value without the leading #. #FFFFFF -> FFFFFF
CREATE TABLE EventColorLookup (
    ecID INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
        colorName VARCHAR(50) DEFAULT '',
    color VARCHAR(6) DEFAULT '000000' 
);

-- Event has to have a userID linked under the hood. Events are tied to a 
-- unique calendar. Single string consisting of unicode characters 
-- 'MTWRFSU' in any configuration, no spaces
CREATE TABLE Events (
    eID INT UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,     
    creatorID INT, 
    calendarID INT,
    colorID INT,
    title VARCHAR(256) NOT NULL, 
    isAllDay BOOLEAN DEFAULT False,
    dateTimeStart DATETIME,
    dateTimeEnd DATETIME,
    duration TIME,
    location VARCHAR(256),
    eventTypeID INT DEFAULT 1,
    priorityID INT DEFAULT 1,
    description TEXT,
    recurrence VARCHAR(7), 
    recurrenceEndDate DATETIME,

    FOREIGN KEY (eventTypeID) REFERENCES EventTypeLookup(etID), 
    FOREIGN KEY (priorityID) REFERENCES PriorityLookup(pID),
    FOREIGN KEY (calendarID) REFERENCES Calendars(cID) ON DELETE CASCADE,
    FOREIGN KEY (colorID) REFERENCES EventColorLookup(ecID) ON DELETE CASCADE,
    FOREIGN KEY (creatorID) REFERENCES Users(uID) ON DELETE CASCADE
);

----------------------------------------------------------------------------

-- Lookup to find any guests attached to the event
CREATE TABLE GuestLookup (
    eID INT,
    uID INT,
    goingStatus ENUM('No', 'Yes', 'Maybe'),

    FOREIGN KEY (eID) REFERENCES Events(eID) ON DELETE CASCADE,
    FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE,

    PRIMARY KEY (eID, uID)
);

-- Nobody is friends with themselves :D
CREATE TABLE FriendLookup (
    uID INT,
    friendID INT,

    FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE,
    FOREIGN KEY (friendID) REFERENCES Users(uID) ON DELETE CASCADE,

    PRIMARY KEY (uID, friendID)
);

-- Create an empty friend lookup table for use by the check_Friends procedure
CREATE TABLE UserFriends (
	friendID INT,
    friendNum INT NOT NULL UNIQUE AUTO_INCREMENT,
    
    FOREIGN KEY (friendID) REFERENCES Users(uID) ON DELETE CASCADE,
    
    PRIMARY KEY (friendID, friendNum)
);

-- Create an empty table to store potential meeting times
CREATE TABLE PossibleTimes (
	startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    timeNum INT NOT NULL UNIQUE AUTO_INCREMENT,
    numConflicts INT,
    conflictPriority INT,
    
    PRIMARY KEY (startTime, endTime, timeNum)
);

---------------------------------------------------------------------------- 
--  PROCEDURES                                                            --
----------------------------------------------------------------------------
delimiter //

-- Call after meeting times are proposed to purge the placeholder table
CREATE PROCEDURE purge_times()
	BEGIN
    DELETE FROM PossibleTimes;
    ALTER TABLE PossibleTimes AUTO_INCREMENT = 1;
    END //
    
-- Find the next possible meeting time
CREATE PROCEDURE find_Times(IN userID INT, IN includeFriends BOOLEAN, IN duration TIME, OUT numTimes INT)
	BEGIN
    DECLARE allAvailStart BOOLEAN DEFAULT true;
    DECLARE allAvailEnd BOOLEAN DEFAULT true;
    DECLARE startTime DATETIME DEFAULT now();
    DECLARE endTime DATETIME;
    DECLARE numTimes INT DEFAULT 0;
    SET startTime = concat(date_add(date(startTime), INTERVAL 1 DAY), '00:00:00');
    SET endTime = concat(date(startTime), duration);
    WHILE date(endTime) < date_add(date(now()), INTERVAL 8 DAY) DO
		SET allAvailStart = true;
        SET allAvailEnd = true;
        CALL check_All(userID, startTime, includeFriends, allAvailStart);
        CALL check_All(userID, endTime, includeFriends, allAvailEnd);
        IF (allAvailStart & allAvailEnd) THEN
			INSERT INTO PossibleTimes values(startTime, endTime, 0, 0);
            SET numTimes = numTimes + 1;
        END IF;
    END WHILE;
    END //
    
-- Check the availability of the user and optionally all their friends
CREATE PROCEDURE check_All(IN userID INT, IN currentTime DATETIME, IN includeFriends BOOLEAN, INOUT allAvail BOOLEAN)
	BEGIN
    DECLARE isAvail BOOLEAN DEFAULT true;
    DECLARE nextFriend INT DEFAULT 0;
    DECLARE numFriends INT DEFAULT 0;
    CALL is_Available(userID, currentTime, isAvail);
    IF (includeFriends & isAvail) THEN
		SELECT count(*) INTO numFriends FROM FriendLookup WHERE uID = userID;
        INSERT INTO UserFriends (SELECT * FROM FriendLookup WHERE uID = userID);
		nextFriend: LOOP
			SET nextFriend = nextFriend + 1;
			IF (nextFriend < numFriends) THEN
				CALL is_Available((SELECT friendID FROM UserFriends WHERE friendNum = nextFriend), currentTime, isAvail);
				IF (isAvail) THEN
					ITERATE nextFriend;
				END IF;
			END IF;
			LEAVE nextFriend;
		END LOOP;
	END IF;
    DELETE FROM UserFriends;
    ALTER TABLE UserFriends AUTO_INCREMENT = 1;
    SET allAvail = isAvail;
    END //
    
-- Determine whether a user is currently available at a given time
CREATE PROCEDURE is_Available(IN userID INT, IN currentTime DATETIME, INOUT isAvail BOOLEAN)
	BEGIN
    DECLARE isDND BOOLEAN DEFAULT false;
    DECLARE isEvent BOOLEAN DEFAULT false;
    CALL is_DND(userID, currentTime, isDND);
    CALL is_Event(userID, currentTime, isEvent);
    IF (isDND | isEvent) THEN
		SET isAvail = false;
	END IF;
    END //

-- Determine whether a user is in DND hours
CREATE PROCEDURE is_DND(IN userID INT, IN currentTime DATETIME, INOUT isDND BOOLEAN)
	BEGIN
    DECLARE dayWeek CHAR(1) DEFAULT dayofweek(DATE(currentTime));
    CALL day_Convert(dayWeek);
    IF (SELECT count(*) FROM UserDoNotDisturbHoursLookup WHERE uID = userID
        AND recurrence LIKE concat('%', @dayWeek, '%')) THEN
		SET isDND = false;
	ELSEIF ((SELECT count(*) FROM UserDoNotDisturbHoursLookup WHERE uID = userID AND
			 startDate <= TIME(currentTime) AND endDate >= TIME(currentTime)) > 0) THEN
		SET isDND = true;
	END IF;
    END //
    
-- Determine whether a user has a conflicting event
CREATE PROCEDURE is_Event(IN userID INT, IN currentTime DATETIME, INOUT isEvent BOOLEAN)
	BEGIN
    IF ((SELECT count(*) FROM Events WHERE creatorID = userID
         AND dateTimeStart <= currentTime AND dateTimeEnd >= currentTime) > 0) THEN
		SET isEvent = true;
	ELSE
		SET isEvent = false;
	END IF;
    END //

-- Search for friends by username or email
CREATE PROCEDURE friend_Search(IN keyword varchar(128))
	BEGIN
    SELECT username FROM Users WHERE username LIKE concat('%', @keyword, '%') OR email LIKE concat('%', @keyword, '%');
    END //
    
-- Create a user and their default calendar
CREATE PROCEDURE user_Create(IN newName varchar(100), IN newPass varchar(256), IN newMail varchar(256))
	BEGIN
    DECLARE userID INT DEFAULT 0;
    INSERT INTO Users (username, password, email) values(newName, newPass, newMail);
    SELECT LAST_INSERT_ID() INTO userID;
    CALL cal_Create(userID, newName);
    END //

-- Insert a new calendar into the table and link it to the provided userID
CREATE PROCEDURE cal_Create(IN userID INT, IN calTitle varchar(256))
	BEGIN
    INSERT INTO Calendars (title) values(calTitle);
    CALL link_UserCal(userID, calTitle);
    END //

-- Link a user's ID to a calendar using a lookup
CREATE PROCEDURE link_UserCal(IN userID INT, IN calTitle varchar(256))
	BEGIN
    DECLARE calID INT DEFAULT 0;
    SELECT LAST_INSERT_ID() INTO calID;
    INSERT INTO UserCalendarsLookup values(calID, userID);
    END //
    
-- Insert new DND hours for a user
CREATE PROCEDURE create_DND(IN startTime DATETIME, IN endTime DATETIME, IN recur VARCHAR(7))
	BEGIN
    IF (DATE(startTime) = DATE(endTime)) THEN
		INSERT INTO UserDoNotDisturbHoursLookup values(TIME(startTime), TIME(endTime), recur);
	ELSE
		INSERT INTO UserDoNotDisturbHoursLookup values(TIME(startTime), '23:59:59', recur);
        INSERT INTO UserDoNotDisturbHoursLookup values('00:00:00', TIME(endTime), recur);
	END IF;
    END //
    
-- Convert a day of week number to its corresponding Unicode character
CREATE PROCEDURE day_Convert(INOUT dayWeek CHAR(1))
	BEGIN
    CASE
		WHEN dayWeek = '1' THEN SET dayWeek = 'U';
        WHEN dayWeek = '2' THEN SET dayWeek = 'M';
		WHEN dayWeek = '3' THEN SET dayWeek = 'T';
        WHEN dayWeek = '4' THEN SET dayWeek = 'W';
        WHEN dayWeek = '5' THEN SET dayWeek = 'R';
        WHEN dayWeek = '6' THEN SET dayWeek = 'F';
        ELSE SET dayWeek = 'S';
	END CASE;
    END //

-- Retrieve all calendars associated with a certain user
CREATE PROCEDURE cal_getAll(IN userID INT)
	BEGIN
    SELECT cID FROM UserCalendarsLookup WHERE uID = userID;
    END //

-- Retrieve information of a certain calendar of a given user
CREATE PROCEDURE cal_getOne(IN userID INT, IN calTitle varchar(256)) 
	BEGIN
    SELECT * FROM Calendars WHERE calTitle IN (SELECT * FROM UserCalendarsLookup WHERE uID = userID);
    END //


---------------------------------------------------------------------------- 
--  SEEDERS                                                               --
----------------------------------------------------------------------------

-- Fill our lookups so we can call other propogation procedures
INSERT INTO EventTypeLookup (etID, typeName) VALUES 
    (1,'Event'),
    (2,'Reminder'),
    (3,'Task')
//

INSERT INTO PriorityLookup (pID, priorityName) VALUES
    (1,'Highest'),
    (2,'High'),
    (3,'Medium'),
    (4,'Low'),
    (5,'Lowest')
//

INSERT INTO EventColorLookup (ecID, colorName, color) VALUES 
    (1,'Red','FF0000'),
    (2,'Green','00FF00'),
    (3,'Blue','0000FF')
//
