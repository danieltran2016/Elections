const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#candidate-name').value.trim();
    const vision = document.querySelector('#candidate-vision').value.trim();
    const education = document.querySelector('#candidate-education').value.trim();
    const work_experience = document.querySelector('#candidate-work-experience').value.trim();
    const email = document.querySelector('#candidate-email').value.trim();
    console.log(name);
    console.log(email);
  
    if (name && vision && education && work_experience && email) {
      const response = await fetch('/api/newCandidates',{
        method: 'POST',
        body: JSON.stringify({ name, vision, education, work_experience, email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create candidate');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/newCandidates/${id}`, {
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
    .querySelector('.new-candidate-form')
    .addEventListener('submit', newFormHandler);

    document
    .querySelector('.withdraw-button')
    .addEventListener('click', delButtonHandler);
    
  

  