const e = require('express');
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({

    // תרומה בפועל
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["מזומן", "נדרים פלוס", "Jgive", "חשבון בנק הלאומי", "חשבון דעת יהודית"] },

    // תדירות
    frequency: { type: String, enum: ["once", "monthly"], required: true },

    // רק אם frequency === "monthly"
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },       // null = בלי הגבלת זמן

    isActive: { type: Boolean, default: false },   // הפסקה ידנית / סיום
    stoppedAt: { type: Date, default: null },     // מתי הופסק

    nextDonationDate: { type: Date, default: null }, // מתי ליצור את התרומה הבאה

}, { timestamps: true });


module.exports = DonationSchema;