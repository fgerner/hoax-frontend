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
    }
    return state;
}