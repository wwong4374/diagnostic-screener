export interface Screener {
  id: string;
  fullName: string;
  name: string;
  disorder: string;
  content: Content;
}

interface Content {
  displayName: string;
  sections: Section[];
}

interface Section {
  title: string;
  type: string;
  questions: Question[];
  answers: AnswerOption[];
}

interface Question {
  title: string;
  questionId: string;
}

interface AnswerOption {
  title: string;
  value: number;
}
