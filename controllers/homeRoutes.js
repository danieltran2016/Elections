const router = require('express').Router();
const { User, Candidate } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const candidateData = await Candidate.findAll({
      order: [['votes', 'DESC']],
    });

    const candidates = candidateData.map((candidate) => candidate.get({ plain: true }));

    res.render('homepage', {
      candidates,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
