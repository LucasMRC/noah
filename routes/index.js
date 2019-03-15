const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// INDEX ROUTE

router.get('/', (req, res) => {
  res.render('index');
});

// NEWSLETTER POST ROUTE

router.post('/', (req, res) => {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  mailOpts = {
    from: 'Newsletter NOAH.com',
    to: process.env.MAIL_USER,
    subject: 'NEWSLETTER de NOAH.com',
    text: `Tienes un nuevo contacto para la lista de newsletter. Recuerda agregarlo para enviarle novedades y promociones! \nEl nuevo mail es ${
      req.body.newsletter
    }.`
  };
  smtpTrans.sendMail(mailOpts, (err, response) => {
    if (err) {
      console.log(err);
      req.flash(
        'error',
        'Ha habido un error, por favor intente nuevamente más tarde'
      );
    } else {
      req.flash('success', 'Mail Enviado!');
      res.redirect('back');
    }
  });
});

// CONTACT ROUTE

router.get('/contacto', (req, res) => {
  res.render('contact');
});

// MESSAGE POST ROUTE

router.post('/contacto', (req, res) => {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.MAIL_USER,
    subject: 'Tienes un nuevo mensaje de NOAH.com',
    text: `\n\n ${req.body.name} (${req.body.email}) dice: \n\n\t\t ${
      req.body.message
    }\n\n`
  };
  smtpTrans.sendMail(mailOpts, (err, response) => {
    if (err) {
      console.log(err);
      req.flash(
        'error',
        'Ha habido un error, por favor intente nuevamente más tarde'
      );
    } else {
      req.flash('success', 'Mensaje Enviado!');
      res.redirect('/');
    }
  });
});

module.exports = router;
