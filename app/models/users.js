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

module.exports = function(){
	return users;
}