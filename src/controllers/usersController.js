const User = require("../models/User");
const UserList = require("../models/UserList");

const lista = new UserList();

//Opcional, adicionar usuários fixos;

lista.addUser(new User ("Flavia", "flavia@gmail.com", 17));
lista.addUser(new User ("Giovanna", "giovanna@gmail.com", 16));

const router = {
    getAllUsers: (req, res) => {
        res.json(lista.getAllUsers());
    },

    addUser: (req, res) => {
        try {
            const { name, email, age} = req.body;
            if(!name || !email || !age) {
                throw new Error('Preencha todos os campos!');             }
            const user = new User (name, email, age);
            lista.addUser(user);
            res.status(200).json({message: 'Usuário feito com sucesso'});
        } catch (error) {
            res.status(400).json({message: "Erro ao adicionar pedido", error});
        }
    },

    getUserById: (req,res) => {
        try {
            const id = req.params.id;
            res.status(200).json(lista.getUserById(id));
        } catch (error) {
            res.status(404).json({message: 'Erro ao buscar usuário por id', error});
        }
    },

    updateUser: (req, res) => {
        try {
            res.status(200).json(lista.updateUser(req.params.id, req.body));
        } catch (error) {
            res.status(404).json({message: 'Erro ao atualizar usuário', error});
        }
    },

    deleteUser: (req, res) => {
        try {
            lista.deleteUser(req.params.id);
            res.status(200).json({message: 'Usuário deletado com sucesso'})
        } catch (error) {
            res.status(404).json('Erro ao deletar usuário', error);
        }
    },
};

module.exports = router;
