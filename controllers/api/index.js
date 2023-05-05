const router = require('express').Router();
const userRoutes = require('./userRoutes');
const new_candidateRoutes = require('./new_candidateRoutes');

router.use('/users', userRoutes);
router.use('/newCandidates', new_candidateRoutes);

module.exports = router;
