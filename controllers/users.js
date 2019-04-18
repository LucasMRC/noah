module.exports = {
  /* GET / */
  getWelcome (req, res, next) {
    res.send('GET /');
  },
  /* GET /salir */
  getLogout (req, res, next) {
    res.send('GET /salir');
  }
};
