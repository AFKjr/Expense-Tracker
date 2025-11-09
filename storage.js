// Persistent storage for expenses and income using localStorage

const STORAGE_KEY = 'expenseTrackerData';

function saveExpensesToStorage(expenses)
{
    try
    {
        const expensesJson = JSON.stringify(expenses);
        localStorage.setItem(STORAGE_KEY, expensesJson);

    } catch (error)
    {
        console.error("Failed to save expenses to storage:", error);
        throw new Error("Could not save expenses to storage.");
    }
}

function loadExpensesFromStorage()
{
    try
    {
        const expensesJson = localStorage.getItem(STORAGE_KEY);

        if (!expensesJson) 
        {
            return [];
        }

        return JSON.parse(expensesJson);
    } catch (error)
    {
        console.error("Failed to load expenses from storage:", error);
        throw new Error("Could not load expenses from storage.");
    }
}

function clearExpensesFromStorage()
{
    try
    {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error)
    {
        console.error("Failed to clear expenses from storage:", error);
        throw new Error("Could not clear expenses from storage.");
    }
}

function saveIncomesToStorage(incomes)
{
    try
    {
        const incomesJson = JSON.stringify(incomes);
        localStorage.setItem('incomeData', incomesJson);
    } catch (error)
    {
        console.error("Failed to save incomes to storage:", error);
        throw new Error("Could not save incomes to storage.");
    }
}

function loadIncomesFromStorage()
{
    try
    {
        const incomesJson = localStorage.getItem('incomeData');

        if (!incomesJson)
        {
            return [];
        }

        return JSON.parse(incomesJson);
    } catch (error)
    {
        console.error("Failed to load incomes from storage:", error);
        throw new Error("Could not load incomes from storage.");
    }
}

function clearIncomesFromStorage()
{
    try
    {
        localStorage.removeItem('incomeData');
    } catch (error)
    {
        console.error("Failed to clear incomes from storage:", error);
        throw new Error("Could not clear incomes from storage.");
    }
}
