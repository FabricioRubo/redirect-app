export interface QuestionForm {
    quest: string;
    placeHolder: string;
    type: string;
}

export interface QuestionForm2 {
    quest: string;
    placeHolder: string;
    type: string;
    isSelect: boolean;
    choices: string[];
}