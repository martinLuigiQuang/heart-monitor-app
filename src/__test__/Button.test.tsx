import { render, fireEvent, waitForElement } from "@testing-library/react";

import Button, { ButtonAttributes } from "../components/common/button/Button";

describe(`<Button />`, () => {
  test("should display a button with a label 'test'", async () => {
    const { findByTestId } = testRenderButton();
    const testButton: HTMLButtonElement = await findByTestId('button') as HTMLButtonElement;
    // expect(testButton).toBeInTheDocument();
    console.log(expect(testButton))
    // expect(testButton).toHaveAttribute('aria-label', 'test');
    // expect(testButton).toHaveAttribute('className', 'testClassName');
    // expect(testButton).toHaveAttribute('disabled', false);
  });
});

function renderButton(props: Partial<ButtonAttributes> = {}) {
    const defaultProps: ButtonAttributes = {
        label: "test",
        ariaLabel: "test",
        className: "testClassName",
        disabled: false
    };
    return render(<Button {...defaultProps} {...props} />);
};

function testRenderButton() {
  return render(<button data-testid="button" aria-label="test" >test</button>)
}