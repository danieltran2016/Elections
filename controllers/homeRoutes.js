const router = require('express').Router();
const { User, Candidate } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const candidateData = await Candidate.findAll({
      order: [['votes', 'DESC']],
    });

    const candidates = candidateData.map((candidate) => candidate.get({ plain: true }));
    //console.log(candidates);
    res.render('homepage', {
      candidates,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/candidate/:id', async (req, res) => {
  try {
    const candidateData = await Candidate.findByPk(req.params.id);

    const candidate = candidateData.get({ plain: true });

    res.render('profile', {
      ...candidate,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to run for the election
router.get('/newCandidate', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('new_candidate_form', {
      ...user,
      logged_in: true
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

router.delete('/login', (req, res) => {
  console.log(req);
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
