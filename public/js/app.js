console.log("Client side javascript has been loaded.")

// //Sample JSON retrieval
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


//Grab form and input from the index template
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#ErrorP')
const messageTwo = document.querySelector('#SuccessP')

messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) =>  {
    //prevent the default refresh of the browser on event click
    e.preventDefault()
    //store the search value
    const location = searchElement.value
    //Fetch weather data
    url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'In ' + data.location + ' it is currently'
                messageTwo.textContent = data.forecast.temp + ' degrees fahrenheit'
                console.log(data)
            }
        })
    })
})