import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import Guardian from "../models/Guardian.js";

import { env } from "../../../config/env.js";

export const parentLogin =
  async (req, res) => {
    try {
      const { phone, password } =
        req.body;

      const guardian =
        await Guardian.findOne({
          phone,
        });

      if (!guardian) {
        return res.status(404).json({
          success: false,
          message:
            "Guardian not found",
        });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          guardian.password
        );

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          id: guardian._id,
          schoolId:
            guardian.schoolId,
          role: guardian.role,
        },
        env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        success: true,
        message:
          "Parent login successful",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };