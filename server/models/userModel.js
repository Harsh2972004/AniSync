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
    avatarUrl: {
      type: String,
      default: null,
    },
    avatarPublicId: {
      type: String,
      default: null
    },
    profileBannerUrl: {
      type: String,
      default: null,
    },
    profileBannerPublicId: {
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

userSchema.statics.register = async function (
  name,
  email,
  password,
  confirmPassword
) {
  const errors = {};

  //validation
  if (!name) {
    errors.name = "Please enter a username";
  }

  if (!email) {
    errors.email = "Please enter an email";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Please enter a password";
  } else if (!validator.isStrongPassword(password)) {
    errors.password =
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords doesn't match";
  }

  //check if user already exists
  const existingUser = await this.findOne({ email });
  if (existingUser) {
    errors.email = "Email already in use";
  }

  if (Object.keys(errors).length > 0) {
    const err = new Error("Validation failed");
    err.errors = errors;
    throw err;
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

userSchema.statics.login = async function (email, password) {
  const errors = {};

  if (!email) {
    errors.email = "Please enter an email";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Please enter a password";
  }
  const user = await this.findOne({ email });

  if (Object.keys(errors).length === 0) {
    if (!user) {
      errors.credentials = "Invalid email or password";
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errors.credentials = "Invalid email or password";
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    const err = new Error("Validation failed");
    err.errors = errors;
    throw err;
  }

  return user;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
