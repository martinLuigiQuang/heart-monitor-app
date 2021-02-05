import express from 'express';
const router = express.Router();
import { heartDataset } from './models/test.model.mjs';

router.route('/:date').get(async (req, res) => {
    const retrievedData = await heartDataset.find({ date: new RegExp(`${req.params.date}`) });
    res.status(200).json(retrievedData);
});

router.route('/delete/:id').delete(async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const deleted = await heartDataset.findByIdAndRemove(id);
    try {
        res.status(200).json(deleted);
    } catch (err) {
        res.status(400).json('Error ' + err);
    };
});

router.route('/').post(async (req, res) => {
    const { date, heartData } = req.body;
    const newEntry = new heartDataset({
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