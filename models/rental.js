const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 200
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 250
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 1000
            }
        })
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    }
})