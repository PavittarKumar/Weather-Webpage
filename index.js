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

			newHtml=`<div class='header'><h2>${response.name} [Country: ${response.sys.country}]</h2><ul><li>Cloudiness: ${response.clouds.all}%</li><li>Temp: ${Math.round(response.main.temp-273.15)}°C Feels Like: ${Math.round(response.main.feels_like-273.15)}°C Min Temp: ${Math.round(response.main.temp_min-273.15)}°C Max Temp: ${Math.round(response.main.temp_max-273.15)}°C </li><li>Humidity: ${response.main.humidity}%</li><l1>Pressure: ${response.main.pressure} hPa</l1><li>Sea Level: ${response.main.sea_level} hPa</li><li>Ground Level: ${response.main.grnd_level} hPa</li><li>Time Zone: ${response.timezone} s</li><li>Wind Speed: ${response.wind.speed} m/s</li><li>Wind Deg: ${response.wind.deg}° </li></ul></div>`;

			el=document.querySelector('.header')
			el.parentNode.removeChild(el);

			element=document.querySelector('.info');
			element.insertAdjacentHTML('beforeend',newHtml);
		})
		.catch(err => {
			console.log(err);

			newHtml=`<div class="header">
			<h2>
				City Not Found!
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