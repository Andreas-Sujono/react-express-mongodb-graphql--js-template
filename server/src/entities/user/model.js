import mongoose from 'mongoose';
import { USER_ROLE, ACCOUNT_TYPE } from '../../utils/constants/user';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    full_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    hashed_password: { type: String, required: true, trim: true },
    profession: { type: String, trim: true },
    description: { type: String, trim: true },
    profile_image: {
      type: String,
      trim: true,
      default: '',
    },
    phone_number: { type: String, trim: true },

    role: { type: Number, default: USER_ROLE.USER },
    account_type: { type: Number, default: ACCOUNT_TYPE.GENERAL },
    is_logged_in: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    otp_code: { type: String },
    otp_expires_at: { type: Date },
    last_login_at: { type: Date },
    email_verified_at: { type: Date, default: null },
    phone_number_verified_at: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date },
  },
  {
    timestamps: {
      otpExpiresAt: 'otp_expires_at',
      lastLoginAt: 'last_login_at',
      emailVerifiedAt: 'email_verified_at',
      phoneNumberVerifiedAt: 'phone_number_verified_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    autoCreate: true,
  }
);

const UserModel = mongoose.model('User', userSchema);

export { userSchema, UserModel };
