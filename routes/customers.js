const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    if (!customers.length) return res.status(404).send('No customer found in the DB...');

    return res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(400).send(`Customer with given id ${req.params.id} is not found in the db...`);

    return res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold // what is isgold is not present?
    }, {
        new: true
    });

    return res.send(customer);
});

router.delete('/:id', async (req, res) => {
    let customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(400).send(`Customer with given id ${req.params.id} is not found in the db...`);

    customer = await customer.delete();
    return res.send(customer);
});

module.exports = router;