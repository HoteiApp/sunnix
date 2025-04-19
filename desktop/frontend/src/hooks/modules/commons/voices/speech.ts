import { useMutation } from "react-query";
import { displayNotificationError } from "../../../../utils";
import { post } from "../../../api";

interface SpeechProps {
  text: string;
  lang: string;
}

const useSpeech = () => {
  const convertTextToSpeech = async ({ text, lang }: SpeechProps) => {
    try {
      
      const response = await post("speech", JSON.stringify({
        text: text,
        lang: lang,
      }));

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      throw error;
    }
  };

  return useMutation(convertTextToSpeech, {
    onError: displayNotificationError,
    onSuccess: (audioUrl) => {
      const audio = new Audio(audioUrl);
      audio.play();
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  });
};

export { useSpeech };
