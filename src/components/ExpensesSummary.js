import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCount, amount }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const expensesTotal = numeral(amount / 100).format('$0,0.00');
    if (expenseCount === 0) {
        return <p></p>;
    };

    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {expensesTotal}</h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        amount: selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);
