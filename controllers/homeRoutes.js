const router = require('express').Router();
const { User, Candidate } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const candidateData = await Candidate.findAll({
      order: [['votes', 'DESC']],
    });

    const candidates = candidateData.map((candidate) => candidate.get({ plain: true }));
    //*if the user is logged in, then a req.session.user_id exists, then check whether the user is a candidate or not
    if (req.session.user_id){
      const candidate = await Candidate.findOne({
        where: { user_id: req.session.user_id },
      });
      const isCandidate = candidate !== null;

      //*check whehter the user has already voted or not
      const user = await User.findByPk(req.session.user_id);
      const voted = user.voted;

      res.render('homepage', {
        candidates,
        logged_in: req.session.logged_in,
        isCandidate,
        voted,
      });
    } else {
      res.render('homepage', {
        candidates,
        logged_in: req.session.logged_in,
      });
    }

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

// Withdraw from the election
router.delete('/withdraw', withAuth, async (req, res) => {
  console.log(req.session);
  try {
    const candidateData = await Candidate.destroy({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (candidateData === 0) {
      res.status(404).json({ message: 'No candidate found with this id!' });
      return;
    }
    
    res.status(200).json(candidateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// If the user try to login when already logged in, direct to homepage
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
