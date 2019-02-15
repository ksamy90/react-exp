import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, startRemoveExpense, editExpense, history, wrapper;
beforeEach(() => {
    expense = expenses[2];
    editExpense = jest.fn();
    history = { push: jest.fn() };
    startRemoveExpense = jest.fn();
    wrapper = shallow(<EditExpensePage 
        expense={expense} 
        editExpense={editExpense} 
        history={history} 
        startRemoveExpense={startRemoveExpense} 
    />);
});

test('should render EditExpensepage ', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('editExpense')(expense);
    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id });
    expect(history.push).toHaveBeenLastCalledWith('/');
});
