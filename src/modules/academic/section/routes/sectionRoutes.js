import express from "express";
import Section from "../models/Section.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const section = await Section.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;