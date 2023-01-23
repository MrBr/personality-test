import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { questions } from "./fixtures";
import { renderQuestionnaire, selectNthOption } from "./utils";

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
  it("should disable navigation until answer selected", () => {
    const { prevButtonElem, progressElem, nextButtonElem } =
      renderQuestionnaire(container, {
        questions: questions,
        onComplete: () => {},
        onCancel: () => {},
      });

    expect(prevButtonElem).toBeDisabled();

    act(() => {
      nextButtonElem?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(progressElem?.innerHTML).toBe("1/3");
  });

  it("should select answer and go to next", () => {
    const onComplete = jest.fn();

    const { progressElem, nextButtonElem, questionnaireElem } =
      renderQuestionnaire(container, {
        questions: questions,
        onComplete: onComplete,
        onCancel: () => {},
      });

    const optionElem = questionnaireElem?.querySelector(
      "[data-testid=question] .form-check:nth-child(3) label"
    );

    act(() => {
      optionElem?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      nextButtonElem?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(progressElem?.innerHTML).toBe("2/3");
  });

  it("should have answer selected after going back to it", () => {
    const onComplete = jest.fn();

    const { prevButtonElem, progressElem, nextButtonElem, questionnaireElem } =
      renderQuestionnaire(container, {
        questions: questions,
        onComplete: onComplete,
        onCancel: () => {},
      });

    let optionElem = selectNthOption(questionnaireElem, 3);
    expect(optionElem).not.toBeChecked();

    act(() => {
      optionElem?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      nextButtonElem?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    optionElem = selectNthOption(questionnaireElem, 3);
    expect(optionElem).not.toBeChecked();
    expect(nextButtonElem).toBeDisabled();

    act(() => {
      prevButtonElem?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    optionElem = selectNthOption(questionnaireElem, 3);

    expect(optionElem).toBeChecked();
  });
});
