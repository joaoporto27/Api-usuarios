const Post = require("../models/Post");
const PostList = require("../models/PostList");
const { get } = require("../routes/usersRoutes");
const { getAllUsers } = require("./usersController");

const list = new PostList();

list.addPost(new Post("Luiz", "Primeiro post", "https://www.google.com/imgres?q=emoji%20smile&imgurl=https%3A%2F%2Femojiisland.com%2Fcdn%2Fshop%2Fproducts%2F16_large.png%3Fv%3D1571606116&imgrefurl=https%3A%2F%2Femojiisland.com%2Fproducts%2Fsmile-emoji&docid=aZOX0sorKWMcCM&tbnid=2fRogxfGer_dDM&vet=12ahUKEwi06ZCD_N6LAxVBJ7kGHc63OfcQM3oECGkQAA..i&w=480&h=480&hcb=2&ved=2ahUKEwi06ZCD_N6LAxVBJ7kGHc63OfcQM3oECGkQAA"));
list.addPost(new Post("Cadu", "Primeiro post", "https://www.google.com/imgres?q=emoji%20neutro&imgurl=https%3A%2F%2Fem-content.zobj.net%2Fsource%2Fapple%2F76%2Fneutral-face_1f610.png&imgrefurl=https%3A%2F%2Femojipedia.org%2Fpt%2Fapple%2Fios-10.0%2Frosto-neutro&docid=XddepE7cXh4SsM&tbnid=dTsoUhZd782l-M&vet=12ahUKEwij3c2O_N6LAxVkG7kGHR2yMhoQM3oECH8QAA..i&w=160&h=160&hcb=2&ved=2ahUKEwij3c2O_N6LAxVkG7kGHR2yMhoQM3oECH8QAA"));

const router = {
    getAllPosts: (req, res) => {
        res.json(list.getAllPosts());
    },

    addPost: (req, res) => {
        try {
            const {username, comment, image} = req.body;
            if(!username || !comment || !image) {
                throw new Error('Preencha todos os campos!');    
         }
            const post = new Post (username, comment, image);
            list.addPost(post);
            res.status(201).json({message: 'Post feito com sucesso'});
        } catch (error) {
            res.status(400).json({message: "Erro ao adicionar post", error});
        }
    },

    getPostById: (req,res) => {
        try {
            const id = req.params.id;
            res.status(200).json(list.getPostById(id));
        } catch (error) {
            res.status(404).json({message: 'Erro ao buscar post por id', error});
        }
    },

    
    updatePost: (req, res) => {
        try {
            res.status(200).json(list.updatePost(req.params.id, req.body));
        } catch (error) {
            res.status(404).json({message: 'Erro ao atualizar post', error});
        }
    },

    deletePost: (req, res) => {
        try {
            list.deletePost(req.params.id);
            res.status(200).json({message: 'Post deletado com sucesso'})
        } catch (error) {
            res.status(404).json('Erro ao deletar post', error);
        }
    },
}

module.exports = router;