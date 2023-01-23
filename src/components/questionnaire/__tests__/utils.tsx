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
  const progressElem = questionnaireElem?.querySelector(
    "[data-testid=progress]"
  );
  return {
    questionnaireElem,
    prevButtonElem,
    nextButtonElem,
    progressElem,
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
