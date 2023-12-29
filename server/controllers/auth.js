import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** REGISTER */
/** /auth/register */
export const register = async (req, res) => {
  try {
    const { name, email, password, picturePath } = req.body;

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      res.status(400).send({ Error: "user already exist" });
      throw new Error("email already in use");
    }

    //   const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      aboutUser: "",
      picturePath,
    });
    newUser
      .save()
      .then(() => {
        const token = jwt.sign({ email }, process.env.JWT_SECRET_TOKEN);
        res.status(201).send({ msg: "user registration successful", token });
      })
      .catch((error) =>
        res
          .status(500)
          .send({ err: "error occured while regstration of the user", error })
      );
  } catch (error) {
    return res.status(500).send({ err: "error occured at start", error });
  }
};

/** LOGIN */
/** /auth/login */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "user doesnot exist!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_TOKEN
    );
    //todo delete user.password
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** DELETE ACCOUNT */
/** /auth/delete_account */
export const deleteAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "user not found!" });
      throw new Error("user not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).json({ msg: "password does not match" });
      throw new Error("Password does not match");
    }
    // console.log("this is request ------>>>>> ", req.user);
    await User.findByIdAndDelete(user._id);
    res.status(200).json("user account deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**GET ALL USERS */
/** /auth/getAll */
export const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
};
