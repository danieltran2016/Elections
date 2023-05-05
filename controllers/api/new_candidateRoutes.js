const router = require('express').Router();
const { Candidate } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newCandidate = await Candidate.create({
      ...req.body,
      votes: 0,
      user_id: req.session.user_id,
    });
    console.log(newCandidate);

    res.status(200).json(newCandidate);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;