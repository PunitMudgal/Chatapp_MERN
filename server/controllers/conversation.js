import Conversation from "../models/Conversation.js";

/** post >> new conversation */
// /conversation
export const newConversation = async (req, res) => {
  const newConvo = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConvo = await newConvo.save();
    res.status(200).json(savedConvo);
  } catch (error) {
    res.status(500).json(err);
  }
};

/** get >> get conversation of a user */
// /conversation/:userId
export const getConvoSingleUser = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).lean();
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(err);
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
