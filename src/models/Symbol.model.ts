import mongoose, { Document, Schema } from 'mongoose';

export enum MARKET {
  INDICES = 'indices',
  STOCKS = 'stocks',
  CRYPTO = 'cryptocurrencies',
  FOREX = 'forex_pairs',
  ETF = 'etf',
  FUNDS = 'funds',
  BONDS = 'bonds',
}

export interface ISymbol {
  shortName: string;
  fullName: string;
  market: MARKET;
  exchanges: string[];
}

export interface ISymbolDocument extends Document, ISymbol {}

const symbolSchema = new Schema<ISymbol>(
  {
    shortName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    market: {
      type: String,
      required: true,
    },
    exchanges: [String],
  },
  {
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(this.password, 12);

//   next();
// });

// userSchema.pre('save', function (next) {
//   if (!this.isModified('password') || this.isNew) return next();

//   this.passwordChangedAt = new Date();

//   // Subtract 1 second to ensure that token is created after password change
//   this.passwordChangedAt.setSeconds(this.passwordChangedAt.getSeconds() - 1);

//   next();
// });

// userSchema.pre(
//   /^find/,
//   function (this: Query<IUserDocument[], IUserDocument>, next) {
//     this.find({ isDeleted: { $ne: true } });
//     next();
//   },
// );

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = Math.floor(
//       this.passwordChangedAt.getTime() / 1000,
//     );
//     return JWTTimestamp < changedTimestamp;
//   }

//   return false;
// };

const Symbol = mongoose.model<ISymbolDocument>('Symbol', symbolSchema);

export default Symbol;
