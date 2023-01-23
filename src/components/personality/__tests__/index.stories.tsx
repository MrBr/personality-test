import React from "react";

import PersonalityComponent, { PersonalityProps } from "../index";
import { Personality } from "../../../types";
import QuestionComponent from "../../question";
import { question } from "../../question/__tests__/fixtures";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Personality",
  component: PersonalityComponent,
  argTypes: {
    personality: {
      defaultValue: Personality.Ambivert,
      options: Personality,
      control: { type: "select" },
    },
  },
};

export const Basic = ({ personality }: PersonalityProps) => (
  <PersonalityComponent personality={personality} />
);
