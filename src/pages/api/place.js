import connectMongoDb from "@/libs/mongodb";
import Places from "@/models/place";
import Groups from "@/models/group";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, typeId } = req.body;
      await connectMongoDb();
      const id = await new mongoose.Types.ObjectId();
      const newPlace = await Places.create({
        _id: id,
        title: title,
      });
      await Groups.findByIdAndUpdate({_id :typeId} , { $push: { places: id } });
      return res
        .status(200)
        .send({ message: "New place created successfully", id: id });
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: "API error" });
    }
  }
  if(req.method === "GET"){
    try{
      const {id} = req.query
      await connectMongoDb();
      const groups = await Groups.findById({_id : id}).populate(`places`).sort({createdAt: -1});
      const places = groups.places
      res.status(200).json(places);
    }catch(error){
      console.error(error)
      res.status(400).send({message :"API error"})
    }
  }
  if(req.method === "DELETE"){
    try{
      const {id, parentId} = req.body
      await connectMongoDb();
      await Places.findByIdAndDelete({_id : id})
      await Groups.findByIdAndUpdate({_id : parentId},{$pull :{groups : id}})
      return res.status(200).send({ message: "Deleted"})
    }catch(error){
      console.error(error)
      return res.status(400).send({message :"API error"})
  }}

  if(req.method === "PUT"){
    try{
      const {id, title} = req.body
      await connectMongoDb();
      await Places.findByIdAndUpdate({_id : id}, {title : title})
      return res.status(200).send({ message: "Updated"})
    }catch(error){
      console.error(error)
      return res.status(400).send({message: "API error"})
    }
  }
}
