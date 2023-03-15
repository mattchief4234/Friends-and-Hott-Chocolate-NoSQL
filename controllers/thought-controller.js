const { User, Thoughts} = require('../Models');


const thoughtController = { //start

    getAllThought(req, res) {
        Thoughts.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err);
            res.status(400)
        })
    }, //end getallthought

    getThoughtsById({params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({id: -1})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message:'Sorry we cannot find a thought with this Id!'})
                return;
            }
            res.json(dbThoughtData)
            console.log('thought has been bought for a penny!')
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });

    }, //end of getThoughtsById

    createThoughts({ body}, res) {
        Thoughts.create(body)
            .then(({_id }) => {
            return User.findOneAndUpdate (
                { _id: body.userid},
                { $push: { thoguhts: _id }},
                {new: true}
            )
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Sorry we cannot find a thought with this ID!'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))

    },//end createThoughts

    updateThoughts({ params, body}, res) {
        Thoughts.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'Sorry we cannot find a thought with that ID!'})
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },//end creatThoughts

    deleteThoughts({ params}, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Sorry we cannot find a thougth with that ID!'})
                    return;
                }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.id}},
                {new: true}
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Sorry we could not find a user with this Id!'})
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))

    },
    // end deleteThoughts

    createReaction({ params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .popoulate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Sorry we could not find any Thought with this ID!'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },//end createReaction

    deleteReaction({ params}, res) {
        Thoughts.FindOneAndUpdate(
            { _id: params. thoughtId},
            { $pull: {reactions: { reactionId: params.reactionsId }}},
            { new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "THIS MESSAGE IS GOING TO BE DELETED!!!!!! OH NO!!!!!!!!!!!!!!!!!!!!!!!!"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    }

}//end


module.exports = thoughtController