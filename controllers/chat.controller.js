import Message from "../models/message.model.js"

const sendMessage = async (req, res) => {
    
    try {
        const { sender, content, room } = req.body 
        
        const message = new Message({
            sender , content , room
        })

        await message.save()

        res.status(201).json(message)

    } catch (error) {
        res.status(400).json({error : error.message})
    }

}


const getMessages = async (req, res) => {
    try {
        const { room } = req.params
        
        const messages = await Message.find({ room }).populate("sender", "name")
        
        res.status(200).json(messages)

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}



export {sendMessage , getMessages }