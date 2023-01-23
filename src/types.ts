export interface Answer {
  text: string;
  openness: number;
}

export interface Question {
  text: string;
  answers: Answer[];
}
