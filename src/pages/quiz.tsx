import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Questionnaire from "../components/questionnaire";
import { useCallback, useEffect, useState } from "react";
import { useQuestions } from "../contexts/questions";
import loadQuestions from "../mocks/load-questions";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../constants";
import { evaluateAnswers } from "../services/answer";
import { Answer, Personality } from "../types";
import PersonalityComponent from "../components/personality";

const Quiz = () => {
  const { questions, setQuestions } = useQuestions();
  const [personality, setPersonality] = useState<Personality | undefined>();
  const navigate = useNavigate();

  const isCompleted = !!personality;
  const isLoaded = !!questions;

  useEffect(() => {
    if (!questions) {
      loadQuestions().then(setQuestions);
    }
  }, [questions, setQuestions]);

  const goHome = useCallback(() => {
    navigate(Paths.Home);
  }, []);

  const reset = useCallback(() => {
    setPersonality(undefined);
  }, []);

  const resolvePersonality = useCallback(
    (answers: Answer[]) => {
      const personality = evaluateAnswers(answers);
      setPersonality(personality);
    },
    [setPersonality]
  );

  return (
    <Container>
      <h1 className="mt-3">Personality questionnaire</h1>
      <Row>
        <Col className="justify-content-center">
          {isCompleted && <PersonalityComponent personality={personality} />}
          {isLoaded && !isCompleted && (
            <Questionnaire
              questions={questions}
              onCancel={goHome}
              onComplete={resolvePersonality}
            />
          )}
          {!isLoaded && <Spinner animation="border" />}
        </Col>
      </Row>
      {isCompleted && (
        <Row className="mt-3">
          <Col className="col-auto">
            <Button onClick={reset}>Restart</Button>
          </Col>
          <Col>
            <Link to={Paths.Home}>Home</Link>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Quiz;
