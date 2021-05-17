import Login from './Login';
import {render} from "@testing-library/react";

describe('Login', () => {
    describe('Layout', () => {
        it('should have a header of Login', function () {
            const {container} = render(<Login/>);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Login');
        });
        it('should have a username input field', function () {
            const {queryByPlaceholderText} = render(<Login/>);
            const usernameInput = queryByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();
        });
        it('should have a password input field', function () {
            const {queryByPlaceholderText} = render(<Login/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('should have a password input field type password', function () {
            const {queryByPlaceholderText} = render(<Login/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('should have a button for login', function () {
            const {container} = render(<Login/>);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });
    })
})