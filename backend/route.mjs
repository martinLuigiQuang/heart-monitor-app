import express from 'express';
const router = express.Router();
import { test } from './models/test.model.mjs';

router.route('/:date').get(async (req, res) => {
    const retrievedData = await test.find({ date: new RegExp(`${req.params.date}`) });
    res.status(200).json(retrievedData);
});

router.route('/delete/:id').delete(async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const deleted = await test.findByIdAndRemove(id);
    try {
        console.log(deleted);
        res.status(200).json(deleted);
    } catch (err) {
        res.status(400).json('Error ' + err);
    };
});

router.route('/').post(async (req, res) => {
    const { date, heartData } = req.body;
    const newEntry = new test({
        date,
        heartData
    });
    await newEntry.save();
    try {
        res.status(200).json(newEntry)
    } catch(err) {
        res.status(400).json('Error ' + err);
    };
});

export default router;