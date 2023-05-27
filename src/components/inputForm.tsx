'use client'
import { NextPage } from "next";
import React,{ useRef, useState } from 'react'
import { QuestionForm} from "@/interfaces";
import validator from 'validator';


interface Props {
    questionObj: QuestionForm[];
    updateAnswers: (newAnswer: string) => void;
    completionSignal: (completionFlag: boolean) => void;
}

const InputForm: NextPage<Props> = (props) => {
    const {questionObj, updateAnswers, completionSignal} = props;

    let trashValue:string[]=[];
    let ref = useRef<HTMLInputElement>(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [inputText, setInputText] = useState("");
    const [answers, setAnswers] = useState(trashValue);
    const [emptyInput, setEmptyInputFlag] = useState(true)

    const ProgressBar = ( progressPercentage:number) => {
        return (
            <div className='mt-6 h-5 w-1/2 bg-[#F19552]'>
                <div
                    style={{ width: `${progressPercentage}%`}}
                    className={`h-full ${progressPercentage < 50 ? 'bg-[#D9402B]' : 'bg-[#45A3A8]'}`}>
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
        if (currentQuestion == 1) {
            return ((currentQuestion+1) + ". " + answers[0] +", " + questionObj[currentQuestion].quest);
        } else {
            return ((currentQuestion+1) + ". " + questionObj[currentQuestion].quest);
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !emptyInput) {
            buttonSubmitAnswer(inputText)
        }
    }
    const inputRenderer = () => {
        if (!questionObj[currentQuestion].isSelect) {
            return (
                <input className="w-full font-montserrat text-2xl bg-transparent border-b-2 border-[#D9402B] leading-tight focus:outline-none placeholder-[#5d202547]" 
                ref={ref}
                placeholder={questionObj[currentQuestion].placeHolder  || "missing_text"} 
                type={questionObj[currentQuestion].type || "missing_text"} 
                onChange={e=>inputChange(e.target.value)}
                onKeyDown={e => handleKeyDown(e)}
                />
            );
        } else {
            return (
                <div>
                </div>
            )
        }
    }
    const buttonSelectEditor = () => {
        if(questionObj[currentQuestion].isSelect) {
            return questionObj[currentQuestion].choices.map((choiceText:string) => {
                return (<button key={choiceText} onClick={e=> buttonSubmitAnswer(choiceText)} className="bg-transparent hover:bg-[#D9402B] text-[#D9402B] font-montserrat font-bold hover:text-white py-2 px-4 border border-[#D9402B] hover:border-transparent rounded w-1/2">{choiceText}</button>)
            })
        } else {
            return (
                <button 
                    disabled={emptyInput} 
                    onClick={e=> buttonSubmitAnswer(inputText)} 
                    className={"bg-transparent text-[#D9402B] font-montserrat font-bold py-2 px-4 border border-[#D9402B] rounded w-min " + (emptyInput ? "opacity-50 cursor-not-allowed" : "hover:bg-[#D9402B] hover:text-white hover:border-transparent")}>
                        Próximo
                </button>
            );
        }
    }
    const descriptionEditor = () => {
        if (questionObj[currentQuestion].description) {
            return (
                <div className="w-full bg-transparent">
                    <p className="font-montserrat text-base font-bold text-[#d93f2ba4]">{questionObj[currentQuestion].description}</p>
                </div>
            )
        }
    }
    return (
        <div id="input-container" className="w-8/12">
            <div className="font-montserrat text-2xl text-[#D9402B]">{questionEditor()}</div>
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