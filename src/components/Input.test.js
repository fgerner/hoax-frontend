import Input from './Input';
import {fireEvent} from "@testing-library/react";

const {render} = require("@testing-library/react");

describe('Layout', function () {
    it('should have input items', function () {
        const {container} = render(<Input/>);
        const input = container.querySelector('input');
        expect(input).toBeInTheDocument();
    });
    it('should display the label provided in props', function () {
        const {queryByText} = render(<Input label={'test-label'}/>);
        const label = queryByText('test-label');
        expect(label).toBeInTheDocument()
    });
    it('should not display the label is not provided in props', function () {
        const {container} = render(<Input/>);
        const label = container.querySelector('label');
        expect(label).not.toBeInTheDocument()
    });
    it('should have text type for input when type is not provided in props', function () {
        const {container} = render(<Input/>);
        const input = container.querySelector('input');
        expect(input.type).toBe('text')
    });
    it('should have password type for input password when type is provided in props', function () {
        const {container} = render(<Input type={'password'}/>);
        const input = container.querySelector('input');
        expect(input.type).toBe('password')
    });
    it('should have placeholder when it is provided in props', function () {
        const {container} = render(<Input placeholder={'Test placeholder'}/>);
        const input = container.querySelector('input');
        expect(input.placeholder).toBe('Test placeholder')
    });
    it('should have value for input when it is provided in props', function () {
        const {container} = render(<Input value={'Test value'}/>);
        const input = container.querySelector('input');
        expect(input.value).toBe('Test value')
    });
    it('should have onChange callback when it is provided in props', function () {
        const onChange = jest.fn();
        const {container} = render(<Input onChange={onChange}/>);
        const input = container.querySelector('input');
        fireEvent.change(input, {target: {value: 'new-input'}})
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('should display default style if there are no validation errors or success', function () {
        const {container} = render(<Input/>);
        const input = container.querySelector('input');
        expect(input.className).toBe('form-control')
    });
    it('should display success style wher hasError property is false', function () {
        const {container} = render(<Input hasError={false}/>);
        const input = container.querySelector('input');
        expect(input.className).toBe('form-control is-valid')
    });
    it('should display error style wher hasError property is true', function () {
        const {container} = render(<Input hasError={true}/>);
        const input = container.querySelector('input');
        expect(input.className).toBe('form-control is-invalid')
    });
    it('should display error text when it is provided', function () {
        const {queryByText} = render(<Input hasError={true} error={'Cannot be null'}/>);
        expect(queryByText('Cannot be null')).toBeInTheDocument();
    });
    it('should not display error text when hasError is not provided', function () {
        const {queryByText} = render(<Input error={'Cannot be null'}/>);
        expect(queryByText('Cannot be null')).not.toBeInTheDocument();
    });
}); 


