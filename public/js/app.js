const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");


weatherform.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = search.value;

    messageOne.textContent  = "Loading...";
    messageTwo.textContent  = "";

    //document.querySelector("#year").innerText = parseInt(document.querySelector("#year").innerText) +1;
    //console.log(location)
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent  = data.error;
                //console.log(data.error)
            } else {
                messageOne.textContent  = data.location;
                messageTwo.textContent  = data.forecast;
                search.value = "";
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })
})

