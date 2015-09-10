function slider() {

	var _range = document.getElementsByClassName("slider")[0];

	_range.addEventListener("input", function(){
		app.volume = Math.exp(_range.value) - 1;
		sounds.pointSound.play();
	});
	
	 function _isClicked(e){
		return e.target.className == 'slider';
	} 
	
	function  _hide(){
		_range.style.display = 'none';
	}
 
	function _show(x, y){
		_range.style.display = 'block';
		_range.style.left = x+"px";
		_range.style.top = (y - _range.offsetHeight) +"px";
	}
	
	return {
		show:  _show,
		hide: _hide,
		isClicked: _isClicked
	}

}