import {fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom';
import App from "./App";

const setup = (path) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <App/>
        </MemoryRouter>
    )
}

describe('App container', function () {
    it('should render home page at "/"', function () {
        const {queryByTestId} = setup('/');
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });
    it('should render login page at "/login"', function () {
        const {container} = setup('/login');
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Login');
    });
    it('should render only login page at "/login"', function () {
        const {queryByTestId} = setup('/login');
        expect(queryByTestId('homepage')).not.toBeInTheDocument();
    });
    it('should render signup page at "/signup"', function () {
        const {container} = setup('/signup');
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up');
    });
    it('should render userpage page at url other than "/", "/signup", "/login"', function () {
        const {queryByTestId} = setup('/user1');
        expect(queryByTestId('userpage')).toBeInTheDocument();
    });
    it('should display topbar when url is "/"', function () {
        const {container} = setup('/');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument()
    });
    it('should display topbar when url is "/login"', function () {
        const {container} = setup('/login');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument()
    });
    it('should display topbar when url is "/signup"', function () {
        const {container} = setup('/signup');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument()
    });
    it('should display topbar when url is "/user1"', function () {
        const {container} = setup('/user1');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument()
    });
    it('should display usersignup component when clicking on signup', function () {
        const {queryByText, container} = setup('/');
        const siginupLink = queryByText('Sign Up');
        fireEvent.click(siginupLink);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up');
    });
it('should display login component when clicking on login', function () {
        const {queryByText, container} = setup('/');
        const loginLink = queryByText('Login');
        fireEvent.click(loginLink);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Login');
    });
it('should display home component when clicking on logo', function () {
        const {queryByTestId, container} = setup('/login');
        const logo = container.querySelector('img');
        fireEvent.click(logo);
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });

});