function users(connection){
	this._connection = connection();
}

users.prototype.createUser = function(user){
	this._connection.open(function(error, mongoClient){
		mongoClient.collection("users", function(error, collectionUser){

			collectionUser.insert(user);
			mongoClient.close();
		});
	});
}

users.prototype.authenticate = function(user, req, res){
	this._connection.open(function(error, mongoClient){
		mongoClient.collection("users", function(error, collectionUser){
			//Find will return a cursor. Use toArray()
			collectionUser.find({userName: {$eq: user.userName}, password: {$eq: user.password}}).toArray(function(err, result){

					if(result[0] != undefined){
						req.session.authorized = true;
						req.session.userName = result[0].userName;
						req.session.house = result[0].house;
					}

					if(req.session.authorized){
						res.redirect('game');
					} else {
						res.render('index', {validation: {}, dataForm: {}});
					}	

				});
			mongoClient.close();
		});
	});
}

module.exports = function(){
	return users;
}