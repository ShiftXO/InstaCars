module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: { message: 'You cannot perform this action!' } });
    }

    next();
}