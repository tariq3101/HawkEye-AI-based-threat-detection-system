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
// LOGIN
router.post("/login", async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username });

        if (!admin) {
            return res.status(400).json({ message: "User not found" });
        }

        const validated = await bcryptjs.compare(req.body.password, admin.password);

        if (!validated) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set token as cookie (for frontend auth)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        // Exclude password from response
        const { password, ...others } = admin._doc;

        // ✅ Return token + admin details in JSON
        res.status(200).json({
            message: "Login successful",
            token,
            admin: others,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

// LOGOUT
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  });
  


module.exports = router;