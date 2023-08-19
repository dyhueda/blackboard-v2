import connectMongoDb from "@/libs/mongodb";
import Users from "@/models/user";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST" && req.body.url === "create") {
    try {
      const { username, password } = req.body;
      await connectMongoDb();
      const user = await Users.findOne({ username: username });
      if (user === null) {
        const id = await new mongoose.Types.ObjectId();
        const newUser = await Users.create({
          _id: id,
          username: username,
          password: password,
        });
        return res
          .status(201)
          .send({ message: "User created successfully", _id: id });
      } else {
        return res.status(400).send({ message: "Username already taken" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "API error" });
    }
  }
  if (req.method === "POST" && req.body.url === "login") {
    try {
      const { username, password } = req.body;
      await connectMongoDb();
      const user = await Users.findOne({ username: username });
      if (user === null) {
        return res.status(400).send({ message: "Username incorrect" });
      } else if (user.password === password) {
        const id = user._id
        return res.status(200).send({ message: "Connected", id: id});
      } else {
        res.status(400).send({ message: "Password Incorrect" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "API error" });
    }
  }
}
