import React from "react";
import {UserSignup} from './UserSignup';
import {
    findByText,
    fireEvent, queryByText,
    waitForElementToBeRemoved
} from "@testing-library/react";

const {render} = require("@testing-library/react");

describe('UserSignupComponent', () => {
    describe('Layout', () => {
        it('should have header called "Sign Up"', function () {
            const {container} = render(<UserSignup/>);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });
        it('should have input field for display name', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('should have input field for username', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const userNameInput = queryByPlaceholderText('Your username');
            expect(userNameInput).toBeInTheDocument();
        });
        it('should have input field for password', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('should have password input type for password', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('should have input field for password repeat', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeatInput).toBeInTheDocument();
        });
        it('should have password input type for password repeat', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const passwordInput = queryByPlaceholderText('Repeat your password');
            expect(passwordInput.type).toBe('password');
        });
        it('should have a submit button', function () {
            const {container} = render(<UserSignup/>);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });
    });
    describe('interactions', () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            };
        };

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({});
                    }, 300);
                })
            })
        }

        let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput

        const setupForSubmit = (props) => {

            const rendered = render(
                <UserSignup {...props}/>
            )

            const {container, queryByPlaceholderText} = rendered;

            displayNameInput = queryByPlaceholderText('Your display name');
            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-username'));
            fireEvent.change(passwordInput, changeEvent('my-password'));
            fireEvent.change(passwordRepeatInput, changeEvent('my-password'));

            button = container.querySelector('button');

            return rendered;
        }

        it('should set the display name into state', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const displayNameInput = queryByPlaceholderText('Your display name');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
        });
        it('should set the username into state', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const userNameInput = queryByPlaceholderText('Your username');

            fireEvent.change(userNameInput, changeEvent('my-user-name'));
            expect(userNameInput).toHaveValue('my-user-name');
        });
        it('should set the password into state', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const passwordInput = queryByPlaceholderText('Your password');

            fireEvent.change(passwordInput, changeEvent('my-password'));
            expect(passwordInput).toHaveValue('my-password');
        });
        it('should set the repeat password into state', function () {
            const {queryByPlaceholderText} = render(<UserSignup/>);
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(passwordRepeatInput, changeEvent('my-password'));
            expect(passwordRepeatInput).toHaveValue('my-password');
        });
        it('should request postSignup when fields are valid and actions provided in props', function () {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }

            setupForSubmit({actions});

            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });
        it('should not throw exception when clicking button when actions not provided in props', function () {

            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();

        });
        it('should send post request with user body when all fields are valid', function () {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }

            setupForSubmit({actions});

            fireEvent.click(button);
            const expectedUserObject = {
                username: 'my-username',
                displayName: 'my-display-name',
                password: 'my-password'
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });
        it('should not allow user to click the signup button during ongoing api call', function () {
            const actions = {
                postSignup: mockAsyncDelayed()
            }

            setupForSubmit({actions});

            fireEvent.click(button);
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);

        });
        it('should display spinner during ongoing api call', function () {
            const actions = {
                postSignup: mockAsyncDelayed()
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);
            const spinner = queryByText('Loading...');
            expect(spinner).toBeInTheDocument();

        });
        it('should hide spinner after successful api call', async function () {
            const actions = {
                postSignup: mockAsyncDelayed()
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);

            await waitForElementToBeRemoved(() => queryByText('Loading...'));
            const spinner = queryByText('Loading...');

            expect(spinner).not.toBeInTheDocument();

        });
        it('should hide spinner after api call with error', async function () {
            const actions = {
                postSignup: jest.fn().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response: {data: {}}
                            });
                        }, 300);
                    })
                })
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);

            await waitForElementToBeRemoved(() => queryByText('Loading...'));
            const spinner = queryByText('Loading...');

            expect(spinner).not.toBeInTheDocument();

        });
        it('should display validation error for DisplayName when error is received ', async function () {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors:{
                                displayName: 'Cannot be null'
                            }
                        }
                    }
                })
            }
            const {findByText} = setupForSubmit({actions});
            fireEvent.click(button);
            const errormessage = await findByText('Cannot be null');
            expect(errormessage).toBeInTheDocument();
        });

        it('should enable the signup button when password are matching password repeat', function () {
            setupForSubmit();
            expect(button).not.toBeDisabled();
        });
        it('should disable the signup button when password repeat not are matching password', function () {
            setupForSubmit();
            fireEvent.change(passwordRepeatInput, changeEvent('new-password'))
            expect(button).toBeDisabled();
        });
        it('should disable the signup button when password not are matching password repeat', function () {
            setupForSubmit();
            fireEvent.change(passwordInput, changeEvent('new-password'))
            expect(button).toBeDisabled();
        });
        it('should display error style for password repeat when password mismatch', function () {
            const {queryByText} = setupForSubmit();
            fireEvent.change(passwordInput, changeEvent('new-pass'));
            const mismatchWarning = queryByText('Does not match to password');
            expect(mismatchWarning).toBeInTheDocument();
        });
        it('should hide validation errors when user changes the content of displayName', async function () {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors:{
                                displayName: 'Cannot be null'
                            }
                        }
                    }
                })
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);
            await queryByText('Cannot be null');
            fireEvent.change(displayNameInput, changeEvent('name update'))
            const errormessage = queryByText('Cannot be null');
            expect(errormessage).not.toBeInTheDocument();
        });
        it('should hide validation errors when user changes the content of userame', async function () {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors:{
                                userame: 'Username cannot be null'
                            }
                        }
                    }
                })
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);
            await queryByText('Username cannot be null');
            fireEvent.change(usernameInput, changeEvent('name update'))
            const errormessage = queryByText('Username cannot be null');
            expect(errormessage).not.toBeInTheDocument();
        });
        it('should hide validation errors when user changes the content of password', async function () {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors:{
                                password: 'Password cannot be null'
                            }
                        }
                    }
                })
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);
            await queryByText('Password cannot be null');
            fireEvent.change(passwordInput, changeEvent('password update'))
            const errormessage = await queryByText('Password cannot be null');
            expect(errormessage).not.toBeInTheDocument();
        });

    })
})

console.error = () => {
}