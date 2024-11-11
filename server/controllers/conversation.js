import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

/** post >> new conversation */
// /conversation
export const createConversation = async (req, res) => {
  try {
    const { participants } = req.body;

    // Check if the conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: participants },
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    conversation = new Conversation({ participants });
    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** get >> Get all conversations for a user */
// /conversation/:userId
export const getUserConversations = async (req, res) => {
  try {
    const userId = req.params.userId;

    const conversations = await Conversation.find({ participants: userId })
      .populate({
        path: "participants",
        select: "name email picturePath",
      })
      .populate({
        path: "lastMessage",
        select: "text createdAt",
      });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**  Update the last message in a conversation
 */
export const updateLastMessage = async (req, res) => {
  try {
    const { conversationId, messageId } = req.body;

    // Update the last message reference in the conversation
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { lastMessage: messageId },
      { new: true }
    );

    if (!updatedConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json(updatedConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** Delete a conversation */
export const deleteConversation = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    // Delete the conversation
    const deletedConversation = await Conversation.findByIdAndDelete(
      conversationId
    );

    if (!deletedConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Optionally, delete all messages associated with the conversation
    await Message.deleteMany({ conversationId });

    res.status(200).json({
      message: "Conversation and associated messages deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** get >> get conversation includes two user */
// /conversation/find/:firstUserId/:secondUserId
export const getConvoTwoUsers = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    }).lean();
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(err);
  }
};
