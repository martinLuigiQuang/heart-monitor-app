import express from 'express';
const router = express.Router();
import { test } from './models/test.model.mjs';

router.route('/:date').get(async (req, res) => {
    const retrievedData = await test.find({ date: new RegExp(`${req.params.date}`) });
    res.status(200).json(retrievedData);
});

router.route('/').post(async (req, res) => {
    const { date, heartData } = req.body;
    console.log(req.body);
    const newEntry = new test({
        date,
        heartData
    });
    await newEntry.save();
    try {
        res.status(200).json(newEntry)
    } catch(err) {
        res.status(400).json('Error ' + err)
    };
});

export default router;