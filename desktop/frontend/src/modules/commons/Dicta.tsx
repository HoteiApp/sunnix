import { useEffect } from "react";
import { classNames } from "primereact/utils";
import { Button } from 'primereact/button';
import { ReadText } from '../commons';
import {
    displayNotificationQuestion,
    displayNotificationSuccess,
} from "../../utils";
import SpeechRecognition, {
    useSpeechRecognition
} from "react-speech-recognition";

// Reference: https://www.loginradius.com/blog/async/quick-look-at-react-speech-recognition/

const Dicta = () => {
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening
    } = useSpeechRecognition();

    useEffect(() => {
        console.log("si");
        if (finalTranscript !== "") {
            // if (transcript.toLowerCase().includes("abrir")) {
            if (!transcript.toLowerCase().includes("en que puedo ayudarte")) {
                displayNotificationQuestion(transcript.toLowerCase());
                // console.log(transcript);
                // extractCommand(transcript.toLowerCase());
                SpeechRecognition.stopListening();
            }
            // }
            // console.log(transcript.toLowerCase());
            const delay = 1000; // 3 segundos en milisegundos
            const timer = setTimeout(() => {
                resetTranscript();
            }, delay);
            // Limpiar el timer cuando el componente se desmonte
            return () => clearTimeout(timer);
            console.log("Got final result:", finalTranscript);
        }

    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log(
            "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
        );
        return null;
    }
    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: "es"
        });
        ReadText({ text: "En que puedo ayudarte", lang: "es-ES" })
    };


    return (
        // <div>
        // <div>
        // <span>listening: {listening ? "on" : "off"}</span> 
        <div className="w-full">
            <Button icon="pi pi-undo" className="mr-2" onClick={resetTranscript} />

            <Button
                icon="pi pi-microphone"
                className={classNames(
                    "mr-2",
                    listening && "bg-secondary"
                )}
                onClick={listening === true ? SpeechRecognition.stopListening : listenContinuously} />

            <Button icon="pi pi-stop-circle" onClick={SpeechRecognition.stopListening} />


        {/* </div> */}
        {/* // </div>  */}
        {/* //<div>  */}
        <span>{transcript}</span> 
        {/* // </div> */}
        </div>
    );
}
type Props = {
    // extractCommand,
    // data,
    // relad(): void;
    // closed(): void;
}
export { Dicta }