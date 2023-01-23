import React, { FunctionComponent, PropsWithChildren } from "react";
import { Card, Form, FormControl } from "react-bootstrap";

import { Answer, Question } from "../../types";

interface QuestionProps extends PropsWithChildren {
  question: Question;
  onSelect: (answer: Answer) => void;
  initialAnswer?: Answer;
}

const QuestionComponent: FunctionComponent<QuestionProps> = ({
  question,
  onSelect,
  initialAnswer,
}) => {
  return (
    <Card data-testid="question">
      <Card.Header>{question.text}</Card.Header>
      <Card.Body>
        <Form>
          {question.answers.map((answer, index) => (
            <Form.Check
              key={answer.text}
              id={`qustion-option-${index}`}
              type="radio"
              name="answer"
              label={answer.text}
              defaultChecked={answer === initialAnswer}
              onChange={() => onSelect(answer)}
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default QuestionComponent;
