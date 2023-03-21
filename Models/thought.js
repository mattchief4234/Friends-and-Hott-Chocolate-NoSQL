// const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const mongoose = require('mongoose');

const { Schema, Types, model } = mongoose;
mongoose.Promise = global.Promise;


const reactionsSchema = new Schema({

    reactionId: {
        type: Schema.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJson: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);



const thoughtSchema = new Schema(
    {

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => SVGAnimateMotionElement(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        requird: true,
    },
    reactions: [reactionsSchema],
},
{
    toJson:{
        virtuals: true,
        getters: true,

    },
    id: false,
}
);

// const reactionsSchema = new Schema({

//     reactionId: {
//         type: Schema.ObjectId,
//         default: () => new Types.ObjectId()
//     },
//     reactionBody: {
//         type: String,
//         required: true,
//         maxlength: 280,
//     },
//     username: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
//     }
// },
// {
//     toJson: {
//         virtuals: true,
//         getters: true,
//     },
//     id: false,
// }
// );

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// const Thoughts = model('thoughts', thoughtSchema);

// module.exports = Thoughts;

module.exports = 
  mongoose.models.Thoughts || mongoose.model('Thoughts', thoughtSchema);