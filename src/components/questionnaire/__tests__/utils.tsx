import { act } from "react-dom/test-utils";
import { render } from "react-dom";

import Questionnaire, { QuestionnaireProps } from "../index";

export const renderQuestionnaire = (
  container: HTMLElement | null,
  props: QuestionnaireProps
) => {
  act(() => {
    render(<Questionnaire {...props} />, container);
  });

  const questionnaireElem = document.querySelector(
    "[data-testid=questionnaire]"
  );
  const prevButtonElem = questionnaireElem?.querySelector("[data-testid=prev]");
  const nextButtonElem = questionnaireElem?.querySelector("[data-testid=next]");
  const submitButtonElem = questionnaireElem?.querySelector(
    "[data-testid=submit]"
  );
  const cancelButtonElem = questionnaireElem?.querySelector(
    "[data-testid=cancel]"
  );
  const progressElem = questionnaireElem?.querySelector(
    "[data-testid=progress]"
  );
  return {
    questionnaireElem,
    prevButtonElem,
    nextButtonElem,
    progressElem,
    submitButtonElem,
    cancelButtonElem,
  };
};

export const selectNthOption = (
  questionnaireElem: Element | null,
  n: number
) => {
  return questionnaireElem?.querySelector(
    `[data-testid=question] .form-check:nth-child(${n}) input`
  );
};

export const proceedWithNthOption = (
  questionnaireElem: Element | null,
  nextButtonElem: Element | null | undefined,
  n: number
) => {
  let optionElem = selectNthOption(questionnaireElem, n);

  act(() => {
    optionElem?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    nextButtonElem?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
};
