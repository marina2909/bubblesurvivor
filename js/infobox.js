function InfoBox(){
	var timeElem = document.getElementsByClassName('time');
	var pointsElem = document.getElementsByClassName('points');
	
	function setTime(time){
		timeElem[0].innerHTML = time;
	}

	function setPoints(points){
		pointsElem[0].innerHTML = points;
	}
	
	return {
		setTime: setTime,
		setPoints: setPoints
	}
}