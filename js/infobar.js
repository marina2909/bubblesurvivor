function InfoBar(time, points){
	var timeElem = document.getElementsByClassName('time');
	var pointsElem = document.getElementsByClassName('points');
	
	setPoints(points);
	setTime(time);
	
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