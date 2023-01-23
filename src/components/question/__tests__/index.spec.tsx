import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import QuestionComponent from "../index";
import { question } from "./fixtures";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container as HTMLDivElement);
  (container as HTMLDivElement).remove();
  container = null;
});

describe("Question", function () {
  it("should have default value selected", () => {
    const onChange = jest.fn();

    act(() => {
      render(
        <QuestionComponent
          question={question}
          onSelect={onChange}
          initialAnswer={question.answers[2]}
        />,
        container
      );
    });

    const questionThirdOptionElem = document.querySelector(
      "[data-testid=question] .form-check:nth-child(3) input"
    );

    expect(questionThirdOptionElem).toBeChecked();
  });

  it("should call onChange when option clicked", () => {
    const onChange = jest.fn();

    act(() => {
      render(
        <QuestionComponent question={question} onSelect={onChange} />,
        container
      );
    });

    const questionThirdOptionLabelElem = document.querySelector(
      "[data-testid=question] .form-check:nth-child(3) label"
    );

    expect(questionThirdOptionLabelElem?.innerHTML).toBe(
      question.answers[2].text
    );

    act(() => {
      questionThirdOptionLabelElem?.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
