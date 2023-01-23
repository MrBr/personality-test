import { Answer, Question } from "../types";

const createGenericOpennessAnswers = (): Answer[] => {
  return [0.2, 0.5, 0.7, 0.9].map((openness) => ({
    text: `Openness ${openness}`,
    openness,
  }));
};

const questions: Question[] = [
  { text: "First question", answers: createGenericOpennessAnswers() },
  { text: "Second question", answers: createGenericOpennessAnswers() },
  { text: "Third question", answers: createGenericOpennessAnswers() },
  { text: "Fourth question", answers: createGenericOpennessAnswers() },
];

const loadQuestions = (): Promise<Question[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(questions), 2000);
  });
};

export default loadQuestions;
