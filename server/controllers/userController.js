const router = require('express').Router();
const authService = require('../services/authService');

const { auth } = require('../middlewares/auth');

router.get('/:id', auth, async (req, res, next) => {
    try {
        let result = await authService.getUserById(req.params.id);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;