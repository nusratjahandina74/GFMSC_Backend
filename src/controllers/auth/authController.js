import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { env } from "../../config/env.js";
import User from "../../models/User.js";
import School from "../../models/School.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateTokens.js";


// =============================
// REGISTER SCHOOL
// =============================
export const registerSchool = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      schoolName,
      schoolCode,
      email,
      phone,
      address,
      adminName,
      adminEmail,
      adminPassword,
    } = req.body;

    const normalizedSchoolCode = schoolCode.trim().toUpperCase();
    const normalizedAdminEmail = adminEmail.trim().toLowerCase();

    const existingSchool = await School.findOne({
      schoolCode: normalizedSchoolCode,
    }).session(session);

    if (existingSchool) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "School already exists",
      });
    }

    const existingAdmin = await User.findOne({
      email: normalizedAdminEmail,
    }).session(session);

    if (existingAdmin) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "Admin email already exists",
      });
    }

    const school = await School.create(
      [
        {
          schoolName,
          schoolCode: normalizedSchoolCode,
          email: email.trim().toLowerCase(),
          phone,
          address,
        },
      ],
      { session }
    );

    const adminUser = await User.create(
      [
        {
          schoolId: school[0]._id,
          fullName: adminName,
          email: normalizedAdminEmail,
          password: adminPassword,
          role: "SchoolAdmin",
        },
      ],
      { session }
    );

    school[0].ownerId = adminUser[0]._id;
    await school[0].save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "School registered successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =============================
// LOGIN USER
// =============================
export const loginUser = async (req, res) => {
  try {
    const { email, password, schoolCode } = req.body;

    const normalizedSchoolCode = schoolCode.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();

    const school = await School.findOne({
      schoolCode: normalizedSchoolCode,
      isDeleted: false,
    });

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    const user = await User.findOne({
      schoolId: school._id,
      email: normalizedEmail,
      isDeleted: false,
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: user._id,
      schoolId: user.schoolId,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.lastLogin = new Date();
    await user.save();

    const safeUser = {
      _id: user._id,
      schoolId: user.schoolId,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =============================
// REFRESH ACCESS TOKEN
// =============================
export const refreshUserToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const decoded = jwt.verify(refreshToken, env.JWT_SECRET);

    const payload = {
      id: decoded.id,
      schoolId: decoded.schoolId,
      role: decoded.role,
    };

    const accessToken = generateAccessToken(payload);

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};