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

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/api/newCandidates/1`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete candidate');
      }
    }
  };

document
.querySelectorAll('.vote-button').forEach((button)=>{
    button.addEventListener('click',newVote)
})

document
.querySelectorAll('.withdraw-button').forEach((button)=>{
  console.log(button);
    button.addEventListener('click', delButtonHandler)
});