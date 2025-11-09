// script.js logic for handling expense and income submissions and displaying them on the page

const expenses = [];
const incomes = [];

const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const incomeForm = document.getElementById('income-form');
const incomeDescriptionInput = document.getElementById('income-description');
const incomeAmountInput = document.getElementById('income-amount');

incomeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const description = incomeDescriptionInput.value;
    const amount = parseFloat(incomeAmountInput.value);
    if (description && !isNaN(amount) && amount > 0) {
        incomes.push({ description, amount });
        refreshIncomeList();
        updateIncomeTotal();
        updateTotalsPanel();
        saveIncomesToStorage(incomes);
        incomeDescriptionInput.value = '';
        incomeAmountInput.value = '';
    }
});

function handleExpenseSubmission(event) 
{
    event.preventDefault();
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    storeExpense(description, amount);
    saveExpensesToStorage(expenses);
    refreshExpenseList();
    updateTotalsPanel();
    clearFormInputs();
}

function getOrCreateExpenseContainer()
{
    let container = document.getElementById('expense-list');

    if (!container)
    {
        container = document.createElement('div');
        container.id = 'expense-list';
        document.body.appendChild(container);
    }

    return container;
}

function createExpenseElement(description, amount)
{
    const expenseDiv = document.createElement('div');
    expenseDiv.className = 'expense-item';
    expenseDiv.textContent = `${description}: $${amount.toFixed(2)}`;
    return expenseDiv;
}

function clearFormInputs()
{
    descriptionInput.value = '';
    amountInput.value = '';
}

function storeExpense(description, amount)
{
    const expense = { 
        description: description, 
        amount: amount 
    };
    expenses.push(expense);
}

function updateTotalDisplay()
{
    const total = calculateTotal(expenses);
    displayTotal(total);
}

