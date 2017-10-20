module.exports.renderGame = function(application, req, res){
	
	//Check user authentication
	if (req.session.authorized != true){
		res.redirect('/');
		return;
	} 

	var success = '';

	if (req.query.success != ''){
		success = req.query.success;
	}

	var userName = req.session.userName;
	var house = req.session.house;
	var connection = application.config.dbConnection;
	var gamesDAO = new application.app.models.games(connection);

	gamesDAO.startGame(res, userName, house, success);

}

module.exports.saveVassal = function(application, req, res){
	
	var dataForm = req.body;

	/* Thanks to express-validator */
	req.assert('actions', 'An action is required').notEmpty();
	req.assert('amount', 'Amount is required').notEmpty();

	var errors = req.validationErrors();

	if (errors){
		res.redirect('game?success=N');
		return;
	}

	var connection = application.config.dbConnection;
	var gamesDAO = new application.app.models.games(connection);

	//Add user
	dataForm.userName = req.session.userName;
	gamesDAO.saveVassal(dataForm);

	res.redirect('game?success=S');
}


module.exports.signOut = function(application, req, res){
	
	req.session.destroy(function(err){
		res.render('index', {validation: {}, dataForm: {}});
	});
}

module.exports.renderVassal = function(application, req, res){
	if (req.session.authorized != true){
		res.redirect('/');
		return;
	} 

	res.render('vassal', {validation: {}, dataForm: {}});
}

module.exports.renderScrolls = function(application, req, res){
	
	if (req.session.authorized != true){
		res.redirect('/');
		return;
	}

	var connection = application.config.dbConnection;
	var gameDAO = new application.app.models.games(connection); 
	var userName = req.session.userName;

	gameDAO.getVassals(res, userName);
}

module.exports.revokeVassal = function(application, req, res){
	var urlQuery = req.query;

	var id = urlQuery.id;
	var connection = application.config.dbConnection;
	var gameDAO = new application.app.models.games(connection); 

	gameDAO.revokeVassal(id, res);
}