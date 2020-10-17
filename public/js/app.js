// const url = 'http://localhost:3000/weather?address=tempe';
const output = document.querySelector('#output');
const error = document.querySelector('#error');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    output.textContent = 'loading...';
    error.textContent = '';

    const location = search.value;

    const url = 'http://localhost:3000/weather?address=';

    fetch(url + location)
    .then((res) => res.json()
    .then((data) => {
        if (data.error) {
            error.textContent = data.error;
            } else {
                output.textContent = data.forecast;
            }
        })
    )
});
 

