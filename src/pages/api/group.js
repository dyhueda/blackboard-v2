import connectMongoDb from "@/libs/mongodb";
import Groups from "@/models/group";
import Users from "@/models/user";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, typeId } = req.body;
      await connectMongoDb();
      const id = await new mongoose.Types.ObjectId();
      const newGroup = await Groups.create({
        _id: id,
        title: title,
      });
      await Users.findByIdAndUpdate({_id :typeId} , { $push: { groups: id } });
      return res
        .status(200)
        .send({ message: "New group created successfully", id: id });
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: "API error" });
    }
  }
  if(req.method === "GET"){
    try{
      const {id} = req.query
      await connectMongoDb();
      const users = await Users.findById({_id : id}).populate(`groups`).sort({createdAt: -1});
      console.log(users)
      const groups = users.groups
      res.status(200).json(groups);
    }catch(error){
      console.error(error)
      res.status(400).send({message :"API error"})
    }
  }
  if(req.method === "DELETE"){
    try{
      const {id: id , parentId: parentId} = req.body
      await connectMongoDb();
      await Groups.findByIdAndDelete({_id : id})
      await Users.findByIdAndUpdate({_id : parentId},{$pull :{groups : id}})
      return res.status(200).send({ message: "Deleted"})
    }catch(error){
      console.error(error)
      return res.status(400).send({message :"API error"})
  }}

  if(req.method === "PUT"){
    try{
      const {id, title} = req.body
      await connectMongoDb();
      await Groups.findByIdAndUpdate({_id : id}, {title : title})
      return res.status(200).send({ message: "Updated"})
    }catch(error){
      console.error(error)
      return res.status(400).send({message: "API error"})
    }
  }
}
