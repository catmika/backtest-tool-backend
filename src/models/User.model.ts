import mongoose, { Document, Schema } from 'mongoose';
import { Query } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  email: string;
  name: string;
  password: string;
  confirmationToken: string;
  resetToken: string;
  isConfirmed: boolean;
  isGoogle: boolean;
  isDeleted: boolean;
  passwordChangedAt: Date;
}

export interface IUserDocument extends Document, IUser {
  changedPasswordAfter(JWTTimestamp: number): boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: 'mr. Noname',
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirmationToken: {
      type: String,
      required: true,
    },
    resetToken: String,
    isConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date();

  // Subtract 1 second to ensure that token is created after password change
  this.passwordChangedAt.setSeconds(this.passwordChangedAt.getSeconds() - 1);

  next();
});

userSchema.pre(
  /^find/,
  function (this: Query<IUserDocument[], IUserDocument>, next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  },
);

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000,
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model<IUserDocument>('Users', userSchema);

export default User;
