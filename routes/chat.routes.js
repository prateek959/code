import express from "express"
import { getMessages, sendMessage } from "../controllers/chat.controller.js"

const chatRouter = express.Router()

chatRouter.post('/message', sendMessage)
chatRouter.get('/message/:room', getMessages)

export default chatRouter;