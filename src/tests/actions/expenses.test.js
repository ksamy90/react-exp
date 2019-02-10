import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '78ui' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '78ui'
    });
});

test('should setup edit expense action object', () => {
    const updates = {
        description: 'Munich travel',
        amount: 500
    };
    const action = editExpense('87uhj', updates);
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '87uhj',
        updates
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        note: 'notes',
        amount: 109500,
        createdAt: 67800
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});
