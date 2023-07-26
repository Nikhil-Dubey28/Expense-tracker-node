const baseUrl = 'http://localhost:3000/api/expenses';

async function addExpense() {
  let expenseAmount = document.querySelector('#expenseAmount').value;
  let expenseDescription = document.querySelector('#expenseDescription').value;
  let expenseCategory = document.querySelector('#expenseCategory').value;

  if (expenseAmount && expenseDescription && expenseCategory) {
    const expense = {
      amount: expenseAmount,
      description: expenseDescription,
      category: expenseCategory,
    };

    try {
      await axios.post(baseUrl, expense);
      getExpenses();
      document.querySelector('#expenseAmount').value = ''; // Clear the expenseAmount input field
      document.querySelector('#expenseDescription').value = ''; // Clear the expenseDescription input field
    } catch (err) {
      console.log(err);
    }
  }
}

async function getExpenses() {
  try {
    const response = await axios.get(baseUrl);
    const expenses = response.data;
    displayExpenses(expenses);
  } catch (err) {
    console.log(err);
  }
}

function displayExpenses(expenses) {
  const expenseList = document.querySelector('#expenseList');
  expenseList.innerHTML = '';

  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<b>Amount</b>: $${expense.amount} || <b>Description</b>: ${expense.description} || <b>Category</b>: (${expense.category})`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'ml-2', 'float-right');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', () => deleteExpense(expense.id));

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-success', 'ml-2', 'float-right');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => editExpense(expense.id));

    li.appendChild(deleteButton);
    li.appendChild(editButton)
    expenseList.appendChild(li);
  });
}

async function deleteExpense(id) {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    getExpenses();
  } catch (err) {
    console.log(err);
  }
}

// Event listener for the form submission
document.querySelector('#expenseForm').addEventListener('submit', event => {
  event.preventDefault();
  addExpense();
});

async function editExpense(id) {
  try {
    // Get the values of the expense to prefill the form
    const response = await axios.get(`${baseUrl}/${id}`);
    const expense = response.data;

    // Prefill the form with the expense details
    document.querySelector('#expenseAmount').value = expense.amount;
    document.querySelector('#expenseDescription').value = expense.description;
    document.querySelector('#expenseCategory').value = expense.category;

    // Delete the current expense
    await deleteExpense(id);
  } catch (err) {
    console.log(err);
  }
}

// Rest of the code remains unchanged



// Initial data retrieval
getExpenses();
