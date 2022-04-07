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

// Find One

// Follow

// Unfollow


module.exports = router;