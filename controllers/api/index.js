const router = require('express').Router();
const userRoutes = require('./userRoutes');
const newCandidate = require('./new_candidateRoutes');

router.use('/users', userRoutes);
router.use('/candidates', newCandidate);

module.exports = router;
