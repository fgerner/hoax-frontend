import {render} from "@testing-library/react";
import UserPage from "./User";


describe('User component', () => {
    describe('Layout', () => {
        it('should render root page div', function () {
            const {queryByTestId} = render(<UserPage />);
            const homePageDiv = queryByTestId('userpage');
            expect(homePageDiv).toBeInTheDocument();
        });
    })
})
