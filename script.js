async function result() {
  try {
    let city = document.querySelector("#cityName").value;
    if (city === "") {
      alert("Enter the City Name...");
      return;
    }
    let res = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=7&key=79dd552789a842ce80a52ee08423af8f`
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
      "<br>" +
      " Latitude: " +
      res.lat +
      "<br>" +
      " Longitude: " +
      res.lon;
    document.getElementById("maindiv").appendChild(div);
    const degree = "\u00B0";
    let noofdays = 1;
    for (let data of res.data) {
      const div = document.createElement("p");
      div.innerHTML =
        "   Day: " +
        noofdays +
        "<br>" +
        " Date: " +
        data.datetime +
        "<br>" +
        " Temp: " +
        data.temp +
        degree +
        "C " +
        "<br>" +
        " Description: " +
        data.weather.description;
      noofdays += 1;
      let days = data.weather.icon;
      const img = document.createElement("img");
      img.src = `./icons/${days}.png`;
      div.appendChild(img);
      document.getElementById("maindiv").appendChild(div);
    }
  } catch (err) {
    alert("Error Occured");
  }
  document.getElementById("cityName").style.display = "none";
  document.getElementById("currentlocation").style.display = "none";
  document.getElementById("result").style.display = "none";
  document.getElementById("reset").style.display = "block";
  document.getElementById("space").style.display = "none";
}

function currentlocation() {
  let lat = document.createElement("p");
  let lon = document.createElement("p");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat.innerHTML = "Latitude: " + position.coords.latitude;
        lon.innerHTML = "Longitude: " + position.coords.longitude;
        fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&days=7&key=79dd552789a842ce80a52ee08423af8f`
        )
          .then((response) => response.json())
          .then((response) => {
            const div = document.createElement("p");
            div.innerHTML = "City: " + response.city_name;
            document.getElementById("maindiv").appendChild(div);
            document.getElementById("maindiv").appendChild(lat);
            document.getElementById("maindiv").appendChild(lon);
            const degree = "\u00B0";
            let noofdays = 1;
            for (let data of response.data) {
              const div = document.createElement("p");
              div.innerHTML =
                "Day: " +
                noofdays +
                "<br>" +
                " Date: " +
                data.datetime +
                "<br>" +
                " Temp: " +
                data.temp +
                degree +
                " C " +
                "<br>" +
                "  Description: " +
                data.weather.description;
              noofdays += 1;
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
  document.getElementById("cityName").style.display = "none";
  document.getElementById("currentlocation").style.display = "none";
  document.getElementById("result").style.display = "none";
  document.getElementById("reset").style.display = "block";
  document.getElementById("space").style.display = "none";
}

function reset() {
  location.reload();
}
