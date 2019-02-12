import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const amount = selectExpensesTotal([]);
    expect(amount).toBe(0);
});

test('should correctly add up a single expense', () => {
    const amount = selectExpensesTotal([expenses[0]]);
    expect(amount).toBe(195);
});

test('should correctly add up multiple expenses', () => {
    const amount = selectExpensesTotal(expenses);
    expect(amount).toBe(114195);
});
