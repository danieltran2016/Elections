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

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const candidateData = await Candidate.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!candidateData) {
      res.status(404).json({ message: 'No candidate found with this id!' });
      return;
    }

    res.status(200).json(candidateData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;