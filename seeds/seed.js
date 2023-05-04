const sequelize = require('../config/connection');
const { User, Candidate } = require('../models');

const userData = require('./userData.json');
const candidateData = require('./candidateData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Candidate.bulkCreate(candidateData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
