const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add A User Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add An Email"],
      unique: true,
        },

    password: {
      type: String,
      required: [true, "Please Add A Password"],
        },
        isDisabled: {
            type: Boolean,
            required: true,
            default: false,
        },
    
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
},
  {
    timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);