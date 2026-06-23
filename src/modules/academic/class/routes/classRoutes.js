import express from "express";
import Class from "../models/Class.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newClass = await Class.create(req.body);

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;