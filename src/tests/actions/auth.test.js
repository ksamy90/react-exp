import { login, logout } from '../../actions/auth';


test('should set auth object', () => {
    const uid = 457800;
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('should set logout', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});
