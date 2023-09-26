'use client'
import { NextPage } from "next";
import React,{ useRef, useState } from 'react'
import { QuestionForm} from "@/types/interfaces";
import validator from 'validator';


interface Props {
    questionObj: QuestionForm[];
    updateAnswers: (newAnswer: string) => void;
    completionSignal: (completionFlag: boolean) => void;
    isMobileFlag: boolean;
}

const InputForm: NextPage<Props> = (props) => {
    const {questionObj, isMobileFlag, updateAnswers, completionSignal} = props;

    let trashValue:string[]=[];
    let ref = useRef<HTMLInputElement>(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [inputText, setInputText] = useState("");
    const [answers, setAnswers] = useState(trashValue);
    const [emptyInput, setEmptyInputFlag] = useState(true)

    const ProgressBar = ( progressPercentage:number) => {
        const progressBarClass = () => {
            return isMobileFlag ? 'mt-6 h-5 w-full bg-[#919ab1]' : 'mt-6 h-5 w-1/2 bg-[#919ab1]'
        }
        return (
            <div className={progressBarClass()}>
                <div
                    style={{ width: `${progressPercentage}%`}}
                    className={`h-full ${progressPercentage < 50 ? 'bg-[#004AAD]' : 'bg-[#004AAD]'}`}>
                </div>
            </div>
        );
    };

    const formatPhoneNumber = (phoneNumber: string) => {
        // Remove all non-digit characters from the input
        const cleaned = phoneNumber.replace(/\D/g, '');
        
        // Check if the cleaned input is a valid phone number
        if (cleaned.length === 11) {
            // Format the phone number as (xx) xxxxx-xxxx
            const formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
            return formatted;
        }
        
        // Return the original input if it's not a valid phone number
        return phoneNumber;
    };

    const inputChange = (value: string) => {
        if (questionObj[currentQuestion].type == "email") {
            if (validator.isEmail(value)) {
                setEmptyInputFlag(false);
            } else {
                setEmptyInputFlag(true);
            }
        // } else if(questionObj[currentQuestion].type == "telefone") {
        //     if (!value) {
        //         setEmptyInputFlag(true)
        //     } else {
        //         setEmptyInputFlag(false)
        //     }
        } else {
            if (!value) {
                setEmptyInputFlag(true)
            } else {
                setEmptyInputFlag(false)
            }
        }
        setInputText(value);
    }
    const buttonSubmitAnswer = (value: string) => {
        let indexChecker= currentQuestion+1;
        if(currentQuestion<(questionObj.length-1)) {
            setCurrentQuestion(currentQuestion+1);
            
        }
        setAnswers(current => [...current, value])
        updateAnswers(value);
        if (ref.current !==null) {
            ref.current.value = '';
            setEmptyInputFlag(true)
        }
        if((indexChecker)==(questionObj.length)) {
            completionSignal(true)
        }
    }
    const questionEditor = () => {
        const questionEditorClass = () => {
            return isMobileFlag ? 
                "font-montserrat text-xl text-[#004AAD] text-justify" 
                : 
                "font-montserrat text-2xl text-[#004AAD] text-justify"
        }
        return questionObj[currentQuestion].namePrefix ? 
                (
                    <div className={questionEditorClass()}>
                        {(currentQuestion+1) + ". " + answers[0] +", " + questionObj[currentQuestion].quest}
                    </div>
                ) 
                :
                (
                    <div className={questionEditorClass()}>
                        {(currentQuestion+1) + ". " + questionObj[currentQuestion].quest}
                    </div>
                )
    }
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !emptyInput) {
            buttonSubmitAnswer(inputText)
        }
    }
    const inputRenderer = () => {
        const inputRendererClass = () => {
            return isMobileFlag ? 
            "w-full pt-2 font-medium font-montserrat text-xl bg-transparent border-b-2 border-[#004AAD] text-[#000000c0] leading-tight focus:outline-none placeholder-[#5d202547]" 
            : 
            "w-full pt-1 font-montserrat text-2xl bg-transparent border-b-2 border-[#004AAD] text-[#000000c0] leading-tight focus:outline-none placeholder-[#5d202547]" 
        }
        return questionObj[currentQuestion].isSelect ? (<></>) : (
            <input className={inputRendererClass()} 
            ref={ref}
            placeholder={questionObj[currentQuestion].placeHolder  || "missing_text"} 
            type={questionObj[currentQuestion].type || "missing_text"} 
            onChange={e=>inputChange(e.target.value)}
            onKeyDown={e => handleKeyDown(e)}
            />
        )
    }
    const buttonSelectEditor = () => {
        const buttonSelectEditorClass = () => {
            return isMobileFlag? 
            "bg-transparent hover:bg-[#004AAD] text-sm text-[#004AAD] font-montserrat font-bold hover:text-white my-1 py-2 px-2 border border-[#004AAD] hover:border-transparent rounded w-full"
            :
            "bg-transparent hover:bg-[#004AAD] text-lg text-[#004AAD] font-montserrat font-bold hover:text-white my-1 py-3 px-2 border border-[#004AAD] hover:border-transparent rounded w-1/2"
        }
        const buttonEditorClass = () => {
            return isMobileFlag? 
            "bg-transparent text-[#004AAD] font-montserrat font-bold my-1 py-2 px-2 border border-[#004AAD] rounded w-full " + (emptyInput ? "opacity-50 cursor-not-allowed" : "hover:bg-[#004AAD] hover:text-white hover:border-transparent")
            :
            "bg-transparent text-[#004AAD] font-montserrat font-bold my-1 py-2 px-2 border border-[#004AAD] rounded w-1/2 " + (emptyInput ? "opacity-50 cursor-not-allowed" : "hover:bg-[#004AAD] hover:text-white hover:border-transparent")
        }
        if(questionObj[currentQuestion].isSelect) {
            return questionObj[currentQuestion].choices.map((choiceText:string) => {
                return (<button key={choiceText} onClick={e=> buttonSubmitAnswer(choiceText)} className={buttonSelectEditorClass()}>{choiceText}</button>)
            })
        } else {
            return (
                <button 
                    disabled={emptyInput} 
                    onClick={e=> buttonSubmitAnswer(inputText)} 
                    className={buttonEditorClass()}>
                        Próximo
                </button>
            );
        }
    }
    const descriptionEditor = () => {
        if (questionObj[currentQuestion].description) {
            return (
                <div className="w-full bg-transparent">
                    <p className="font-montserrat text-base font-bold text-[#5DE0E6A4]">{questionObj[currentQuestion].description}</p>
                </div>
            )
        }
    }

    return (
        <div id="input-container" className="w-9/12">
            {questionEditor()}
            {descriptionEditor()}
            {inputRenderer()}
            <div className="flex flex-col mt-6">
                {buttonSelectEditor()}
            </div>
            {ProgressBar((answers.length/questionObj.length)*100)}
        </div>
    );
};

export default InputForm;