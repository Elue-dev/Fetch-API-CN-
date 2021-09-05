document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  const number = document.querySelector('input[type="number"]').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      
      let output = '';

      if(response.type === 'success') {
        response.value.forEach(function(joke){
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += '<li>Something went wrong</li>';
      }

      document.querySelector('.jokes').innerHTML = output;
    }
  }

  if(number === ''){
      const error = document.querySelector('.error');
    error.textContent = 'Enter the amount of jokes you want to be fetched';
    error.style.paddingBottom = '1rem';
}

setTimeout( () => document.querySelector('.error').remove(), 3000 );
 
  xhr.send();

  e.preventDefault();
}

