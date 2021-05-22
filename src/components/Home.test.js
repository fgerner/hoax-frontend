import {render} from "@testing-library/react";
import HomePage from "./Home";

describe('Home component', () => {
    describe('Layout', () => {
        it('should render root page div', function () {
            const {queryByTestId} = render(<HomePage />);
            const homePageDiv = queryByTestId('homepage');
            expect(homePageDiv).toBeInTheDocument();
        });
    })
})
