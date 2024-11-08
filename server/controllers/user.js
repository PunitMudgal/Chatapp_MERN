import User from "../models/User.js";

/** /user/:id */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .lean()
      .select("-password -createdAt -updatedAt");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/** /user/search/:name */
export const searchUser = async (req, res) => {
  try {
    const { name } = req.params;
    const users = await User.find({
      $or: [{ name: { $regex: name } }, { email: { $regex: name } }],
    });
    if (users) return res.status(201).json(users);
  } catch (error) {
    return res.status(404).send({ msg: error.message });
  }
};

/** /user/updateUser */
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    if (userId) {
      const body = req.body;
      const updateInfo = await User.updateOne({ _id: userId }, body);
      if (updateInfo)
        return res.status(201).send({ msg: "Record Updated", updateInfo });
    } else {
      return res.status(401).send({ error: "user not found!" });
    }
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

/** PROFILE PHOTO */
// export const profilePhoto = async(req, res) => {
//   try {
//     const {userId, picturePath} = req.body;
//     const user = await User.findById(userId);
//     const profilePicture =
//   } catch (error) {

//   }
// }
