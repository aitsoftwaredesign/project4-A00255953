const initState = {
    venues: [],
    user: null,
    accountType: "",
    token: localStorage.getItem('BAtoken') !== null ? localStorage.getItem('BAtoken') : ''
}

const reducer = (state = initState, action) => {
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
        case 'SET_TYPE':
            return {
                ...state,
                accountType: action.account
            }
            break;
        case 'LOGOUT':
            localStorage.removeItem('BAtoken');
            return {
                ...state,
                user: null,
                token: '',
                accountType: ''
            }
            break;
        case 'SET_PARTNER_VENUES':
            return {
                ...state,
                partnerVenues: action.partnerVenues
            }
    }
    return state
}
export default reducer;