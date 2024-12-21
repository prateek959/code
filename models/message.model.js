import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  room : {type : String , required : true}
} , {timestamps : true} );

const Message = model("msg", messageSchema)

export default Message