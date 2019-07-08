var transitionSpeed = 0.1;
var holdTime = 1500;
var width = 600;


var carousel = document.getElementById('carousel-container');
var carouselImageWrapper = document.getElementById('carousel-image-wrapper');
var newIndex = 0;
var currentIndex = 0;
var currentLeft = 0;
var dots = [];

carousel.setAttribute('style', 'max-width: 600px; width: 100%; height: 437px; position: relative; border: 1px solid gray; overflow: hidden;');
if (carousel.classList.contains('center')) {
	carousel.style.margin = 'auto';
}

carouselImageWrapper.setAttribute('style', 'position: absolute;');
var images = carouselImageWrapper.children;
var imgNumber = carouselImageWrapper.childElementCount;
carouselImageWrapper.style.width = (width * imgNumber) + 'px' ;
carouselImageWrapper.style.marginLeft = 0 + 'px';

for (var c = 0; c < imgNumber; c++) {
	images[c].setAttribute('style', 'max-width: 600px; width: 100%; float: left;');
}


//navigation-dots creation
navigatorDots = document.createElement('div');
navigatorDots.setAttribute('style', 'position: absolute; height: 10px; left: 0; right: 0; margin: 0 auto; bottom: 10px; display: block;');
navigatorDots.style.width = 20 * imgNumber + 'px';
carousel.appendChild(navigatorDots);


for (var d = 0; d < imgNumber; d++) {
	dots[d] = document.createElement('a');
	dots[d].setAttribute('style', 'display: block; height:10px; width: 10px; border-radius: 50%; float: left; margin: 0 5px; background-color: black; cursor: pointer;');
	dots[d].classList.add('hoverDots');
	navigatorDots.appendChild(dots[d]);


	dots[d].addEventListener('click', function() {
		if (currentIndex != d) {
			hold();
			animate(currentIndex, d);
		}
	});
}


//arrows creation
leftArrow = document.createElement('div');
rightArrow = document.createElement('div');
leftArrow.setAttribute('style', 'position: absolute; height: 100px; left: 5px; top: 50%; display: block; margin-top: -50px;');
leftArrow.innerHTML = '<a id="arrowL" class="hoverArrow" style="display: block; color:white; opacity:0.5; font-size: 100px; line-height: 100px; font-weight: bolder; text-decoration: none; cursor: pointer;"><</a>';
rightArrow.setAttribute('style', 'position: absolute; height: 100px; right: 5px; top: 50%; display: block; margin-top: -50px;');
rightArrow.innerHTML = '<a id="arrowL" class="hoverArrow" style="display: block; color:white; opacity:0.5; font-size: 100px; line-height: 100px; font-weight: bolder; text-decoration: none; cursor: pointer;">></a>';


carousel.appendChild(leftArrow);
carousel.appendChild(rightArrow);

//hover for both dots and arrows
carousel.addEventListener('mouseover', function(e) {
	hold();
	if ( e.target.classList.contains('hoverDots') ) {
		e.target.style.backgroundColor = 'white';
	} else if ( e.target.classList.contains('hoverArrow') ) {
		e.target.style.opacity = '1';
	}
});


carousel.addEventListener('mouseout', function(e) {
	resume();
	if ( e.target.classList.contains('hoverDots') ) {
		e.target.style.backgroundColor = 'black';
	} else if ( e.target.classList.contains('hoverArrow') ) {
		e.target.style.opacity = '0.5';
	}
});


function hold() {
	clearTimeout(timeout);
}

function resume() {
	timeout = setTimeout((function() {
		animate(currentIndex, newIndex);
	}), holdTime);
}


leftArrow.addEventListener('click', function() {
	hold();
	newIndex = currentIndex - 1;
	if (newIndex < 0) {
		newIndex = imgNumber - 1;
	}
	animate(currentIndex, newIndex);
});

rightArrow.addEventListener('click', function() {
	hold();
	newIndex = currentIndex + 1;
	if (newIndex >= imgNumber) {
		newIndex = 0;
	}
	animate(currentIndex, newIndex);

});

// function disableBtns(f) {
// 	if (f == true) {
// 		leftArrow.style.pointerEvents = 'none';
// 		leftArrow.style.pointerEvents = 'none';
// 		dots.forEach(function(dot) {
// 			dot.style.pointerEvents = 'none';
// 		})
// 	} else {
// 		leftArrow.style.pointerEvents = 'auto';
// 		leftArrow.style.pointerEvents = 'auto';
// 		dots.forEach(function(dot) {
// 			dot.style.pointerEvents = 'auto';
// 		})
// 	}
// }

function animate(currentIndex, newIndex) {
	var slide = setInterval( (function() {
		// disableBtns(true);
		currentLeft = currentLeft + ((width * (currentIndex - newIndex)) / (transitionSpeed * 1000));
		if (((Math.ceil(Math.abs(currentLeft)))==(newIndex * width)) || ((Math.floor(Math.abs(currentLeft)))==(newIndex * width))) {
			currentLeft = Math.ceil(currentLeft);
			carouselImageWrapper.style.marginLeft = currentLeft + 'px';
			// disableBtns(false);
			clearInterval(slide);
			initSlider();
		}
		carouselImageWrapper.style.marginLeft = currentLeft + 'px';
	}), 1);
}


function initSlider() {
	dots[currentIndex].style.backgroundColor = 'white'; 

	timeout = setTimeout((function() {
		animate(currentIndex, newIndex);
	}), holdTime);

	dots[currentIndex].style.backgroundColor = 'black';
	dots[newIndex].style.backgroundColor = 'white';	

	currentIndex = newIndex;
	newIndex = newIndex + 1;

	// console.log('c: '+currentIndex+' n: '+newIndex);

	if (newIndex >= imgNumber) {
		newIndex = 0;
	}

	// console.log('curr: ' + currentIndex + ' new: ' + newIndex);
}

// animate(1, 0);
initSlider();