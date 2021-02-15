import express from 'express';
const router = express.Router();
import { heartDataset } from './models/test.model.mjs';

router.route('/').post(async (req, res) => {
    const { date, heartData } = req.body;
    const newEntry = new heartDataset({
        date,
        heartData
    });
    await newEntry.save();
    try {
        res.status(200).json(newEntry);
    } catch (err) {
        res.status(400).json('Error ' + err);
    };
    return newEntry;
});

router.route('/:date').get(async (req, res) => {
    const retrievedData = await heartDataset.find({ date: new RegExp(`${req.params.date}`) });
    try {
        res.status(200).json(retrievedData);
    } catch (err) {
        res.status(400).json('Error ' + err);
    };
    return;
});

router.route('/delete/:id').delete(async (req, res) => {
    const id = req.params.id;
    const deleted = await heartDataset.findByIdAndRemove(id);
    try {
        res.status(200).json(deleted);
    } catch (err) {
        res.status(400).json('Error ' + err);
    };
    return deleted;
});

router.route('/update/:id').post(async (req, res) => {
    const id = req.params.id;
    const { date, heartData } = req.body;
    const updatedEntry = new heartDataset({
        date,
        heartData
    });
    const retrivedData = await heartDataset.findByIdAndRemove(id);
    try {
        await updatedEntry.save();
        try {
            res.status(200).json(updatedEntry);
        } catch (err) {
            res.status(400).json('Error ' + err);
        };
    } catch (err) {
        res.status(400).json('Error ' + err);
    };
    return retrivedData;
});

export default router;