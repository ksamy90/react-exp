import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';
import selectExpensesTotal from '../../selectors/expenses-total';

test('should render ExpensesSummary correctly', () => {
    const expense = [];
    const wrapper = shallow(<ExpensesSummary 
        expenseCount={expense.length}
        amount={selectExpensesTotal(expense)}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with 1 expense', () => {
    const expense = [expenses[1]];
    const wrapper = shallow(<ExpensesSummary
        expenseCount={expense.length}
        amount={selectExpensesTotal(expense)}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with expenses', () => {
    const wrapper = shallow(<ExpensesSummary 
        expenseCount={expenses.length} 
        amount={selectExpensesTotal(expenses)}
    />);
    expect(wrapper).toMatchSnapshot();
});
