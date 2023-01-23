import React, { FunctionComponent, PropsWithChildren, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Answer, Question } from "../../types";
import QuestionComponent from "../question";

export interface QuestionnaireProps extends PropsWithChildren {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
  onCancel: () => void;
}

const Questionnaire: FunctionComponent<QuestionnaireProps> = ({
  questions,
  onComplete,
  onCancel,
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const activeAnswer = answers[activeStep];
  const activeQuestion = questions[activeStep];
  const isLastStep = activeStep >= questions.length - 1;
  const isFirstStep = activeStep === 0;
  const isCompleted = answers.length === questions.length;

  const setAnswer = (answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[activeStep] = answer;
    setAnswers(newAnswers);
  };

  const setPrevStep = () => {
    const newStep = activeStep - 1;
    setActiveStep(newStep);
  };

  const setNextStep = () => {
    const newStep = activeStep + 1;
    setActiveStep(newStep);
  };

  const completeQuestionnaire = () => {
    if (isCompleted) {
      onComplete(answers);
    }
  };

  return (
    <Container fluid data-testid="questionnaire">
      <QuestionComponent
        key={`question-${activeStep}`}
        question={activeQuestion}
        onSelect={setAnswer}
        initialAnswer={activeAnswer}
      />
      <Row className="mt-3">
        <Col data-testid="progress" className="col-auto">
          {activeStep + 1}/{questions.length}
        </Col>
        <Col className="col-auto me-auto">
          <Button onClick={onCancel} data-testid="cancel" variant="danger">
            Cancel
          </Button>
        </Col>
        <Col className="col-auto me-auto">
          <Button
            disabled={!isCompleted}
            data-testid="submit"
            onClick={completeQuestionnaire}
          >
            Submit
          </Button>
        </Col>

        <Col className="col-auto">
          <Button
            onClick={setPrevStep}
            disabled={isFirstStep}
            data-testid="prev"
            variant="outline-info"
          >
            Prev
          </Button>
        </Col>
        <Col className="col-auto">
          <Button
            onClick={setNextStep}
            disabled={isLastStep || !activeAnswer}
            data-testid="next"
            variant="outline-info"
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Questionnaire;
