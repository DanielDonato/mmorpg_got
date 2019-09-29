module.exports.index = function(application, req, res){
    res.render('index', {validacao: {}});
};

module.exports.autenticar = function(application, req, res){
    let dadosForm = req.body;

    req.assert('usuario', 'Usuario nao pode ser vazio').notEmpty();
    req.assert('senha', 'Senha nao pode ser vazia').notEmpty();

    let erros = req.validationErrors();

    if(erros){
        res.render("index", {validacao: erros});
        return;
    }

    const connection = application.config.dbConnection;
    const usuariosDAO = new application.app.models.UsuariosDAO(connection);
 
    usuariosDAO.autenticar(dadosForm, req, res);

    //res.send('nice');

};