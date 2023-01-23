import { Answer, Personality } from "../types";

const evaluateAnswers = (answers: Answer[]): Personality => {
  if (answers.length === 0) {
    throw new Error("Must have answers");
  }

  const sum = answers.reduce((res, { openness }) => res + openness, 0);
  const avgOpenness = sum / answers.length;

  if (avgOpenness === 0.5) {
    return Personality.Ambivert;
  }

  return avgOpenness > 0.5 ? Personality.Extrovert : Personality.Introvert;
};

export { evaluateAnswers };
