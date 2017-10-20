module.exports.renderRegister = function(application, req, res){
	res.render('register', {validation: {}, dataForm: {}});
}

module.exports.saveRegister = function(application, req, res){
		
	/* Thanks to body-parser */
	var dataForm = req.body;

	/* Thanks to express-validator */
	req.assert('playerName', 'User name is required').notEmpty();
	req.assert('userName', 'User name is required').notEmpty();
	req.assert('password', 'Password is required').notEmpty();
	req.assert('house', 'House is required').notEmpty();

	var errors = req.validationErrors();

	if (errors){
		res.render('register', {validation: errors, dataForm: dataForm});
		return;
	}

	var connection = application.config.dbConnection;
	var usersDAO = new application.app.models.users(connection);
	var gamesDAO = new application.app.models.games(connection);

	usersDAO.createUser(dataForm);
	gamesDAO.generateParams(dataForm.userName);

	//Game params generations

	res.send('OK');
}