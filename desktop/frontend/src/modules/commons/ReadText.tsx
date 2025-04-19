
const ReadText = ({text, lang}: Props) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.rate = 1.0;
            speech.lang = lang;
            window.speechSynthesis.speak(speech);
        }
};

type Props = {
    text: string;
    lang: string;
}

export {ReadText}