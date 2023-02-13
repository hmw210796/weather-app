window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}/?key=XP9PX7QL7XHTGMRJVD23WEH4Q`;

      fetch(api)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => console.log(data));
          }
        })
        .then((data) => {
          console.log(data);
          const { temp, conditions, icon } = data.currentConditions;
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = conditions;
          locationTimezone.textContent = data.timezone.replace(/_/g, " ");

          setIcons(icon, document.querySelector(".icon"));

          let celsius = (temp - 32) * (5 / 9);

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = celsius.toFixed(1);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }

  const setIcons = (icon, iconID) => {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});
