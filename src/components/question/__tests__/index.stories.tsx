import React from "react";

import QuestionComponent from "../index";
import { question } from "./fixtures";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Question",
  component: QuestionComponent,
};

export const Basic = () => (
  <QuestionComponent question={question} onSelect={() => {}} />
);
