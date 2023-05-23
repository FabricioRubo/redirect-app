"use client"
import Image from 'next/image'
import logo from '../assets/logo-txai.png'
import InputForm from '@/components/inputForm'
import { questions } from './questions'
import React,{ useState } from 'react'

const Home = () => {
  let trashValue:string[]=[];
  
  const [answers, setAnswers] = useState(trashValue);

  const updateAnswers = (newAnswer:string) => {
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    console.log(answers)
  };

  const printAll = () => {
    console.log(answers)
  }

  return (
    <main className="">
      <div className='flex flex-row h-screen'>
        <div className="flex justify-center items-center basis-2/5 bg-[#45a3a8a9] h-full">
          <div className="grid grid-rows-5 items-center">
            <Image className="row-span-3" src={logo} alt="TXAI Digital" height = {330} width={250}/>
            <p className="font-mono row-span-2 text-center">TXAI Digital</p>
          </div>   
        </div>
        <div className="shadow-2xl flex justify-center items-center basis-3/5 bg-[#F9DA9C] h-full">
          <InputForm
            questionObj={questions}
            updateAnswers={updateAnswers}
          />
          <p onClick={e=> printAll()}>Teste</p>
        </div>
      </div>
    </main>
  )
}

export default Home;
