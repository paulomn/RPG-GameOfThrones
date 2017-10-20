var objectId = require('mongodb').ObjectId;

function games(connection){
	this._connection = connection();
}

games.prototype.generateParams = function(userName){
	this._connection.open(function(error, mongoClient){
		mongoClient.collection("games", function(error, collectionGame){

			collectionGame.insert({
				userName: userName,
				coin: 15, 
				vassal: 10, 
				fear: Math.floor(Math.random() * 1000), 
				wisdom: Math.floor(Math.random() * 1000), 
				trade: Math.floor(Math.random() * 1000), 
				magic: Math.floor(Math.random() * 1000)
			});
			
			mongoClient.close();
		});
	});
}

games.prototype.startGame = function(res, userName, house, success){
	this._connection.open(function(error, mongoClient){
		mongoClient.collection("games", function(error, collectionGame){
			//Find will return a cursor. Use toArray()
			collectionGame.find({userName: {$eq: userName}}).toArray(function(err, result){
				res.render('game', {house: house, game: result[0], success: success});
				mongoClient.close();
			});		
		});
	});
}

games.prototype.saveVassal = function(vassal){
	this._connection.open(function(error, mongoClient){
		
		mongoClient.collection("vassals", function(error, collectionVassals){

			//Calculate the expiration
			var time = 0;
			switch(parseInt(vassal.actions)){
				case 1: time = 1 * 60 * 60000; break;
				case 2: time = 2 * 60 * 60000; break;
				case 3: time = 5 * 60 * 60000; break;
				case 4: time = 5 * 60 * 60000; break;
			}
			var date = new Date();
			vassal.expiresIn = date.getTime() + time;

			collectionVassals.insert(vassal);
		});

		mongoClient.collection("games", function(error, collectionGames){

			var coin = 0;
			switch(parseInt(vassal.actions)){
				case 1: time = coin = -2 * vassal.amount; break;
				case 2: time = coin = -3 * vassal.amount; break;
				case 3: time = coin = -1 * vassal.amount; break;
				case 4: time = coin = -1 * vassal.amount; break;
			}

			collectionGames.update(
				{userName: vassal.userName},
				{$inc: {coin: coin}}
			);

			mongoClient.close();
		});
	});
}

games.prototype.getVassals = function(res, userName){
	this._connection.open(function(error, mongoClient){
		mongoClient.collection("vassals", function(error, collectionVassals){
			//Find will return a cursor. Use toArray()
			var date = new Date();
			var today = date.getTime();

			collectionVassals.find({userName: {$eq: userName}, expiresIn: {$gt: today}}).toArray(function(err, result){
			
			console.log(result);
			res.render('scrolls', {dataForm: result})	

			mongoClient.close();
			});		
		});
	});
}

games.prototype.revokeVassal = function(id, res){
	this._connection.open(function(error, mongoClient){
		mongoClient.collection("vassals", function(error, collectionVassals){
			collectionVassals.remove(
				{_id: objectId(id)},
					function(err, result){
						res.redirect('game?success=R');
						mongoClient.close();
					}
			);
		});		
	});
}


module.exports = function(){
	return games;
}