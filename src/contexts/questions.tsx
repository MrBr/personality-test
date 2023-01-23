import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Question } from "../types";

interface QuestionsContextInterface {
  questions: Question[] | undefined;
  setQuestions: (questions: Question[]) => void;
}

const QuestionsContext = createContext<QuestionsContextInterface>({
  questions: undefined,
  setQuestions: () => [],
});

export const useQuestions = () => {
  return useContext(QuestionsContext);
};

export const QuestionsProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<Question[] | undefined>();

  const questionsContext = useMemo(
    () => ({
      questions,
      setQuestions,
    }),
    [questions]
  );

  return (
    <QuestionsContext.Provider value={questionsContext}>
      {children}
    </QuestionsContext.Provider>
  );
};
