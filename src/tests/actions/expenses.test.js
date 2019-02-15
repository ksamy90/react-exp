import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, startSetExpenses, addExpense, editExpense, removeExpense, setExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = {
            description,
            note,
            amount,
            createdAt
        }
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '78ui' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '78ui'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const expense = expenses[1];

    store.dispatch(startRemoveExpense({ id: expense.id }))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id: expense.id
            });
            return database.ref(`expenses/${actions[0].id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
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

test('should edit expense from firebase', (done) => {
    const store = createMockStore({});
    const updates = {
        description: 'Movie-prod',
        amount: 67000
    };
    const expense = {
        description: 'Movie-prod',
        amount: 67000,
        note: expenses[2].note,
        createdAt: expenses[2].createdAt
    };
    store.dispatch(startEditExpense(expenses[2].id, updates))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id: expenses[2].id,
                updates
            });
            return database.ref(`expenses/${expenses[2].id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expense);
            done();
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
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'Right, better',
        createdAt: 6784500
    };

    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });
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

    store.dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expense
                }
            });
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expense);
            done();
        });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});

	store.dispatch(startSetExpenses())
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'SET_EXPENSES',
				expenses
			});
			done();
		});
});
