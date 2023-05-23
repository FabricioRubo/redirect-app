import { QuestionForm2 } from "@/interfaces"

export const questions: QuestionForm2[] = [
    {
        quest: "Queremos te conhecer melhor. Qual é o seu nome?",
        placeHolder: "Digite seu nome",
        type: "text",
        isSelect: false,
        choices: []
    },
    {
        quest: "essa consultoria é exclusiva para profissionais liberais/autônomos e donos de empresa. Você é dono?",
        placeHolder: "",
        type: '',
        isSelect: true,
        choices: ["SIM", "NÃO"]
    },
    {
        quest: "🔥 Perfeito! Qual é seu melhor email?",
        placeHolder: "Digite seu e-mail",
        type: "text",
        isSelect: false,
        choices: []
    },
    {
        quest: "Qual é o seu número de telefone? (Com Whatsapp)",
        placeHolder: "51 98765-4321",
        type: "text",
        isSelect: false,
        choices: []
    },
    {
        quest: "Qual é o Instagram da sua empresa? Caso não lembre, insira o nome.",
        placeHolder: "Para efetuarmos a análise da jornada de compra do seu cliente, precisamos do link do seu Instagram. Ex.: instagram.com/exemplo",
        type: "text",
        isSelect: false,
        choices: []
    },
    {
        quest: "Sua empresa possui site? Se sim, digite o site da sua empresa.",
        placeHolder: "Vamos analisar o seu site com nossas ferramentas ultra modernas para identificar como podemos melhorar o seu posicionamento.",
        type: "text",
        isSelect: false,
        choices: []
    },
    {
        quest: "O que você ou a sua empresa vende?",
        placeHolder: "Pode dar detalhes sobre sua operação se quiser. Assim vamos te ajudar ainda mais!",
        type: "text",
        isSelect: false,
        choices: []
    },
    {
        quest: "Qual o seu faturamento atual?",
        placeHolder: "",
        type: "",
        isSelect: true,
        choices: ["De 3 a 5 mil","De 5 a 10 mil","De 10 a 50 mil","De 50 mil a 100 mil","De 100 mil a 500 mil","Mais de 500 mil"]
    },
    {
        quest: "Quanto você tem reservado para investir em anúncios?",
        placeHolder: "",
        type: "",
        isSelect: true,
        choices: ["De 1,5 a 2 mil","De 2 a 5 mil","De 5 a 7 mil","De 7 mil a 10 mil","De 10 a 20 mil","Mais de 20 mil","Não tenho nada reservado"]
    },
    {
        quest: "Qual das opções abaixo melhor descreve o seu momento atual?",
        placeHolder: "",
        type: "",
        isSelect: true,
        choices: ["Ouvi falar que marketing digital pode ajudar o meu negócio.","Acredito que marketing digital é bom para o meu negócio, mas preciso saber mais a respeito.","Estou escolhendo uma empresa de marketing digital para contratar"]
    },
    {
        quest: "Qual tipo de serviço você procura?",
        placeHolder: "",
        type: "",
        isSelect: true,
        choices: ["1 Pilar | Apenas Tráfego","2 Pilares | Tráfego e Site","3 Pilares | (Tráfego, Site e Redes Sociais)", "3 Pilares + Outros serviços | (E-mail marketing, SEO, Blog, Produção Audiovisual"]
    },
]