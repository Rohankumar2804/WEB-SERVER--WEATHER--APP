//GOAL FETCH WEATHER
//SET UP A CALL TO FETCH WEATHER OF JARANG RAMPUR
// GET THE PARSED JSON RESPONSE
//-> IF ERROR
//PRINT Error
//PRINT FORCAST

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageone = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  //console.log(location);
  messageone.textContent = "Loading.....";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageone.textContent = data.error;
        } else {
          //   console.log(data);
          messageone.textContent = data.location;
          messageTwo.textContent = data.forecast;
          // console.log(data.location);
          //console.log(data.forecast);
        }
      });
    }
  );
  setTimeout(() => {
    search.value = "";
  }, 2000);
  // ;
  // console.log("testing");
});
