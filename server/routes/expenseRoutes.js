const express = require('express');

const router = express.Router()

const expenseController = require('../controller/expenseController')


// post user api 
router.post('/expenses',expenseController.createExpense)

//get users api 
router.get('/expenses',expenseController.getExpenses)

//get user by id : 
router.get('/expenses/:id', expenseController.getExpenseById);


// delete user api 
router.delete('/expenses/:id',expenseController.deleteExpense)

//edit user api 
router.put('/expenses/:id',expenseController.editExpense)


module.exports = router;
