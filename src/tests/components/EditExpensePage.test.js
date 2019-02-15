import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, startRemoveExpense, startEditExpense, history, wrapper;
beforeEach(() => {
    expense = expenses[2];
    startEditExpense = jest.fn();
    history = { push: jest.fn() };
    startRemoveExpense = jest.fn();
    wrapper = shallow(<EditExpensePage 
        expense={expense} 
        startEditExpense={startEditExpense} 
        history={history} 
        startRemoveExpense={startRemoveExpense} 
    />);
});

test('should render EditExpensepage ', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id });
    expect(history.push).toHaveBeenLastCalledWith('/');
});
