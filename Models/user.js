const { Schema, Types } = require('mongoose');

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
      type: string,
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

const User = model('User', userSchema);

module.exports = User;