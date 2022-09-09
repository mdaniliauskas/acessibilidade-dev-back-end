let users = [];

let id = 1;



exports.signup = async (req, res) => {
    console.log(req.body);
    const user = {
        id: id++,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        senha: req.body.senha     
    }
    
    users = [... users, user];
    res.json({
        success: true,
        message: user
    });
};


exports.signin = async (req, res) => {
    users.forEach(user => {
        console.dir(user)
        if (user.nome == req.body.nome && user.senha == req.body.senha){
            res.status(200).end()
        } 
    });
    res.status(500).end()
}


exports.getUser = async (req, res) => {
    
}

exports.update = async (req, res) => {
    
}

exports.remove = async (req, res) => {
    
}