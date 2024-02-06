const express = require('express');
const { addTransaction, getAllTransactions ,editTransaction,deleteTransaction} = require('../controllers/transactionController');


//router obj
const router = express.Router();

//routes
//add transaction
router.post('/add-transaction',addTransaction)

// edit transaction 
router.post('/edit-transaction',editTransaction)
// delete transaction 
router.post('/delete-transaction',deleteTransaction)



//get all transactions(post because we are sending userid )
router.post('/get-transactions', getAllTransactions);

module.exports = router