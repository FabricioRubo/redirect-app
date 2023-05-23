import { QuestionForm} from "@/interfaces";
import { NextPage } from "next";

interface Props {
    questionObj: QuestionForm[];
    answers: string[];
}

const ConclusionForm: NextPage<Props> = (props) => {
    const {questionObj, answers} = props
    return (
        <div>
            <div>
                Perfeito! Suas informações foram enviadas para o nosso time
            </div>
            <div>
                {answers}
            </div>
        </div>
    )
}

export default ConclusionForm;