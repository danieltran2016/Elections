const router = require('express').Router();
const { Candidate } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newCandidate = await Candidate.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCandidate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id/votes', async (req, res) => {
  const candidate = await Candidate.findByPk(
    req.params.id 
  )
 await candidate.increment('votes') 
 res.send('response')
});


module.exports = router;