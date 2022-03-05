// Build queries in reference to 'smartcal_mysqldb.users' table
// users (id, username, password, email)
const USER_QUERY = {
  SELECT_USER: 'SELECT * FROM users ORDER BY email DESC LIMIT 100',
  SELECT_USER: 'SELECT * FROM users WHERE id = ?',
  SELECT_USER: 'SELECT * FROM users WHERE email = ?',
  SELECT_USER: 'SELECT * FROM users WHERE username = ?',
  CREATE_USER: 'INSERT INTO users(id, username, password, email) VALUES (?, ?, ?, ?)',
  CREATE_USER: 'INSERT INTO users(username, password, email) VALUES (?, ?, ?)',
  UPDATE_USER: 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
  UPDATE_USER: 'UPDATE users SET password = ? WHERE id = ?',
  UPDATE_USER: 'UPDATE users SET username = ? WHERE id = ?',
  UPDATE_USER: 'UPDATE users SET email = ? WHERE id = ?',
  DELETE_USER: 'DELETE FROM users WHERE id = ?',
  CREATE_USER: 'CALL create_and_return(?, ?, ?, ?)' // Reference to procedure >> database/init.sql
};

export default USER_QUERY;