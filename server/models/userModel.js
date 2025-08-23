import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    favourites: {
      type: [Number],
      default: [],
      required: true,
    }, // Array of AniList anime IDs
    animeList: [
      {
        animeId: {
          type: Number,
        }, // AniList ID
        status: {
          type: String,
          enum: ["watching", "completed", "dropped", "planning"],
          default: "planning",
        },
        progress: Number,
        score: Number,
        notes: {
          type: String,
          default: null,
        },
      },
    ],
    avatar: {
      type: String,
      default: null,
    },
    profileBanner: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    anilistId: {
      type: String,
      default: null,
    },
    anilistAvatar: {
      type: String,
      default: null,
    },
    anilistBannerImage: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    emailOTP: {
      type: String,
      default: null,
    },
    emailOTPExpires: {
      type: Date,
      default: null,
    },
    lastEmailResend: {
      type: Date,
      default: null,
    },
    lastResetResend: {
      type: Date,
      default: null,
    },
    resestPassword: {
      type: String,
      default: null,
    },
    resestPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.register = async function (name, email, password) {
  //validation
  if (!name || !email || !password) {
    throw new Error("Please fill in all fields");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    );
  }
  //check if user already exists
  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await this.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

userSchema.static.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw new Error("Please fill in all fields");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address");
  }

  //check if user exists
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  //check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
