const router = require('express').Router();

const {
    getAllThought,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router .route('/').get(getAllThought).post(createThoughts);

router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

    module.exports = router;