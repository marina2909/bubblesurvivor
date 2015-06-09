var addNewBubble = (function(){
	
	var _newBubble;
	
	function _generateBubble(){
		var sumMid = app.bubbleProbabilities[0] + app.bubbleProbabilities[1];
		var sumLast = sumMid +app.bubbleProbabilities[2];
		var rand = Math.random();
		if  (rand >= 0 && rand < app.bubbleProbabilities[0]){
			return new GoodBubble();
		} else if (rand >= app.bubbleProbabilities[0] && rand < sumMid){
			return new EvilBubble();
		} else if (rand >= sumMid  && rand < sumLast) {
			return new PointBubble();
		}
		return null;
	};
	
	function _isCollision(){
		var isCollision = false;
		entities.bubbles.forEach(function(b){
			var distance = app.bubbleDistance;
			if(_newBubble instanceof BlackHole){
				distance = app.distanceFromBlackHole;
			} 
			if (Math.pow(_newBubble.x - b.x, 2) + Math.pow(_newBubble.y - b.y, 2) < 
				Math.pow(distance + b.getRCollision() + _newBubble.getRCollision(), 2))
			{
				isCollision = true;
				return;
			}
		}, this);

		entities.blackHoles.forEach(function(b){
			if (Math.pow(_newBubble.x - b.x, 2) + Math.pow(_newBubble.y - b.y, 2) < 
				Math.pow(app.distanceFromBlackHole + b.getRCollision() + _newBubble.getRCollision(), 2))
			{
				isCollision = true;
				return;
			}
		}, this);			
		return isCollision;
	}
	
	
	return function(){
		
		if (_newBubble == null){  
			if (gameState.totalBubbles % app.blackHoleOccurency != 0){
				_newBubble = _generateBubble();
			} else {
				_newBubble = new BlackHole();
			}
		}
		
		if (_newBubble != null && !_isCollision()){
			if (_newBubble instanceof BlackHole){
				entities.blackHoles.push(_newBubble);
			} else {
				entities.bubbles.push(_newBubble);
			}
			gameState.totalBubbles++;
			_newBubble = null;
		}
		
	}
	
})();