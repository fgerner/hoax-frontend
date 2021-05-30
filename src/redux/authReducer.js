const initialState = {
    id: 0,
    username: '',
    displayName: '',
    image: '',
    password: '',
    isLogedIn: false
}

export default function authReducer(state = initialState, action) {
    if (action.type === 'logout-success'){
        return {...initialState};
    }else if (action.type === 'login-success'){
        return {
            ...action.payload,
            isLogedIn: true
        }
    }
    return state;
}