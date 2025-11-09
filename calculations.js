//Calculations for expenses

function calculateTotal(expenses) 
{
    let total = 0;
    for (let index = 0; index < expenses.length; index++)
    {
        total += expenses[index].amount;
    }
    return total;
}

function calculateAverage(expenses)
{
    if (expenses.length === 0){
        return 0;
    }
    return calculateTotal(expenses) / expenses.length; 
}

function calculateIncomeTotal(incomes) 
{
    return incomes.reduce((sum, income) => sum + income.amount, 0);
}

function calculateDifference(expenses, incomes) 
{
    const expenseTotal = calculateTotal(expenses);
    const incomeTotal = calculateIncomeTotal(incomes);
    return incomeTotal - expenseTotal;
}


