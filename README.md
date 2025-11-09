# Bill and Expense Tracker

A simple, easy-to-use web application for tracking your expenses and income. Monitor your financial health by seeing the difference between your income and expenses in real-time.

## Features

- **Track Expenses**: Add, edit, and remove expense entries with descriptions and amounts
- **Track Income**: Add, edit, and remove income entries with descriptions and amounts
- **Financial Overview**: See the difference between your total income and total expenses
- **Persistent Storage**: All data is saved to your browser's local storage
- **Data Validation**: Automatic validation and cleanup of corrupted data

## Getting Started

1. Open `index.html` in your web browser
2. Start adding your income sources and expenses
3. View your financial summary in real-time

## How to Use

### Adding Income
1. Enter a description for your income source (e.g., "Salary", "Freelance Work")
2. Enter the amount
3. Click "Add Income"

### Adding Expenses
1. Enter a description for your expense (e.g., "Groceries", "Rent")
2. Enter the amount
3. Click "Add Expense"

### Editing Entries
- Click the "Edit" button next to any income or expense entry
- Update the description and/or amount in the prompts
- Changes are automatically saved

### Removing Entries
- Click the "Remove" button next to any entry to delete it
- Changes are automatically saved

## Technical Details

- **Pure JavaScript**: No frameworks required
- **Local Storage**: Data persists between sessions
- **Responsive Design**: Works on desktop and mobile browsers

## Files

- `index.html` - Main HTML structure
- `script.js` - Application logic and event handlers
- `styles.css` - Styling and layout
- `calculations.js` - Calculation utilities
- `storage.js` - Local storage management

## Browser Support

Works in all modern browsers that support:
- ES6 JavaScript
- LocalStorage API
- CSS Grid/Flexbox
