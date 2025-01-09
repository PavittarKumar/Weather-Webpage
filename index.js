var input = '';
var newHtml, element, el;
var data;
var call = () => {
	input = document.querySelector('.enter').value;
	data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=5e9321025e4f525d6a728dfdd1039094`)
		.then(response => {
			return response.json();
		})
		.then(response => {

			var arr = response.weather[0].description.split(" ");
			var imageUrl = `https://api.unsplash.com/search/photos?orientation=landscape&query=${arr[arr.length - 1]}&client_id=IBLqpe4w9qm0J61QGU7vdrWXwxPO6ka1etuMf_qlywg`;

			fetch(imageUrl)
				.then(res => res.json()) // Parse the JSON response
				.then(data => {
					if (data.results && data.results.length > 0) {
						// Get the first image's raw URL
						const rawUrl = data.results[0].urls.full;
						// Fetch the image blob using the raw URL
						return fetch(rawUrl)
							.then(res => res.blob())
							.then(image => {
								const localUrl = URL.createObjectURL(image);
								document.body.style.backgroundImage = `linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${localUrl})`;
								document.body.style.backgroundSize = 'cover'; // Ensures the whole image fits
								document.body.style.backgroundRepeat = 'no-repeat'; // Avoids tiling the image
								document.body.style.backgroundPosition = 'center';
							});
					} else {
						console.error("No results found in the response");
					}
				})
				.catch(error => console.error("Error fetching or processing the image:", error));

			newHtml = `
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
				<li>${Math.round(response.main.temp - 273.15)}°C  </li>
				<li>${response.main.humidity}%</li>
				<li>${response.main.pressure} hPa</li>
				<li>${response.main.sea_level} hPa</li>
				<li>${response.main.grnd_level} hPa</li>
				<li>${new Date(response.timezone * 1000).toISOString().substr(11, 5)}</li>
				<li>${response.wind.speed} m/s</li>
				<li>${response.wind.deg}° </li>
				</ul>
			</div>

		 </div>`;

			el = document.querySelector('.header')
			el.parentNode.removeChild(el);

			element = document.querySelector('.info');
			element.insertAdjacentHTML('beforeend', newHtml);
		})
		.catch(err => {
			newHtml = `<div class="header">
			<h2>
				Please check the city name! <br>
			</h2>
		</div>`;

			el = document.querySelector('.header')
			el.parentNode.removeChild(el);

			element = document.querySelector('.info');
			element.insertAdjacentHTML('beforeend', newHtml);

		});


	setTimeout(function () { document.querySelector('.info').scrollIntoView({ behavior: "smooth" }, true); }, 1000);
}

document.querySelector('.enter').addEventListener('keypress', function (event) {
	input = document.querySelector('.enter').value;
	if (event.keyCode === 13 || event.which === 13) {
		call();
	}
});