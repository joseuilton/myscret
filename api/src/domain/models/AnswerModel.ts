export interface AnswerModel {
  answerId: string;
  userId: string | null;
  questionId: string;
  answer: string;
  viewedByQuestionOwner: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}