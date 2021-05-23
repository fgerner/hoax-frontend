import {render} from "@testing-library/react";
import TopBar from "./TopBar";
import {MemoryRouter} from "react-router-dom";

const setup = () => {
    return render(
        <MemoryRouter>
            <TopBar/>
        </MemoryRouter>
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
    });
})