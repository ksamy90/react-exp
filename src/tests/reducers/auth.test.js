import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
    const uid = 'rtyh564rf';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer(undefined, action);
    expect(state).toEqual({ uid });
});

test('should clear uid for logout', () => {
    const currenState = { uid: '456yh7' };
    const state = authReducer(currenState, { type: 'LOGOUT' });
    expect(state).toEqual({});
});
