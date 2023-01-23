import { Question } from "../../../types";

function createQuestion(): Question {
  return {
    text: "Demo question?",
    answers: [
      { text: "Test 0.2", openness: 0.2 },
      { text: "Test 0.5", openness: 0.5 },
      { text: "Test 0.7", openness: 0.7 },
      { text: "Test 0.9", openness: 0.9 },
    ],
  };
}

const questions: Question[] = [
  createQuestion(),
  createQuestion(),
  createQuestion(),
];

export { questions };
