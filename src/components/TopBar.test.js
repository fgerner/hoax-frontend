import {render} from "@testing-library/react";
import TopBar from "./TopBar";
import {MemoryRouter} from "react-router-dom";
import {createStore} from "redux";
import authReducer from "../redux/authReducer";
import {Provider} from "react-redux";

const loggedInState = {
    id: 1,
    username: 'user1',
    displayName: 'display1',
    image: 'profile1.png',
    password: 'P4ssword',
    isLoggedIn: true
}

const defaultState = {
    id: 0,
    username: '',
    displayName: '',
    image: '',
    password: '',
    isLoggedIn: false
}

const setup = (state = defaultState) => {
    const store = createStore(authReducer, state);
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <TopBar/>
            </MemoryRouter>
        </Provider>
    )
}

describe('TopBar component', () => {
    describe('Layout', function () {
        it('should render logo', function () {
            const {container} = setup();
            const image = container.querySelector('img');
            expect(image.src).toContain('hoaxify-logo.png');
        });
        it('should link from logo to home', function () {
            const {container} = setup();
            const image = container.querySelector('img');
            expect(image.parentElement.getAttribute('href')).toBe('/');
        });
        it('should link to signup', function () {
            const {queryByText} = setup();
            const signupLink = queryByText('Sign Up');
            expect(signupLink.getAttribute('href')).toBe('/signup');
        });
        it('should link to login', function () {
            const {queryByText} = setup();
            const loginLink = queryByText('Login');
            expect(loginLink.getAttribute('href')).toBe('/login');
        });
        it('should link to logout when user is loggedin', function () {
            const {queryByText} = setup(loggedInState);
            const logoutLink = queryByText('Logout');
            expect(logoutLink).toBeInTheDocument()
        });
        it('should link to user profile when user is loggedin', function () {
            const {queryByText} = setup(loggedInState);
            const profileLink = queryByText('My Profile');
            expect(profileLink.getAttribute('href')).toBe('/user1');
        });
    });
})