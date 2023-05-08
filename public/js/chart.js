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
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
    datalabels: {
        color: 'blue',
        font: {
            weight: 'bold',
            size: 25
        }
    }
    }]
},
options: {
    indexAxis: 'y',
    maintainAspectRatio: false
},
plugins:[ChartDataLabels]
});

