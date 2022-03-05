import HttpStatus from '../config/httpstatus.config.js';
import USER_QUERY from '../queries/users.query.js';
import database from '../config/mysql.config.js';
import Response from './response.js';
import logger from '../util/logger.js';


// ---------------------------------------------------------------------------
// USER FUNCTIONS ----- WIP.....
// ---------------------------------------------------------------------------

// Create a new user
export const createUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating user...`);
    database.query(USER_QUERY.CREATE_USER, Object.values(req.body), (error, results) => {
      if (!results) {
        logger.error(error.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred.`));
      } else {
        const userData = results[0][0];
        res.status(HttpStatus.CREATED.code)
          .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `User created.`, { userData }));
      }
    });
  };

// Load a list of users
export const getUsers = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching user(s)...`);
  database.query(USER_QUERY.SELECT_USER, (error, results) => {
    if (!results) {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No user(s) found.`));
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `User(s) retrieved.`, { userData: results }));
    }
  });
};

// Get a specific user
export const getUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching user(s)...`);
  database.query(USER_QUERY.SELECT_USER, [req.params.id], (error, results) => {
    if (!results[0]) {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `User by id ${req.params.id} was not found.`));
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `User retrieved.`, results[0]));
    }
  });
};

// Update a given user's info
export const updateUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching user...`);
  database.query(USER_QUERY.SELECT_USER, [req.params.id], (error, results) => {
    if (!results[0]) {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `User by id ${req.params.id} was not found.`));
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating user...`);
      database.query(USER_QUERY.UPDATE_USER, [...Object.values(req.body), req.params.id], (error, results) => {
        if (!error) {
          res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `User updated.`, { id: req.params.id, ...req.body }));
        } else {
          logger.error(error.message);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred.`));
        }
      });
    }
  });
};

// Remove user
export const deleteUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting user...`);
  database.query(USER_QUERY.DELETE_USER, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `User deleted.`, results[0]));
    } else {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `User by id ${req.params.id} was not found.`));
    }
  });
};

