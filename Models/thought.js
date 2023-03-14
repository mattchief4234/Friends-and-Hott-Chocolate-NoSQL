const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schmea ({

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

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;