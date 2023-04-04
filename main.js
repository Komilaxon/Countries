const list = document.querySelector(".hero__list");
const form = document.querySelector(".hero__form");
const input = document.querySelector(".hero__input");
const select = document.querySelector(".hero__select");
const option = document.querySelector(".option");
const mode = document.querySelector(".site_header__text");

const BASE_URL = "https://restcountries.com/v3.1";

const region = [];

const renderCountries = (arr, node) => {
  node.innerHTML = "";
  arr.forEach((item) => {
    node.innerHTML += `
         <li class="hero__item">
            <div class="hero__hero__img">
                <img src="${item.flags.png}" alt="${item.flags.alt}">
            </div>
            <div class="hero__text-content">
                <h3 class="hero__title">${item.name.common}</h3>
                <p class="hero__text">Population: ${item.population}</p>
                <p class="hero__text">Region: ${item.region}</p>
                <p class="hero__text">Capital: ${item.capital}</p>
            </div>
        </li>
        `;
  });
};

// Optionrender

const renderOption = (arr, node) => {
  arr.forEach((item) => {
    node.innerHTML += `
       <option value=${item}>${item}</option>
        `;
  });
};

const getCountries = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all`);
    const data = await res.json();
    renderCountries(data, list);
    data.filter((item) => {
      if (!region.includes(item.region)) {
        region.push(item.region);
      }
    });

    renderOption(region, select);
  } catch (error) {
    console.log(error);
  }
};

getCountries();

// search

const getSearch = (name) => {
  fetch(`${BASE_URL}/name/${name}`)
    .then((res) => res.json())
    .then((data) => renderCountries(data, list));
};

input.addEventListener("input", (e) => {
  e.preventDefault();
  let inputValue = e.target.value.trim();
  if (inputValue != "") {
    getSearch(inputValue);
  }
});

// Region

const getRegion = (name) => {
  fetch(`${BASE_URL}/region/${name}`)
    .then((res) => res.json())
    .then((data) => renderCountries(data, list));
};

select.addEventListener("change", (e) => {
  e.preventDefault();

  getRegion(e.target.value);
});
