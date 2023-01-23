import { evaluateAnswers } from "../answer";
import { Personality } from "../../types";
import {
  extrovertedAnswers,
  introvertedAnswers,
  ambivertAnswers,
} from "./fixtures";

describe("evaluateAnswers", function () {
  it("should throw if no answers", function () {
    expect(() => evaluateAnswers([])).toThrow();
  });

  it("should evaluate min value", function () {
    const personality = evaluateAnswers([{ text: "", openness: 0 }]);
    expect(personality).toBe(Personality.Introvert);
  });

  it("should evaluate max value", function () {
    const personality = evaluateAnswers([{ text: "", openness: 1 }]);
    expect(personality).toBe(Personality.Extrovert);
  });

  it("should evaluate one ambivert answer", function () {
    const personality = evaluateAnswers([{ text: "", openness: 0.5 }]);
    expect(personality).toBe(Personality.Ambivert);
  });

  it("should evaluate one extrovert answer", function () {
    const personality = evaluateAnswers([{ text: "", openness: 0.6 }]);
    expect(personality).toBe(Personality.Extrovert);
  });

  it("should evaluate one introvert answer", function () {
    const personality = evaluateAnswers([{ text: "", openness: 0.4 }]);
    expect(personality).toBe(Personality.Introvert);
  });

  it("should evaluate multiple ambivert answers", function () {
    const personality = evaluateAnswers(ambivertAnswers);
    expect(personality).toBe(Personality.Ambivert);
  });

  it("should evaluate multiple extrovert answers", function () {
    const personality = evaluateAnswers(extrovertedAnswers);
    expect(personality).toBe(Personality.Extrovert);
  });

  it("should evaluate multiple introvert answers", function () {
    const personality = evaluateAnswers(introvertedAnswers);
    expect(personality).toBe(Personality.Introvert);
  });
});
