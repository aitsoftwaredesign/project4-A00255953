const initState = {
    venues: [],
    user: {},
    token: localStorage.getItem('token') !== null ? localStorage.getItem('token') : ''
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_VENUES':
            return {
                ...state,
                venues: action.venues
            }
            break;
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
            break;
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
            break;
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: ''
            }
            break;
    }
    return state
}
export default rootReducer;