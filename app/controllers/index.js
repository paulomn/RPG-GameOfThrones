module.exports.renderIndex = function(application, req, res){
	res.render('index', {validation: {}, dataForm: {}});
}

module.exports.authenticate = function(application, req, res){
	/* Thanks to body-parser */
	var dataForm = req.body;

	/* Thanks to express-validator */
	req.assert('userName', 'User name is required').notEmpty();
	req.assert('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if (errors){
		res.render('index', {validation: errors, dataForm: dataForm});
		return;
	}

	var connection = application.config.dbConnection;
	var usersDAO = new application.app.models.users(connection);
	usersDAO.authenticate(dataForm, req, res);

	//res.send('ok');
}