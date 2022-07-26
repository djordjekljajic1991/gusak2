import { getJSON } from "./helpers.js";
import { URL_FORECAST, URL_TODAY } from "./config.js";
import { async } from "regenerator-runtime";
const spinner = document.querySelector(".spinner");
const containerIndex = document.querySelector(".container");
let forecast7Days = document.querySelector(".forecast__modal_box");
const body = document.querySelector("body");
let url = window.location.href.split("/");
const urlLocation = Object.values(url)[Object.keys(url).length - 1];

export let galleryData = "";
export const state = {
  weather: {},
  forecast: {},
  gallery: "",
};

const tempEl = document.querySelector(".temp");

const createWeatherObject = function (data) {
  const weather = data.response.ob;
  const icon2x = `${data.response.ob.icon.split(".")[0]}@2x.png`;

  return {
    tempC: weather.tempC,
    weather: weather.weather,
    icon: weather.icon,
    icon2x: icon2x,
    windSpeedKPH: weather.windSpeedKPH,
    humidity: weather.humidity,
    visibilityKM: weather.visibilityKM,
    pressureMB: weather.pressureMB,
    pop: weather.pop,
  };
};

export const loadWeather = async function () {
  try {
    const data = await getJSON(`${URL_TODAY}`);

    state.weather = createWeatherObject(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

const createForecastObject = function (data) {
  const days = data.response[0].periods.map((day) => {
    const icon2x = `${day.icon.split(".")[0]}@2x.png`;
    return {
      maxTempC: day.maxTempC,
      minTempC: day.minTempC,
      icon: day.icon,
      icon2x: icon2x,
      windDir: day.windDir,
      windSpeedKPH: day.windSpeedKPH,
      humidity: day.humidity,
      pressureMB: day.pressureMB,
      visibilityKM: day.visibilityKM,
      pop: day.pop,
      dateTimeISO: day.dateTimeISO,
    };
  });
  return {
    days,
  };
};

export let loadForecast = async function () {
  try {
    const data = await getJSON(`${URL_FORECAST}`);

    state.forecast = createForecastObject(data);
  } catch (err) {
    console.error(`${err} bum bam bum`);
    throw err;
  }
};
const weatherTodayDetails = function () {
  const detailsBox = document.querySelector(".today--details");
  const markup = ` <li>Vjetar: ${state.weather.windSpeedKPH} km/h</li>
  <li>Vjer. padavina: ${state.forecast.days[0].pop}%</li>
  <li>Vlažnost: ${state.weather.humidity}%</li>
  <li>Vidljivost: ${Math.round(state.weather.visibilityKM)} km</li>
  <li>Pritisak: ${state.weather.pressureMB} mB</li>`;

  detailsBox.insertAdjacentHTML("afterbegin", markup);
};

const createWeatherIcon = function (data, day) {
  const iconEL = document.querySelector(day);
  let markup;
  //const markup = `<img class="weather"  srcset="./src/img/icons/weather/${state.weather.icon} 1x,
  //./src/img/icons/weather/${state.weather.icon2x} 2x"></img>`;
  if (data === state.weather) {
    markup = `<img class="weather"  src="/src/img/icons/weather/${data.icon2x}"></img>
    <div class="tempa" >
    <p class="temp" >${data.tempC}°C</p>
    </div>
    `;
  } else {
    markup = `
    <img class="weather"  src="/src/img/icons/weather/${data.icon2x}"></img>
    <div class="temp" >
      <p class="tempa" >${data.minTempC}°C</p>
      <p class="tempa" >${data.maxTempC}°C</p>
    </div>
                  `;
  }
  iconEL.insertAdjacentHTML("afterbegin", markup);
};

const createWeatherDetails = async function (data, day) {
  try {
    const detailsBox = document.querySelector(day);
    const markup = ` 
  <li>Vjetar: ${data.windSpeedKPH} km/h</li>
  <li>Vjer. padavina: ${data.pop}%</li>
  <li>Smijer vjetra: ${data.windDir}</li>
  <li>Vlažnost: ${data.humidity}%</li>
  <li>Vidljivost: ${Math.round(data.visibilityKM)} km</li>
  <li>Pritisak: ${data.pressureMB} mB</li>
  `;
    detailsBox.insertAdjacentHTML("beforeend", markup);
  } catch (err) {
    console.error(err);
  }
};

const controlWeather = async function () {
  try {
    await loadWeather();
    await loadForecast();

    createWeatherIcon(state.weather, ".today");
    weatherTodayDetails();

    createWeatherIcon(state.forecast.days[1], ".tomorrow");

    //weatherTomorrowDetails();
    createWeatherDetails(state.forecast.days[1], ".tomorrow--details");
  } catch (err) {
    console.error(err);
  }
};
if (urlLocation !== "gallery.html") {
  controlWeather();
}

/////////////
const createForecast = async function (data) {
  let markup;
  //const markup = `<img class="weather"  srcset="./src/img/icons/weather/${state.weather.icon} 1x,
  //./src/img/icons/weather/${state.weather.icon2x} 2x"></img>`;

  let today = new Date().toLocaleDateString("sr-SR");
  let forecastDate = new Date(data.dateTimeISO).toLocaleDateString("sr-SR");
  console.log(today);
  let tomorrow = new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toLocaleDateString("sr-SR");

  let date;
  const getDatum = function () {
    if (today === forecastDate) date = "Danas";
    else if (tomorrow === forecastDate) date = "Sutra";
    else date = forecastDate;
  };
  getDatum();
  console.log(date);
  try {
    markup = `
    <div class ="forecast--grid"> 
    <img class="weather"  src="/src/img/icons/weather/${data.icon2x}"></img>
    <div class="temp" >
      <p class="tempa" >${data.minTempC}°C</p>
      <p class="tempa" >${data.maxTempC}°C</p>
    </div>
     <h3 class="heading-3">${date}
      </h3>
  
     <ul class="tomorrow--details lists">
      <li>Vjetar: ${data.windSpeedKPH} km/h</li>
      <li>Vjer. padavina: ${data.pop}%</li>
      <li>Smijer vjetra: ${data.windDir}</li>
      <li>Vlažnost: ${data.humidity}%</li>
      <li>Vidljivost: ${Math.round(data.visibilityKM)} km</li>
      <li>Pritisak: ${data.pressureMB} mB</li>
      </ul>
      </div>       `;

    forecast7Days.insertAdjacentHTML("beforeend", markup);
  } catch (err) {
    console.error(err);
  }
};

////////////
const btnOpenForecastModal = document.querySelector(".btn--forecast");
const forecastModal = document.querySelector(".forecast__modal");
btnOpenForecastModal.addEventListener("click", function () {
  forecastModal.classList.remove("hidden");
  body.style.position = "fixed";
  forecast7Days.innerHTML = "";
  state.forecast.days.forEach((el) => {
    createForecast(el);
  });
});
const btnCloseForecastModal = document.querySelector(".btn__close_modal");
btnCloseForecastModal.addEventListener("click", function () {
  forecastModal.classList.add("hidden");
  body.style.position = "";
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !forecastModal.classList.contains("hidden")) {
    forecastModal.classList.add("hidden");
  }
});

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  //functions
  const timer = setInterval(function () {
    nextSlide();
  }, 5000);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  //event handlers

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};

if (urlLocation !== "gallery.html") {
  slider();
}
export const galleryFunction = function () {
  const btn = document.querySelectorAll(".img-box").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const data = e.target.closest(".img-box").dataset.set;

      window.location.href = `${data}.html`;
    });
  });
};
galleryFunction();

/////smooth scroling
document
  .querySelector(".navigation-lists")
  .addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.classList.contains("header-nav-link")) {
      const id = e.target.getAttribute("href");

      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

//////mobile navigation
const openMNB = document.querySelector(".btn_open-nav");
const closeMNB = document.querySelector(".btn_close-nav");

const navList = document.querySelector(".navigation-lists");
const outside = document.querySelector(".navigation-lists");

openMNB.addEventListener("click", function (e) {
  e.preventDefault();
  navList.classList.add("mobile_navigation");
  closeMNB.classList.remove("hidden");
  openMNB.classList.add("hidden");
});
outside.addEventListener("click", function (e) {
  e.preventDefault();
  navList.classList.remove("mobile_navigation");
  openMNB.classList.remove("hidden");
  closeMNB.classList.add("hidden");
});
closeMNB.addEventListener("click", function (e) {
  e.preventDefault();
  navList.classList.remove("mobile_navigation");
  openMNB.classList.remove("hidden");
  closeMNB.classList.add("hidden");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animation");
    }
  });
});
observer.observe(document.querySelector(".section--galery"));
observer.observe(document.querySelector(".section--other"));
