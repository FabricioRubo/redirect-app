export interface QuestionForm {
    quest: string;
    description: string;
    placeHolder: string;
    type: string;
    isSelect: boolean;
    choices: string[];
}

export interface EmailFormData {
    formField1: string;
    formField2: string;
  }