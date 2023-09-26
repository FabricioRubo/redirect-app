export interface QuestionForm {
    quest: string;
    description: string;
    placeHolder: string;
    type: string;
    isSelect: boolean;
    choices: string[];
    namePrefix: boolean;
}

export interface EmailFormData {
    questions: QuestionForm[];
    answers: string[];
  }