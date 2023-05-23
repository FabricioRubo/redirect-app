"use client"
import Image from 'next/image'
import logo from '../assets/logo-txai.png'
import InputForm from '@/components/inputForm'
import ConclusionForm from '@/components/conclusionForm'
import { questions } from './questions'
import React,{ useState } from 'react'

const Home = () => {
  let trashValue:string[]=[];

  const [answers, setAnswers] = useState(trashValue);
  const [completedInput, setCompletion] = useState(false);

  const updateAnswers = (newAnswer:string) => {
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  };

  const inputCompletedFunc = (completionFlag:boolean) => {
    setCompletion(completionFlag);
  };

  const printAll = () => {
    console.log(answers);
    console.log(completedInput);
  };

  const renderInput = () => {
    if(!completedInput) {
      return (
        <InputForm questionObj={questions} updateAnswers={updateAnswers} completionSignal={inputCompletedFunc}/>
      )
    }
  }

  const renderCompletion = () => {
    if(completedInput) {
      return (
        <ConclusionForm  questionObj={questions} answers={answers}/>
      )
    }
  }

  return (
    <div className="">
      <div className='flex flex-row h-screen'>
        <div className="flex justify-center items-center basis-2/5 bg-[#45a3a8a9] h-full">
          <div className="grid grid-rows-5 items-center">
            <Image className="row-span-3" src={logo} alt="TXAI Digital" height = {330} width={250}/>
            <p className="font-mono row-span-2 text-center">TXAI Digital</p>
          </div>   
        </div>
        <div className="shadow-2xl flex justify-center items-center basis-3/5 bg-[#F9DA9C] h-full">
          {renderInput()}
          {renderCompletion()}
          <div hidden onClick={e=> printAll()}>Teste</div>
        </div>
      </div>
    </div>
  )
}

export default Home;
