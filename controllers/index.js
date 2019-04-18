module.exports = {
  /* GET index */
  getIndex (req, res, next) {
    res.render('index');
  },
  /* POST Newsletter mail */
  postNewsletter (req, res, next) {
    res.send('POST /');
  },
  /* GET /contacto */
  getContact (req, res, next) {
    res.render('contact');
  },
  /* POST /contacto */
  postMessage (req, res, next) {
    res.send('POST /contacto');
  },
  /* GET /ingresar */
  getLoginForm (req, res, next) {
    res.render('login');
  },
  /* POST /ingresar */
  postLogin (req, res, next) {
    res.send('POST /ingresar');
  }
};
