import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    user:{
      type:Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    amount: {
      type: Number,
      required: true,
    },

    transactionType: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "food",
        "education",
        "entertainment",
        "travel",
        "shopping",
        "freelancing",
        "gift",
        "salary",
        "other",
      ],
      default: "other",
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", TransactionSchema);

export default Transaction;
