const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transactionController');


//router obj
const router = express.Router();

//routes
//add transaction
router.post('/add-transaction',addTransaction)

//get all transactions(post because we are sending userid )
router.post('/get-transactions', getAllTransactions);

module.exports = router