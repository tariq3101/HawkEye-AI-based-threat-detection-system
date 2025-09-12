const router = require("express").Router();
const Admin = require("../models/Admin");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(req.body.password, salt);
        const newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const admin = await newAdmin.save();
        res.status(200).json(admin);
    } catch (err) {
        console.error('Registration error:', err);

        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0]; // tells which field
            return res.status(400).json({ 
                message: `${field} already exists. Please use another one.` 
            });
        }
        
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username });

        if (!admin) {
            return res.status(400).json("Wrong Credentials");
        }

        const validated = await bcryptjs.compare(req.body.password, admin.password);

        if (!validated) {
            return res.status(400).json("Wrong Password");
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log(token)
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        console.log(token)
        const { password, ...others } = admin._doc;
        res.status(200).json(others);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;