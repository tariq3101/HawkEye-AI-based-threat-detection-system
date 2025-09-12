const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:8080", 
    credentials: true
}));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected successfully"))
.catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log("Backend is running successfully");
});

app.get("/", (req, res) =>{
    res.send("Hello");
});

const authRoute = require("./routes/auth"); 
app.use("/auth", authRoute);