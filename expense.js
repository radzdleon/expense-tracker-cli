const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'expenses.json');

// Helper: Load expenses
function loadExpenses() {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, 'utf-8');
  return data ? JSON.parse(data) : [];
}

// Helper: Save expenses
function saveExpenses(expenses) {
  fs.writeFileSync(dataPath, JSON.stringify(expenses, null, 2));
}

// Parse command-line args
const args = process.argv.slice(2);
const command = args[0];

// Add Expenses
if (command === 'add') {
  const descIndex = args.indexOf('--description');
  const amtIndex = args.indexOf('--amount');

  if (descIndex === -1 || amtIndex === -1 || !args[descIndex + 1] || !args[amtIndex + 1]) {
    console.log('❌ Usage: node expense.js add --description "Lunch" --amount 20');
    process.exit(1);
  }

  const description = args[descIndex + 1];
  const amount = parseFloat(args[amtIndex + 1]);

  if (isNaN(amount) || amount <= 0) {
    console.log('❌ Amount must be a positive number.');
    process.exit(1);
  }

  const expenses = loadExpenses();
  const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;

  const newExpense = {
    id,
    description,
    amount,
    date: new Date().toISOString().split('T')[0]
  };

  expenses.push(newExpense);
  saveExpenses(expenses);

  console.log(`✅ Expense added successfully (ID: ${id})`);
}

// List Expenses
else if (command === 'list') {
  const expenses = loadExpenses();

  if (expenses.length === 0) {
    console.log('📭 No expenses found.');
    return;
  }

  console.log('📋 Expenses:\n');
  console.log('ID  Date       Description        Amount');
  console.log('--  ---------- ------------------ -------');

  expenses.forEach(exp => {
    const id = exp.id.toString().padEnd(3);
    const date = exp.date.padEnd(10);
    const desc = exp.description.padEnd(18);
    const amount = `$${exp.amount.toFixed(2)}`;
    console.log(`${id} ${date} ${desc} ${amount}`);
  });
}

// Delete Expenses
else if (command === 'delete') {
  const idIndex = args.indexOf('--id');

  if (idIndex === -1 || !args[idIndex + 1]) {
    console.log('❌ Usage: node expense.js delete --id <id>');
    process.exit(1);
  }

  const id = parseInt(args[idIndex + 1]);
  const expenses = loadExpenses();
  const index = expenses.findIndex(e => e.id === id);

  if (index === -1) {
    console.log(`❌ Expense with ID ${id} not found.`);
    return;
  }

  expenses.splice(index, 1);
  saveExpenses(expenses);
  console.log(`🗑️ Expense with ID ${id} deleted successfully.`);
}

//Summary Expenses
else if (command === 'summary') {
  const monthIndex = args.indexOf('--month');
  const expenses = loadExpenses();

  if (expenses.length === 0) {
    console.log('📭 No expenses found.');
    return;
  }

  if (monthIndex !== -1 && args[monthIndex + 1]) {
    const month = parseInt(args[monthIndex + 1]); // 1-12
    const currentYear = new Date().getFullYear();

    const filtered = expenses.filter(exp => {
      const [year, m] = exp.date.split('-');
      return parseInt(m) === month && parseInt(year) === currentYear;
    });

    const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(`📅 Total expenses for month ${month}: $${total.toFixed(2)}`);
  } else {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(`💰 Total expenses: $${total.toFixed(2)}`);
  }
}

// Update Expenses
else if (command === 'update') {
  const idIndex = args.indexOf('--id');
  const descIndex = args.indexOf('--description');
  const amtIndex = args.indexOf('--amount');

  if (idIndex === -1 || !args[idIndex + 1]) {
    console.log('❌ Usage: node expense.js update --id <id> [--description "New desc"] [--amount 25]');
    return;
  }

  const id = parseInt(args[idIndex + 1]);
  const expenses = loadExpenses();
  const expense = expenses.find(e => e.id === id);

  if (!expense) {
    console.log(`❌ Expense with ID ${id} not found.`);
    return;
  }

  if (descIndex !== -1 && args[descIndex + 1]) {
    expense.description = args[descIndex + 1];
  }

  if (amtIndex !== -1 && args[amtIndex + 1]) {
    const amount = parseFloat(args[amtIndex + 1]);
    if (isNaN(amount) || amount <= 0) {
      console.log('❌ Amount must be a positive number.');
      return;
    }
    expense.amount = amount;
  }

  saveExpenses(expenses);
  console.log(`✏️ Expense with ID ${id} updated successfully.`);
}