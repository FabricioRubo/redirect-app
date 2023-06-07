"use client"
import Image from 'next/image'
import logo from '../assets/logo-txai.png'
import InputForm from '@/components/inputForm'
import ConclusionForm from '@/components/conclusionForm'
import { questions } from './questions'
import React,{ useState, useEffect  } from 'react'


const Home = () => {
  let trashValue:string[]=[];

  const [answers, setAnswers] = useState(trashValue);
  const [completedInput, setCompletion] = useState(false);

  const [windowWidth, setWindowWidth] = useState((0));

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window?.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window?.innerWidth);
      window?.addEventListener('resize', handleResize);

      return () => {
        window?.removeEventListener('resize', handleResize);
      };
    }
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
        isMobile: true,
        div0: 'h-screen',
        div1: 'flex items-center justify-center bg-[#45a3a8a9] h-1/6',
        div2: 'grid items-center',
        div3: 'col-span-1 flex items-center', 
        div4: 'font-montserrat text-center text-2xl text-[#5D2025] ml-4',
        div5: 'shadow-2xl flex justify-center items-center bg-[#F9DA9C] h-5/6',
        imageHeight: 90,
        imageWidth: 66,
      };
    } else {
      return {
        isMobile: false,
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

  const { isMobile, div0, div1, div2, div3, div4, div5, imageHeight, imageWidth } = responsiveClassEditor();

  const renderInput = () => {
    if (!completedInput) {
      return <InputForm isMobileFlag={isMobile} questionObj={questions} updateAnswers={updateAnswers} completionSignal={inputCompletedFunc} />;
    }
  };

  const renderCompletion = () => {
    if (completedInput) {
      return <ConclusionForm isMobileFlag={isMobile} questionObj={questions} answers={answers} />;
    }
  };

  return (
    <div id='a' className="">
      <div id='b' className={div0}>
        <div id='c' className={div1}>
          <div id='d' className={div2}>
            <div id='e' className={div3}>
              {typeof window !== 'undefined' && (
                <Image src={logo} alt='TXAI Digital' height={imageHeight} width={imageWidth} />
              )}
              <p hidden={isMobile} className={div4}>Consultoria</p>
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
