const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update
router.put("/:id", async (req, res) => {
    //compara o id e checa se é um admin
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            //confere a senha
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (erro) {
                return res.status(500).json(erro);
            }
        }
        // pega o id e atualiza
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("A conta foi atualizada com sucesso.")
        } catch (erro) {
            return res.status(500).json(erro);
        }
    } else {
        return res.status(403).json("Você só pode atualizar sua conta!")
    }
})

// Delete
router.delete("/:id", async (req, res) => {
    //compara o id e checa se é um admin
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // pega o id e deleta
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("A conta foi deletada com sucesso.")
        } catch (erro) {
            return res.status(500).json(erro);
        }
    } else {
        return res.status(403).json("Você só pode deletar sua conta!")
    }
})

// Get One
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        //criando array pro que não vai mostrar na consulta
        const {password, updatedAt, createdAt, isAdmin, ...other} = user._doc
        res.status(200).json(other);
    } catch(erro){
        res.status(500).json(erro);
    }
})


// Follow
router.put("/:id/follow", async (req, res) => {
    //checa se o usuário não é o mesmo
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) { 
                await user.updateOne({ $push: { followers: req.body.userId}});
                await currentUser.updateOne({ $push: { followings: req.params.id}});
                res.status(200).json("Você está seguindo este usuário.")
            } else { 
                res.status(403).json("Você já segue esse usuário.")
            }
        } catch (erro) { 
            res.status(500).json(erro)
        }

        //se for o mesmo
    } else { 
        res.status(403).json("você não pode seguir a si mesmo.")
    }
});


// Unfollow
router.put("/:id/unfollow", async (req, res) => {
    //checa se o usuário não é o mesmo
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) { 
                await user.updateOne({ $pull: { followers: req.body.userId}});
                await currentUser.updateOne({ $pull: { followings: req.params.id}});
                res.status(200).json("Você deixou de seguir esse usuário.")
            } else { 
                res.status(403).json("Você não segue esse usuário.")
            }
        } catch (erro) { 
            res.status(500).json(erro)
        }

        //se for o mesmo
    } else { 
        res.status(403).json("Você não pode deixar de seguir a si mesmo.")
    }
});

module.exports = router;