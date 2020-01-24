const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

router.get('/', async (req, res) => {
    try {
        const stores = await Store.find();

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' })
    }
});

router.post('/', async (req, res) => {
    try {
        const store = await Store.create(req.body);

        return res.status(200).json({
            success: true,
            data: store
        })
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' })
        }
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;