import moment from 'moment';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters';

test('should generate set start date action object', () => {
    const action = setStartDate(moment(45));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(45)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(124));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(124)
    });
});

test('should generate set text filter with text value', () => {
    const text = 'bill';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test('should generate set text filter with default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should sort expenses by date', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('should sort expenses by amount', () => {
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});
