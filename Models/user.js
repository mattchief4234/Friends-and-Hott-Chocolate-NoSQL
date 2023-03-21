// const { Schema, Types, model } = require('mongoose');
const moment = require('moment');
const mongoose = require('mongoose');

const { Schema, Types, model } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+A.+\..+/]

    },
    thoughts: [
        {
             type: Schema.Types.ObjectId,
             ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// const User = model('user', userSchema);

// module.exports = User;

module.exports = 
  mongoose.models.User || mongoose.model('User', userSchema);