function displayTotal(total)
{
    let totalElement = document.getElementById('total-display');
    if (!totalElement) 
    {
        totalElement = document.createElement('div');
        totalElement.id = 'total-display';
        totalElement.className = 'total-display';
        document.body.appendChild(totalElement);
    }
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function updateTotalsPanel() 
{
    const totalsPanel = document.getElementById('totals-panel');
    if (!totalsPanel) return;
    while (totalsPanel.firstChild) {
        totalsPanel.removeChild(totalsPanel.firstChild);
    }
    // Show difference between income and expenses
    const difference = calculateDifference(expenses, incomes);
    const diffDiv = document.createElement('div');
    diffDiv.textContent = `Income - Expenses: $${difference.toFixed(2)}`;
    totalsPanel.appendChild(diffDiv);
}

function removeExpense(index)
{
    if (index >= 0 && index < expenses.length)
    {
        expenses.splice(index, 1);
        refreshExpenseList();
        updateTotalsPanel();
    }
}

function refreshExpenseList()
{
    const expenseContainer = getOrCreateExpenseContainer();
    while (expenseContainer.firstChild) 
    {
        expenseContainer.removeChild(expenseContainer.firstChild);
    }
    expenses.forEach((expense, index) => {
        // Validate expense object has required properties
        if (!expense || typeof expense.amount !== 'number' || !expense.description) {
            console.warn('Invalid expense object at index', index, expense);
            return; // Skip this invalid expense
        }
        
        const expenseDiv = document.createElement('div');
        expenseDiv.className = 'expense-item';
        expenseDiv.textContent = `${expense.description}: $${expense.amount.toFixed(2)}`;
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.marginLeft = '10px';
        editBtn.onclick = function() {
            const newDescription = prompt('Edit description:', expense.description);
            if (newDescription === null) return; // User cancelled
            
            const newAmountStr = prompt('Edit amount:', expense.amount);
            if (newAmountStr === null) return; // User cancelled
            
            const newAmount = parseFloat(newAmountStr);
            if (newDescription.trim() && !isNaN(newAmount) && newAmount > 0) {
                expense.description = newDescription.trim();
                expense.amount = newAmount;
                saveExpensesToStorage(expenses);
                refreshExpenseList();
                updateTotalsPanel();
            } else {
                alert('Please enter a valid description and amount (must be greater than 0).');
            }
        };
        expenseDiv.appendChild(editBtn);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.onclick = function() {
            expenses.splice(index, 1);
            saveExpensesToStorage(expenses);
            refreshExpenseList();
            updateTotalsPanel();
        };
        expenseDiv.appendChild(removeBtn);
        expenseContainer.appendChild(expenseDiv);
    });
}

function refreshIncomeList() {
    const incomeList = document.getElementById('income-list');
    if (!incomeList) return;
    while (incomeList.firstChild) {
        incomeList.removeChild(incomeList.firstChild);
    }
    incomes.forEach((income, index) => {
        // Validate income object has required properties
        if (!income || typeof income.amount !== 'number' || !income.description) {
            console.warn('Invalid income object at index', index, income);
            return; // Skip this invalid income
        }
        
        const incomeDiv = document.createElement('div');
        incomeDiv.className = 'income-item';
        incomeDiv.textContent = `${income.description}: $${income.amount.toFixed(2)}`;
        // Edit button for income
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.marginLeft = '10px';
        editBtn.onclick = function() {
            const newDescription = prompt('Edit income description:', income.description);
            if (newDescription === null) return; // User cancelled
            
            const newAmountStr = prompt('Edit income amount:', income.amount);
            if (newAmountStr === null) return; // User cancelled
            
            const newAmount = parseFloat(newAmountStr);
            if (newDescription.trim() && !isNaN(newAmount) && newAmount > 0) {
                income.description = newDescription.trim();
                income.amount = newAmount;
                saveIncomesToStorage(incomes);
                refreshIncomeList();
                updateIncomeTotal();
                updateTotalsPanel();
            } else {
                alert('Please enter a valid description and amount (must be greater than 0).');
            }
        };
        incomeDiv.appendChild(editBtn);
        // Remove button for income
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function() {
            incomes.splice(index, 1);
            saveIncomesToStorage(incomes);
            refreshIncomeList();
            updateIncomeTotal();
            updateTotalsPanel();
        };
        incomeDiv.appendChild(removeBtn);
        incomeList.appendChild(incomeDiv);
    });
}

function updateIncomeTotal() {
    const incomeTotal = document.getElementById('income-total');
    if (!incomeTotal) return;
    const total = incomes.reduce((sum, income) => sum + income.amount, 0);
    incomeTotal.textContent = `Total Income: $${total.toFixed(2)}`;
}

// Helper function to validate and clean data
function cleanAndValidateData(items, type) {
    return items.filter((item, index) => {
        if (!item || typeof item !== 'object') {
            console.warn(`Invalid ${type} at index ${index}: not an object`, item);
            return false;
        }
        if (typeof item.amount !== 'number' || isNaN(item.amount)) {
            console.warn(`Invalid ${type} at index ${index}: amount is not a number`, item);
            return false;
        }
        if (!item.description || typeof item.description !== 'string') {
            console.warn(`Invalid ${type} at index ${index}: missing or invalid description`, item);
            return false;
        }
        return true;
    });
}

// Initial load for expenses and incomes from localStorage
const loadedExpenses = loadExpensesFromStorage();
const loadedIncomes = loadIncomesFromStorage();

// Clean and validate loaded data
const validExpenses = cleanAndValidateData(loadedExpenses, 'expense');
const validIncomes = cleanAndValidateData(loadedIncomes, 'income');

// If data was cleaned, save the corrected version
if (validExpenses.length !== loadedExpenses.length) {
    console.log('Cleaned invalid expense data');
    saveExpensesToStorage(validExpenses);
}
if (validIncomes.length !== loadedIncomes.length) {
    console.log('Cleaned invalid income data');
    saveIncomesToStorage(validIncomes);
}

expenses.push(...validExpenses);
incomes.push(...validIncomes);

if (expenses.length > 0) {
    refreshExpenseList();
    updateTotalsPanel();
}
if (incomes.length > 0) {
    refreshIncomeList();
    updateIncomeTotal();
}

expenseForm.addEventListener('submit', handleExpenseSubmission);

