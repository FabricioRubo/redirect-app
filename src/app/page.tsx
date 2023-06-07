"use client"
import Image from 'next/image'
import dynamic from 'next/dynamic';
import logo from '../assets/logo-txai.png'
import InputForm from '@/components/inputForm'
import ConclusionForm from '@/components/conclusionForm'
import { questions } from './questions'
import React,{ useState, useEffect  } from 'react'


const Home = () => {
  let trashValue:string[]=[];

  const [answers, setAnswers] = useState(trashValue);
  const [completedInput, setCompletion] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const updateAnswers = (newAnswer:string) => {
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  };

  const inputCompletedFunc = (completionFlag:boolean) => {
    setCompletion(completionFlag);
  };

  const responsiveClassEditor = () => {
    if (windowWidth < 768) {
      return {
        div0: 'h-screen',
        div1: 'flex items-center justify-center bg-[#45a3a8a9] h-1/6 p-4',
        div2: 'grid grid-cols-2 items-center',
        div3: 'col-span-1 flex items-center', // Add justify-center class
        div4: 'font-montserrat text-center text-2xl text-[#5D2025] ml-4',
        div5: 'shadow-2xl flex justify-center items-center bg-[#F9DA9C] h-5/6 p-4',
        imageHeight: 60,
        imageWidth: 44,
      };
    } else {
      return {
        div0: 'flex flex-row h-screen',
        div1: 'flex justify-center items-center basis-2/5 bg-[#45a3a8a9] h-full',
        div2: 'grid grid-rows-5 items-center',
        div3: 'row-span-3',
        div4: 'font-montserrat row-span-2 text-center text-2xl text-[#5D2025]',
        div5: 'shadow-2xl flex justify-center items-center basis-3/5 bg-[#F9DA9C] h-full',
        imageHeight: 330,
        imageWidth: 250,
      };
    }
  };

  const { div0, div1, div2, div3, div4, div5, imageHeight, imageWidth } = responsiveClassEditor();

  const renderInput = () => {
    if (!completedInput) {
      return <InputForm questionObj={questions} updateAnswers={updateAnswers} completionSignal={inputCompletedFunc} />;
    }
  };

  const renderCompletion = () => {
    if (completedInput) {
      return <ConclusionForm questionObj={questions} answers={answers} />;
    }
  };

  return (
    <div id='a' className="">
      <div id='b' className={div0}>
        <div id='c' className={div1}>
          <div id='d' className={div2}>
            <div id='e' className={div3}>
              <Image src={logo} alt="TXAI Digital" height={imageHeight} width={imageWidth} />
              <p hidden={windowWidth < 768} className={div4}>Consultoria</p>
            </div>
          </div>
        </div>
        <div className={div5}>
          {renderInput()}
          {renderCompletion()}
        </div>
      </div>
    </div>
  );
};

export default Home;
