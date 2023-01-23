import React, { FunctionComponent, PropsWithChildren } from "react";
import { Card } from "react-bootstrap";

import { Personality } from "../../types";

export interface PersonalityProps extends PropsWithChildren {
  personality: Personality;
}

const Descriptions: Record<Personality, string> = {
  Ambivert: "You're exaclty half introvert and extrovert.",
  Introvert: "You prefer your own company.",
  Extrovert: "You like company of others.",
};

const PersonalityComponent: FunctionComponent<PersonalityProps> = ({
  personality,
}) => {
  return (
    <Card data-testid="question">
      <Card.Header>You're an {personality}</Card.Header>
      <Card.Body>{Descriptions[personality]}</Card.Body>
    </Card>
  );
};

export default PersonalityComponent;
