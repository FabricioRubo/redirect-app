'use client'
import { NextPage } from "next";
import React,{ useRef, useState } from 'react'
import { QuestionForm } from "@/interfaces";

interface Props {
    questionObj: QuestionForm[];
    updateAnswers: (newAnswer: string) => void;
}

const InputForm: NextPage<Props> = (props) => {
    const {questionObj, updateAnswers} = props;

    let trashValue:string[]=[];
    let ref = useRef<HTMLInputElement>(null)

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [inputText, setInputText] = useState("");
    const [answers, setAnswers] = useState(trashValue)

    const inputChange = (value: string) => {
        setInputText(value)
    }

    const buttonSubmitAnswer = (value: string) => {
        if(currentQuestion<(questionObj.length-1)) {
            setCurrentQuestion(currentQuestion+1)
            
        }
        setAnswers(current => [...current, value])
        updateAnswers(value);
        if (ref.current !==null) {
            ref.current.value = '';
        }
    }

    const questionEditor = () => {
        if (currentQuestion == 1) {
            return (answers[0] +", " + questionObj[currentQuestion].quest)
        } else {
            return (questionObj[currentQuestion].quest)
        }
    }

    const inputRenderer = () => {
        if (true) {
            return (
                <input className="w-full font-sans text-2xl bg-transparent border-b-2 border-[#D9402B] leading-tight focus:outline-none placeholder-[#5d202547]" 
                ref={ref}
                placeholder={questionObj[currentQuestion].placeHolder  || "TEXTO"} 
                type={questionObj[currentQuestion].type || "TEXTO"} 
                onChange={e=>inputChange(e.target.value)}/>
            )
        } else {

        }
    }

    const buttonSelectEditor = () => {
        if(false /*questionObj[currentQuestion].isSelect*/) {
            //Lista de opções para retornar
        } else {
            return (
                <button onClick={e=> buttonSubmitAnswer(inputText)} className="bg-transparent hover:bg-[#D9402B] text-[#D9402B] font-sans font-bold hover:text-white py-2 px-4 border border-[#D9402B] hover:border-transparent rounded">
                    Próximo
                </button>
            )
        }
    }

    return (
        <div id="input-container" className="w-8/12">
            <p className="font-mono text-2xl text-[#D9402B]">{questionEditor()}</p>
            {inputRenderer()}
            <div className="mt-6">
                {buttonSelectEditor()}
            </div>
        </div>
    )
}

export default InputForm;