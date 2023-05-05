const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#candidate-name').value.trim();
    const vision = document.querySelector('#candidate-vision').value.trim();
    const education = document.querySelector('#candidate-education').value.trim();
    const work_experience = document.querySelector('#candidate-work-experience').value.trim();
    const email = document.querySelector('#candidate-email').value.trim();

  
    if (name && vision && education && work_experience && email) {
      const response = await fetch(`/api/new_candidateRoutes`, {
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
  
 
  
  document
    .querySelector('.new-candidate-form')
    .addEventListener('submit', newFormHandler);
  

  