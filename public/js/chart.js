//const Chart = require('chart.js');
const canvas = document.getElementById('vote-chart');
const candidates = JSON.parse(canvas.dataset.candidates);
  
const candidateNames = candidates.map(candidate => candidate.name);
const candidateVotes = candidates.map(candidate => candidate.votes);

const ctx = document.getElementById('vote-chart');
const chart = new Chart(ctx, {
type: 'bar',
data: {
    labels: candidateNames,
    datasets: [{
    label: 'Votes',
    data: candidateVotes,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
    }]
},
options: {
    indexAxis: 'y',
}
});

