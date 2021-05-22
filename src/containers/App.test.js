import {render} from "@testing-library/react";
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

});