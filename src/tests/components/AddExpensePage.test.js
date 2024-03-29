import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;
beforeEach(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={addExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    const expense = expenses[1];
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(addExpense).toHaveBeenLastCalledWith(expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
});
