import connectMongoDb from "@/libs/mongodb";
import Tasks from "@/models/task";
import Places from "@/models/place";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, typeId } = req.body;
      await connectMongoDb();
      const id = await new mongoose.Types.ObjectId();
      const newTask = await Tasks.create({
        _id: id,
        title: title,
        active: true
      });
      await Places.findByIdAndUpdate({_id :typeId} , { $push: { tasks: id } });
      return res
        .status(200)
        .send({ message: "New task created successfully", id: id });
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: "API error" });
    }
  }
  if(req.method === "GET"){
    try{
      const {id} = req.query
      await connectMongoDb();
      const places = await Places.findById({_id : id}).populate(`tasks`).sort({createdAt: -1});
      const tasks = places.tasks
      res.status(200).json(tasks);
    }catch(error){
      console.error(error)
      res.status(400).send({message :"API error"})
    }
  }
  if(req.method === "DELETE"){
    try{
      const {id, parentId } = req.body
      await connectMongoDb();
      await Tasks.findByIdAndDelete({_id : id})
      await Places.findByIdAndUpdate({_id : parentId},{$pull :{places : id}})
      return res.status(200).send({ message: "Deleted"})
    }catch(error){
      console.error(error)
      return res.status(400).send({message :"API error"})
  }}

  if(req.method === "PUT"){
    try{
      const {id, title, active} = req.body
      await connectMongoDb();
      await Tasks.findByIdAndUpdate({_id : id}, {title : title , active : active})
      return res.status(200).send({ message: "Updated"})
    }catch(error){
      console.error(error)
      return res.status(400).send({message: "API error"})
    }
  }
}
