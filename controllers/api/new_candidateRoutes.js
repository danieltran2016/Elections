const router = require('express').Router();
const { User, Candidate } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newCandidate = await Candidate.create({
      ...req.body,
      votes: 0,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCandidate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id/votes', async (req, res) => {
  const candidate = await Candidate.findByPk(req.params.id);

  await candidate.increment('votes');

  await User.update(
    { Voted: true },
    { where: { id: req.session.user_id } }
  );

  res.send('response');
});

// router.post('/:id/votes', async (req, res) => {
//   const candidate = await Candidate.findByPk(
//     req.params.id 
//   )

//   if (req.session.voted) {
//     return res.status(403).send('User has already voted')
//   }

//  await candidate.increment('votes')
//  req.session.voted = true
//  req.session.save()
//  res.send('response')
// });


module.exports = router;