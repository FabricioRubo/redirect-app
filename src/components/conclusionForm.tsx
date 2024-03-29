import { QuestionForm, EmailFormData } from "@/types/interfaces";
import { NextPage } from "next";
import { useState, useEffect } from "react";

interface Props {
    questionObj: QuestionForm[];
    answers: string[];
    isMobileFlag: boolean;
}

const ConclusionForm: NextPage<Props> = (props) => {
    const {questionObj, answers} = props
    const [isSending, setIsSending] = useState(true);
    const [countdown, setCountdown] = useState(5);
    
    useEffect(() => {
        sendEmail()
      }, []);

    useEffect(() => {
        if (!isSending && countdown > 0) {
            const timer = setTimeout(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            redirectToURL();
        }
    }, [isSending, countdown]);

    const sendEmail = async () => {
        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questions: questionObj,
                    answers: answers,
                } as EmailFormData),
            });
            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.error('Failed to send email: ', response);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        } finally {
            setIsSending(false);
        }
    };

    const loadingRender = () => {
        if (isSending) {
            return (
                <div className="flex justify-center items-center font-montserrat text-2xl text-[#004AAD]">
                    <p className="m-3">Enviando</p>
                    <svg aria-hidden="true" role="status" className="inline w-10 h-10 mr-3 animate-spin bg-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="white"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#004AAD"/>
                    </svg>
                </div>
            );
        }
        return (
                <div>
                    <div className="font-montserrat font-bold text-justify text-2xl text-[#004AAD]">Seu cadastro foi efetuado com sucesso!</div>
                    <div className="font-montserrat font-thin text-justify text-xl text-[#004AAD]">Você será redirecionado para nosso Whatsapp em {countdown}</div>
                </div>
        )
    }
    const redirectToURL = () => {
        if (typeof window !== 'undefined') {
            window.location.href = 'https://wa.link/9j5v3v' ;
        }
    };

    return (
        <div className="w-9/12">
            <div className="flex justify-center items-center">
                {loadingRender()}
            </div>
            
            <div>
                <button hidden onClick={sendEmail}>Send</button>
            </div>
        </div>
    )
}

export default ConclusionForm;