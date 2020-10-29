var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=MYTOKENHERE";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
    handleResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const handleResponse = (requestResponse) => {
  const jsonified = JSON.parse(requestResponse);
  const plantsArray = jsonified.data;

  plantNames = plantsArray.filter((arrayItem) => {
    return arrayItem.year > 1753;
  })

  const myPlants = plantNames.map(arrayItem => arrayItem.common_name);
  addPlants(myPlants);
  
  console.log(myPlants);
}

// const displayDiv = () => {
//   const wrapperDiv = document.createElement("div");
//   wrapperDiv.setAttribute("id", "wrapper");
//   const header = document.createElement("h1");
//   header.innerText = "Plants from 1753";
//   wrapperDiv.appendChild(header);
//   document.getElementById("plants").appendChild(wrapperDiv);
// }

const addPlants = (myPlants) => {
  const myDiv = document.createElement("div");
  myDiv.setAttribute("id", "wrapper");
  const plant = document.createElement("h3");
  const header = document.createElement("h1");
  header.innerText = "Plants from 1753:";
  plant.innerText = myPlants[0] + '\n' + myPlants[1] + '\n' + myPlants[2];
  myDiv.appendChild(header);
  myDiv.appendChild(plant);
  document.getElementById("plants").appendChild(myDiv);
}
