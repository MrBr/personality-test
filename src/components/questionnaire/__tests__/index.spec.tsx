import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { questions } from "./fixtures";
import {
  proceedWithNthOption,
  renderQuestionnaire,
  selectNthOption,
} from "./utils";

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
  it("should disable submit until all answer selected", () => {
    const { submitButtonElem, nextButtonElem, questionnaireElem } =
      renderQuestionnaire(container, {
        questions: questions,
        onComplete: () => {},
        onCancel: () => {},
      });

    expect(submitButtonElem).toBeDisabled();

    proceedWithNthOption(questionnaireElem, nextButtonElem, 3);
    proceedWithNthOption(questionnaireElem, nextButtonElem, 3);
    proceedWithNthOption(questionnaireElem, nextButtonElem, 3);

    expect(submitButtonElem).toBeEnabled();
  });

  it("should select answer and go to next", () => {
    const { progressElem, nextButtonElem, questionnaireElem } =
      renderQuestionnaire(container, {
        questions: questions,
        onComplete: () => {},
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
    const { prevButtonElem, nextButtonElem, questionnaireElem } =
      renderQuestionnaire(container, {
        questions: questions,
        onComplete: () => {},
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

  it("should call onComplete", () => {
    const onComplete = jest.fn();

    const { submitButtonElem, nextButtonElem, questionnaireElem } =
      renderQuestionnaire(container, {
        questions: questions,
        onComplete,
        onCancel: () => {},
      });

    proceedWithNthOption(questionnaireElem, nextButtonElem, 3);
    proceedWithNthOption(questionnaireElem, nextButtonElem, 3);
    proceedWithNthOption(questionnaireElem, nextButtonElem, 3);

    act(() => {
      submitButtonElem?.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel", () => {
    const onCancel = jest.fn();

    const { cancelButtonElem } = renderQuestionnaire(container, {
      questions: questions,
      onComplete: () => {},
      onCancel,
    });

    act(() => {
      cancelButtonElem?.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
