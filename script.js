function setWindWay(deg) {
  if (deg > 315 && deg < 45) return 'North';
  if (deg > 45 && deg < 135) return 'East';
  if (deg > 135 && deg < 225) return 'South';
  if (deg > 225 && deg < 315) return 'West'
  if (deg == 0) return "North";

}
function setDay() {
  let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let d = new Date();
  document.querySelector('.dayToday').innerHTML = day[d.getDay()];
  let i2 = d.getDay() + 1;
  for (let i = 2; i <= 7; i++) {
    console.log(i,i2)
    if (i2 == 7) i2 = 0;
    document.querySelector('.day' + i).innerHTML = day[i2];
    i2++;
  }
}

function showWeather(cityName, lat, lon) {
  //First day load
  fetch('https://api.openweathermap.org/data/2.5/weather?' + cityName + '&units=metric&appid=e15d7e3b5ce1d716d9794bbce41655df')
    .then(reception => reception.json())
    .then(data => {
      document.querySelector('.location').innerHTML = data.name;
      document.querySelector('.num').innerHTML = Math.round(data.main.temp) + '&deg';
      document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
      document.querySelector('.wind').innerHTML = data.wind.speed;
      document.querySelector('.windDeg').innerHTML = setWindWay(data.wind.deg);
      document.querySelector('.clouds').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
      // Next Day load
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon='+ data.coord.lon +'&units=metric&appid=e15d7e3b5ce1d716d9794bbce41655df')
        .then(reception => reception.json())
        .then(data2 => {

          function restDays(count) {
            if (count == 8) return;

            document.querySelector('.num' + count + 'Day').innerHTML = Math.round(data2.daily[count - 1]['temp']['max']) + '&deg';
            document.querySelector('.num' + count + 'Night').innerHTML = Math.round(data2.daily[count - 1]['temp']['min']) + '&deg';
            document.querySelector('.num' + count + 'Icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data2.daily[count - 1].weather[0]['icon']}@2x.png">`;
            return restDays(count + 1);
          }
          restDays(2);
        })
        .catch(function () { });
    })
    .catch(function () { });
    setDay();
}

function getPossition(){
  
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    let crd = pos.coords;
      showWeather('lat='+crd.latitude+'&lon='+crd.longitude);
  };
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  
  navigator.geolocation.getCurrentPosition(success, error, options);
}
showWeather('q=London');
getPossition();
const clickElem = document.querySelector('#btn1').addEventListener('click', function () {
  
  if(!document.querySelector('#searchFild').value){
    getPossition();
  }else{
    showWeather('q=' + document.querySelector('#searchFild').value);
  }
});;



