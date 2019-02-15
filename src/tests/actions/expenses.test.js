import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'Right, better',
    createdAt: 6784500
};

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
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});

    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0].toEqual(addExpense({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(),
                    ...expenseData
                }
            })));
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expense = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddExpense())
        .then(() => {
            const actions = store.getActions();
            expect(actions[0].toEqual(addExpense({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(),
                    ...expense
                }
            })));
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expense);
            done();
        });
});
