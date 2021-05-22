import Login from './Login';
import {findByText, fireEvent, render, waitForElementToBeRemoved} from "@testing-library/react";

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
    describe('interactions', () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            }
        }

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({});
                    }, 300);
                })
            })
        }

        let usernameInput, passwordInput, button;

        const setupForSubmit = (props) => {
            const renderd = render(<Login {...props}/>);
            const {container, queryByPlaceholderText} = renderd;
            usernameInput = queryByPlaceholderText('Your username');
            fireEvent.change(usernameInput, changeEvent('my-username'));
            passwordInput = queryByPlaceholderText('Your password');
            fireEvent.change(passwordInput, changeEvent('my-P4ssword'));
            button = container.querySelector('button');

            return renderd;
        }

        it('should set the username value into steate', function () {
            const {queryByPlaceholderText} = render(<Login/>);
            const usernameInput = queryByPlaceholderText('Your username');
            fireEvent.change(usernameInput, changeEvent('my-username'));
            expect(usernameInput).toHaveValue('my-username');
        });
        it('should set the password value into steate', function () {
            const {queryByPlaceholderText} = render(<Login/>);
            const passwordInput = queryByPlaceholderText('Your password');
            fireEvent.change(passwordInput, changeEvent('my-P4ssword'));
            expect(passwordInput).toHaveValue('my-P4ssword');
        });
        it('should call postLogin when actions are provided and input fields has values', function () {
            const actions = {
                postLogin: jest.fn().mockResolvedValue({})
            }
            setupForSubmit({actions});
            fireEvent.click(button);
            expect(actions.postLogin).toHaveBeenCalledTimes(1);

        });
        it('should not throw exception when actions are not provided and input fields has values', function () {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();

        });
        it('should call postLogin with credentials in body', function () {
            const actions = {
                postLogin: jest.fn().mockResolvedValue({})
            }
            setupForSubmit({actions});
            fireEvent.click(button);
            const expectedUserObject = {
                username: 'my-username',
                password: 'my-P4ssword'
            }
            expect(actions.postLogin).toHaveBeenCalledWith(expectedUserObject);
        });
        it('should enable the login button when username and password fields are not empty', function () {
            setupForSubmit();
            expect(button).not.toBeDisabled()
        });
        it('should disable the login button when username field are empty', function () {
            setupForSubmit();
            fireEvent.change(usernameInput, changeEvent(''));
            expect(button).toBeDisabled()
        });
        it('should disable the login button when password field are empty', function () {
            setupForSubmit();
            fireEvent.change(passwordInput, changeEvent(''));
            expect(button).toBeDisabled()
        });
        it('should display warning when login fails', async function () {
            const actions = {
                postLogin: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            message: 'Login failed'
                        }
                    }
                })
            }
            const {container} = setupForSubmit({actions});
            fireEvent.click(button);
            const alert = await findByText(container, 'Login failed');
            expect(alert).toBeInTheDocument();

        });
        it('should clears warning when user updates username', async function () {
            const actions = {
                postLogin: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            message: 'Login failed'
                        }
                    }
                })
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);
            await queryByText('Login failed');
            fireEvent.change(usernameInput, changeEvent('updated-username'))
            const alert = await queryByText('Login failed')
            expect(alert).not.toBeInTheDocument();

        });
        it('should clears warning when user updates password', async function () {
            const actions = {
                postLogin: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            message: 'Login failed'
                        }
                    }
                })
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);
            await queryByText('Login failed');
            fireEvent.change(passwordInput, changeEvent('updated-P4ssword'))
            const alert = await queryByText('Login failed')
            expect(alert).not.toBeInTheDocument();
        });
        it('should not allow user to click the login button during ongoing api call', function () {
            const actions = {
                postLogin: mockAsyncDelayed()
            }

            setupForSubmit({actions});

            fireEvent.click(button);
            fireEvent.click(button);
            expect(actions.postLogin).toHaveBeenCalledTimes(1);

        });
        it('should display spinner during ongoing api call', function () {
            const actions = {
                postLogin: mockAsyncDelayed()
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);
            const spinner = queryByText('Loading...');
            expect(spinner).toBeInTheDocument();

        });
        it('should hide spinner after successful api call', async function () {
            const actions = {
                postLogin: mockAsyncDelayed()
            }
            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);
            await waitForElementToBeRemoved(() => queryByText('Loading...'));
            const spinner = queryByText('Loading...');

            expect(spinner).not.toBeInTheDocument();
        });
        it('should hide spinner after api call with error', async function () {
            const actions = {
                postLogin: jest.fn().mockImplementation(() => {
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

    })
})
console.error = () => {}