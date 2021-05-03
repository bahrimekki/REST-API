const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./config/ConnectDB");
const User = require("./model/User");

app.use(express.json());
//------------------Connecte to the Databas -----------------------
connectDB();
//------------------GET :  RETURN ALL USERS -----------------------
app.get("/", async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).send({ msg: "All Users are finded", Users });
    } catch (error) {
        res.status(500).send({ msg: "Any Users are finded", error });
    }
});
//------------------POST :  ADD A NEW USER TO THE DATABASE -----------------------
app.post("/", async (req, res) => {
    try {
        const {
            ferstName,
            secondName,
            email,
            phoneNumber,
            age,
            imageLien,
        } = req.body;
        const newUser = new User({
            ferstName,
            secondName,
            email,
            phoneNumber,
            age,
            imageLien,
        });
        await newUser.save();
        res.status(200).send({ msg: "New User is added", newUser });
    } catch (error) {
        res.status(500).send({ msg: "User is not added", error });
    }
});
//------------------PUT : EDIT A USER BY ID -----------------------
app.put("/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        const updatUser = await User.findOneAndUpdate(
            { _id: Id },
            { ...req.body },
            { new: true }
        );
        res.status(200).send({ msg: "User is Update", updatUser });
    } catch (error) {
        res.status(500).send({ msg: "User is not Update", error });
    }
});
//------------------DELETE : REMOVE A USER BY ID -----------------------
app.delete("/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        const deletUser = await User.findOneAndDelete(Id);
        res.status(200).send({ msg: "User deleted", deletUser });
    } catch (error) {
        res.status(500).send({ msg: "User is not deleted", error });
    }
});

app.listen(port, () => {
    console.log(`port:${port}`);
});
