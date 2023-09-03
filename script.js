function result() {
  let city = document.querySelector("#cityName").value;
  if (city === "") {
    alert("Enter the City Name...");
    return;
  }
  fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=7&key=34d92fae5c9a4c34905b68ee125a90cc`
  )
    .then((response) => response.json())
    .then((response) => {
      const div = document.createElement("p");
      div.innerHTML =
        response.city_name +
        "Latitude: " +
        response.lat +
        "Longitude: " +
        response.lon;
      document.getElementById("maindiv").appendChild(div);
      for (let data of response.data) {
        const div = document.createElement("p");
        div.innerHTML = "Temp: " + data.temp + " Date: " + data.datetime;
        document.getElementById("maindiv").appendChild(div);
      }
    })
    .catch((err) => alert("Error Occured"));
}

function currentlocation() {
  let lat = document.createElement("p");
  let lon = document.createElement("p");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat.innerHTML = "Latitude: " + position.coords.latitude;
      lon.innerHTML = "Longitude: " + position.coords.longitude;
      document.getElementById("maindiv").appendChild(lat);
      document.getElementById("maindiv").appendChild(lon);
      fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&days=7&key=34d92fae5c9a4c34905b68ee125a90cc`
      )
        .then((response) => response.json())
        .then((response) => {
          const div = document.createElement("p");
          div.innerHTML = "City: " + response.city_name;
          document.getElementById("maindiv").appendChild(div);
          for (let data of response.data) {
            const div = document.createElement("p");
            div.innerHTML = "Temp: " + data.temp + " Date: " + data.datetime;
            document.getElementById("maindiv").appendChild(div);
          }
        });
    });
  } else {
    alert("Sorry for the Inconvienece");
  }
}
