var input='';
var newHtml,element,el;
var data;
var call=()=>{
	input=document.querySelector('.enter').value;
	data=fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=5e9321025e4f525d6a728dfdd1039094`)
		.then(response => {
			return response.json();
		})
		.then(response=>{
			console.log(response);
			newHtml=`
			<div class='header'>
			<h2>${response.name} [Country: ${response.sys.country}]</h2>
			<h3>${response.weather[0].description.toUpperCase()}</h3>
			<div class="content">
				<ul class="type">
				<li>Cloudiness:</li>
				<li>Temp: </li>
				<li>Humidity: </li>
				<li>Pressure: </li>
				<li>Sea Level: </li>
				<li>Ground Level: </li>
				<li>Time Zone: </li>
				<li>Wind Speed: </li>
				<li>Wind Deg: </li>
				</ul>

				<ul class="data">
				<li>${response.clouds.all}%</li>
				<li>${Math.round(response.main.temp-273.15)}°C  </li>
				<li>${response.main.humidity}%</li>
				<li>${response.main.pressure} hPa</li>
				<li>${response.main.sea_level} hPa</li>
				<li>${response.main.grnd_level} hPa</li>
				<li>${response.timezone} s</li>
				<li>${response.wind.speed} m/s</li>
				<li>${response.wind.deg}° </li>
				</ul>
			</div>

		 </div>`;
			
			el=document.querySelector('.header')
			el.parentNode.removeChild(el);

			element=document.querySelector('.info');
			element.insertAdjacentHTML('beforeend',newHtml);
		})
		.catch(err => {
			console.log(err);

			newHtml=`<div class="header">
			<h2>
				City Not Found! <br>
				${err}
			</h2>
		</div>`;

			el=document.querySelector('.header')
			el.parentNode.removeChild(el);

			element=document.querySelector('.info');
			element.insertAdjacentHTML('beforeend',newHtml);

		});

		
		setTimeout(function(){document.querySelector('.info').scrollIntoView({behavior: "smooth"},true);}, 1000);
}

document.querySelector('.enter').addEventListener('keypress',function(event){
	input=document.querySelector('.enter').value;
	if(event.keyCode===13 || event.which===13){
		call();
	}
});