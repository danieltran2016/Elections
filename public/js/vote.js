const newVote = async function(event) {
    event.preventDefault();
    //get request to pull the number of votes currently on the candidate from database

    //post request to update the number +1 
    await fetch('/api/newCandidates/'+ this.value +"/votes",
    {
        method: 'POST'
    })   
    location.reload();
};

document
.querySelectorAll('.vote-button').forEach((button)=>{
    button.addEventListener('click',newVote)
})