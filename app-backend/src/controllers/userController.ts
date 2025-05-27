import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "24h" });
};

const deleteOldImage = (imagePath: string | undefined) => {
  if (imagePath) {
    const fullPath = path.join(__dirname, "../..", imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, description } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all required fields" });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      description,
      profileImage: req.file?.path,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
      message: 'User created successfully!'
    });
  } catch (error) {
    const parsedError = error as { message: string };
    res.status(500).json({ message: parsedError.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    const parsedError = error as { message: string };
    res.status(500).json({ message: parsedError.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req?.user?.id).select("-password");
    res.json(user);
  } catch (error) {
    const parsedError = error as { message: string };
    res.status(500).json({ message: parsedError.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, description, password } = req.body;
    const user = await User.findById(req?.user?.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (req.file) {
      deleteOldImage(user.profileImage);
      user.profileImage = req.file.path;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.description = description || user.description;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      description: updatedUser.description,
    });
  } catch (error) {
    const parsedError = error as { message: string };
    res.status(500).json({ message: parsedError.message });
  }
};
