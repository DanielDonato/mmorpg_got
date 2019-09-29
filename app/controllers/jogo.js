
module.exports.jogo = function(application, req, res){

    if(req.session.autorizado !== true){
        res.send("Vc precisa fazer login");
        return;
    }
    let msg = '';
    if(req.query.msg != ""){
        msg = req.query.msg ;
    }
    let usuario = req.session.usuario;
    let casa = req.session.casa;
    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.JogoDAO(connection);
    jogoDAO.iniciaJogo(res, usuario, casa, msg);
};

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err){
        res.render('index', {validacao: {}});
    });
};

module.exports.suditos = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send("Vc precisa fazer login");
        return;
    }
    res.render("aldeoes");
}

module.exports.pergaminhos = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send("Vc precisa fazer login");
        return;
    }
    let connection = application.config.dbConnection;
    let jogoDao = new application.app.models.JogoDAO(connection);
    let usuario = req.session.usuario;
    jogoDao.getAcoes(usuario, res);
    //res.render("pergaminhos");
}

module.exports.ordenar_acao_sudito = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send("Vc precisa fazer login");
        return;
    }
    let dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    let erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }
    let connection = application.config.dbConnection;
    let jogoDao = new application.app.models.JogoDAO(connection);
    dadosForm.usuario = req.session.usuario;
    jogoDao.acao(dadosForm);
    res.redirect('jogo?msg=B');
}

module.exports.revogar_acao = function(application, req, res){
    let url_query = req.query;
    let connection = application.config.dbConnection;
    let jogoDao = new application.app.models.JogoDAO(connection);
    let _id = url_query.id_acao;
    jogoDao.revogarAcao(_id, res);
}


