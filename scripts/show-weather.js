const thumbs = document.querySelectorAll(".thumb-image .imagewrap");

const weazerElement = (index, temperature) => {
	const showTemperature = temperature > 0 ? '+' + temperature : temperature;

	const popup = document.createElement('div');		
	popup.append(`Погода в Минске на сегодня ${showTemperature}`);

	const button = document.createElement('button');
	button.append('🔍');
	button.addEventListener("click", (event) => {		
	  popup.classList.add('show');
	});

	const weazer = document.createElement('div');
	weazer.classList.add('weazer');
	weazer.dataset.id = index;
	weazer.append(button, popup);	
	weazer.addEventListener("click", (event) => {
		event.preventDefault();	  
	});

	return weazer;
}

const renderWeazerElements = (temperature) => {	
	if (thumbs) {
		thumbs.forEach((elem, index) => {
			elem.append(weazerElement(index, temperature));
		})
	}
}

const fetchTemperature = async () => {
  const url = 'https://www.meteosource.com/api/v1/free/point';
  const params = new URLSearchParams({ 
  	place_id: 'minsk',  	
  	key: '9idjqf0nx2zyvp65u9xi9nb4pdryvrx2ke69hsxm'
  }).toString();

	const response = await fetch(`${url}?${params}`);
  const json = await response.json();

  renderWeazerElements(json.current.temperature);
}

fetchTemperature();

window.addEventListener('click', function(e){
  const popups = document.querySelectorAll(".weazer > div");
  const id = e.target.parentElement?.getAttribute('data-id');

	popups.forEach((elem) => {
		if (elem?.parentElement.getAttribute('data-id') != id) elem.classList.remove('show');	
	});
});