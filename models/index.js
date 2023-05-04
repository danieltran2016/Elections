const User = require('./User');
const Candidate = require('./Candidate');

User.hasOne(Candidate, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Candidate.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Candidate };