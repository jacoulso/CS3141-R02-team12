// A little clunky but it gets the job done.. :D
const routes = (app) => {
    app.route('/event')
      .get((req, res) =>
      res.send('GET request successful!'))
      .post((req, res) =>
      res.set('POST request successful!'));
    app.route('/event/:eventID')
      .put((req, res) =>
      res.send('PUT request successful!'))
      .delete((req, res) =>
      res.send('DELETE request successful'))
  };
  export default routes;