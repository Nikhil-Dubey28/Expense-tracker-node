const Expense = require('../model/Expense')


// create/post expense api
const createExpense = async (req,res) => {
try {
    const {amount,description,category} = req.body 
    const newExpense = await Expense.create({amount,description,category})
    res.status(201).json(newExpense)
}catch (err) {
    console.log(err)
    res.status(500).json({message: 'internal server error'})
}
    
}


// get expenses api
const getExpenses = async(req,res) => {
    try {
        const expenses = await Expense.findAll()
        res.status(200).json(expenses)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
}

//get user by id;
const getExpenseById= async (req, res) => {
    try {
      const { id } = req.params;
      const expense = await Expense.findByPk(id);
  
      if (!expense) {
        return res.status(404).json({ message: 'expense not found' });
      }
  
      res.status(200).json(expense);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//delete expense
const deleteExpense = async (req,res) => {
    try {
        const{id} =req.params 
        await Expense.destroy({where: {id}})
        res.status(204).end()
     }catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
}

// edit user 

const editExpense = async (req,res) => {
    try {
        const { id } = req.params;
        const { amount, description, category } = req.body;
    
        const expense = await Expense.findOne({ where: { id } });
    
        if (!expense) {
          return res.status(404).json({ message: 'expense not found' });
        }
    
        expense.amount = amount;
        expense.description= description;
        expense.category = category;
        await expense.save();
    
        res.status(200).json(expense);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = {
    createExpense,
    getExpenses,
    deleteExpense,
    editExpense,
    getExpenseById,
}