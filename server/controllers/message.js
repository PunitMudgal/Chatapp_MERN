import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

/** POST */
// /message
export const createMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;

    const message = new Message({ conversationId, sender, text });

    // Use Promise.all to save the message and update the conversation concurrently
    const [savedMessage] = await Promise.all([
      message.save(),
      Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: message._id,
      }),
    ]);

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** GET  */
// /message/:conversationId
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 20 } = req.query; // Default to page 1, 20 messages per page

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 }) // Sort by newest messages first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  ! create messaage old code
//  export const createMessage = async (req, res) => {
//   try {
//     const { conversationId, sender, text } = req.body;

//     // Create and save the new message
//     const message = new Message({ conversationId, sender, text });
//     await message.save();

//     // Update the conversation's last message
//     await Conversation.findByIdAndUpdate(conversationId, {
//       lastMessage: message._id,
//     });

//     res.status(201).json(message);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
