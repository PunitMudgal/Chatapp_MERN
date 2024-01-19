import Message from "../models/Message.js";

/** POST */
// /message
export const sendMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

/** GET  */
// /message/:conversationId
export const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      convesationId: req.params.convesationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
