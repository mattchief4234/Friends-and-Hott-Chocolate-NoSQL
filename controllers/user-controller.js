const {User, Thoughts} = require('../models');

const userController = {

    //get all users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    getUserByID({params}, res) {
        User.findOne({_id: params.id})
        // .populate({
        //     path: 'thoughts',
        //     select: '-__v'
        // })
        // .populate({
        //     path: 'friends',
        //     select: '-__v'
        // })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'Nouser FOund with this ID!'})
                return;
            } 
            res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            })
    },

    //just try and create a user, hopefully...
    createUser({ body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },

    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User found with this ID, please try agian.'});
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },

    //try and work on the delete user tomorrow..
    deleteUser({ params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'NO USER WITH THIS ID, try again!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
        // Thoughts.deleteMany({ _id: params.id })
        //     .then(() => {
        //         User.findOneAndDelete({ _id: params.id })
        //             if(!dbUserData) {
        //                 res.status(404).json({message: 'No User found with this ID, please try again.'})
        //             }
        //             res.json(dbUserData);
        //             console.log('IT WORKED YOU GENIUS!!!')
        //     })
        //     .catch(err => res.json(err))

    },

    addFriend ({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $push: {friends: params.friendId}},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this ID, please try again.'})
                return
            }
            res.json(dbUserData)
        })
        .catch((err) => res.status(400).json(err))
    },

    //now delete a friend, I think its just like deleting a user, and also combining it with the addFriend one above....kinda.

    deleteFriend({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: {friends: params.friendId}}, //we need to pull instead of push here.
            { new: true}
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID, please try again!'})
                return
            }
            res.json(dbUserData)
            console.log('YOU HAVE SUCCESSFULLY DELETED A FRIEND!!! YOU HERMIT AND YOU LONER! POSER, WANNABE SIGMA MALE!')
        })
        .catch((err) => res.status(400).json(err))
    }
    
};

module.exports = userController

