var addNewBubble = (function(){
	
	var _newBubble;
	
	function _generateBubble(){
		var sum = 0;
		var rand = Math.random();
		var prev = 0;
		for (var i=0; i<app.bubbleTypes.length; i++){
			sum += app.bubbleProbabilities[i];
			if (rand >=prev && rand <= sum){
				var bubbleType = app.bubbleTypes[i];
				if (bubbleType == 'good'){
					return new GoodBubble();
				} else if (bubbleType == 'evil'){
					return new EvilBubble();
				} else if (bubbleType == 'point'){
					return new PointBubble();
				} 
			}
			prev = sum;
		}
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
		
		if (!_isCollision()){
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