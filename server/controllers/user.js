import User from "../models/User.js";

/** /user/:id */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(501).send({ error: "invalid user id" });
    const findUser = await User.findById(id);
    if (findUser) {
      return res.status(201).json(findUser);
    }
  } catch (error) {
    return res.status(404).json({ msg: error.message });
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
