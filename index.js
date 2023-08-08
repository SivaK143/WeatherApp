const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");

let target = "delhi"


const fetchData = async (target) => {

    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=9beccb40b6324f51b2a151222232906&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        //object destructuring
        const {
            current: { temp_c,
                condition: { text, icon },
            },
            location: { name, localtime },
        } = data;

        // updateDom(data.current.temp_c,data.location.name);
        updateDom(temp_c, name, localtime, icon, text);

    } catch (error) {
        alert("location not found");
    }


};

function updateDom(temperature, city, time, emoji, text) {
    temperatureField.innerText = temperature;
    cityField.innerText = city;

    const exactDate = time.split(" ")[0];
    const exactTime = time.split(" ")[1];
    // console.log(exactDate);
    // console.log(exactTime);

    const exactDay = new Date(exactDate).getDay();
    // console.log(exactDay);
    // console.log(time);
    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)}  ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;
}
// 11:01 - Monday 2022-06-22

fetchData(target);

function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "don't know";
    }
}

const search1 = (e) => {
    e.preventDefault();
    target = searchField.value;
    // console.log(target);
    fetchData(target);
}

form.addEventListener("submit", search1)