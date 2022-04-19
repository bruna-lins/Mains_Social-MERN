const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

/* REGISTER */
router.post("/register", async (req, res) => {
    try {
        // cria senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //cria usuário
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //salva usuário e retorna resposta
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (erro) {
        res.status(500).json(erro)
    }
});

/* LOGIN */
router.post("/login", async (req, res) => {
    try {
        //busca o usuário
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("usuário não encontrado");
        //checa a senha
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("senha inválida")
        //loga
        res.status(200).json(user)
    } catch (erro) { 
       res.status(500).json(erro)
    }
});

module.exports = router