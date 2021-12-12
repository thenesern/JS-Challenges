'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(
    function(position) {
     const {latitude} = position.coords;
     const {longitude} = position.coords;

     console.log(`https://www.google.com.tr/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);


    map.on("click", function(mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus()
        
    })
}, function() {
    alert("Could not get your position")
})



form.addEventListener("submit", function(e){
    e.preventDefault();
    //Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
    //Display Marker on Submit
    console.log(mapEvent);
    const {lat, lng} = mapEvent.latlng;
    L.marker([lat, lng]).addTo(map).bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup"
    })
    .setPopupContent("Workout")
    ).openPopup()
});

inputType.addEventListener("change", function(e){
    e.preventDefault();
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
})