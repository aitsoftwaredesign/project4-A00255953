const initState = {
    venues: [],
    user: localStorage.getItem('BAuser') !== null ? JSON.parse(localStorage.getItem('BAuser')) : null,
    accountType: localStorage.getItem('BAaccountType') !== null ? localStorage.getItem('BAaccountType') : '',
    token: localStorage.getItem('BAtoken') !== null ? localStorage.getItem('BAtoken') : ''
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_VENUES':
            return {
                ...state,
                venues: action.venues
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TYPE':
            return {
                ...state,
                accountType: action.account
            }
        case 'LOGOUT':
            localStorage.removeItem('BAtoken');
            return {
                ...state,
                user: null,
                token: '',
                accountType: ''
            }
        case 'SET_PARTNER_VENUES':
            return {
                ...state,
                partnerVenues: action.partnerVenues
            }
        case 'SET_SERVICES':
            return {
                ...state,
                services: action.services
            }
        case 'SET_SELECTED_SERVICE':
            return {
                ...state,
                selectedService: action.service
            }
        case 'SELECT_VENUE':
            return {
                ...state,
                selectedVenue: action.venue
            }
        case 'SET_VENUE_BOOKINGS':
            return {
                ...state,
                venueBookings: action.bookings
            }
        case 'SET_OPEN_LOGIN':
            return {
                ...state,
                login: action.login
            }
        case 'SET_CUSTOMER_BOOKINGS':
            return {
                ...state,
                customerBookings: action.bookings
            }
        default:
            return {
                ...state
            }
    }
}
export default reducer;