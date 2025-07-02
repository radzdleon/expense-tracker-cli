# 📅 Expense Tracker CLI
https://roadmap.sh/projects/expense-tracker

Expense Tracker CLI is a command-line application to **record, manage, and summarize your personal expenses**. Track daily spending, update entries, and get real-time totals — all from your terminal.

---

## 📆 Features

* ➕ Add an expense with a description and amount
* ✍️ Update any existing expense
* ❌ Delete expenses by ID
* 📋 View all expenses in a simple table
* 📈 Get total spending summary
* 📅 Filter summary by specific month (current year)
* 💡 Built with **Node.js only** (no external libraries)
* 📁 Stores data in a local `expenses.json` file

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/radzdleon/expense-tracker-cli.git
cd expense-tracker-cli
```

### 2. Run the CLI

```bash
node expense.js <command> [options]
```

---

## 🛠️ Commands & Usage

### Add a New Expense

```bash
node expense.js add --description "Lunch" --amount 20
```

### List All Expenses

```bash
node expense.js list
```

### Delete an Expense by ID

```bash
node expense.js delete --id 2
```

### Update an Expense by ID

```bash
node expense.js update --id 2 --description "Dinner with friends" --amount 25
```

### View Total Summary

```bash
node expense.js summary
```

### View Monthly Summary (current year)

```bash
node expense.js summary --month 7
```

---

## 🧱 Expense Data Format (expenses.json)

```json
[
  {
    "id": 1,
    "description": "Lunch",
    "amount": 20,
    "date": "2025-07-02"
  }
]
```

---

## 📂 Project Structure

```
expense-tracker-cli/
├── expense.js       # Main CLI logic
├── expenses.json    # Stores your expense data
└── README.md        # Documentation
```

---

## 🚪 Requirements

* Node.js v14+
* No npm dependencies

---

## ✨ Future Enhancements

* Expense categories & filters
* Monthly budget limits & warnings
* Export to CSV or JSON
* Pretty-colored output
* Command auto-completion or help system

---

## 💬 Feedback

Pull requests and suggestions are welcome. Let’s make budgeting easier, one terminal command at a time!
