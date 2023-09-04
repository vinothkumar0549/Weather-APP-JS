async function result() {
  try {
    let city = document.querySelector("#cityName").value;
    if (city === "") {
      alert("Enter the City Name...");
      return;
    }
    let res = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=7&key=34d92fae5c9a4c34905b68ee125a90cc`
    );
    res = await res.json();
    if (res.city_name.length != city.length) {
      alert("Enter the Correct City Name...");
      document.getElementById("cityName").value = "";
      return;
    }
    const div = document.createElement("p");
    div.innerHTML =
      "City: " +
      res.city_name +
      " Latitude: " +
      res.lat +
      " Longitude: " +
      res.lon;
    document.getElementById("maindiv").appendChild(div);
    for (let data of res.data) {
      const div = document.createElement("p");
      div.innerHTML =
        "Temp: " +
        data.temp +
        " Date: " +
        data.datetime +
        " Description: " +
        data.weather.description;
      let days = data.weather.icon;
      const img = document.createElement("img");
      img.src = `./icons/${days}.png`;
      div.appendChild(img);
      document.getElementById("maindiv").appendChild(div);
    }
  } catch (err) {
    alert("Error Occured");
  }
  document.getElementById("cityName").value = "";
}

function currentlocation() {
  let lat = document.createElement("p");
  let lon = document.createElement("p");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
              div.innerHTML =
                "Temp: " +
                data.temp +
                "  Date: " +
                data.datetime +
                "  Description: " +
                data.weather.description;
              let days = data.weather.icon;
              const img = document.createElement("img");
              img.src = `./icons/${days}.png`;
              div.appendChild(img);
              document.getElementById("maindiv").appendChild(div);
            }
          });
      },
      (err) => alert("Not Access to the Location")
    );
  } else {
    alert("Sorry for the Inconvienece");
  }
}
