import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { upload } from "../../../../hooks/api";

const useUploadAudio = (reload: () => void) => {

  const newData = async ({ mode, audioBlob, from, to, message_number, module, component, id_component }: Props) => {
    const formData = new FormData(); formData.append('audio', audioBlob, `audio.wav`);
    formData.append('mode', mode);
    formData.append('from', from);
    formData.append('to', to);
    formData.append('message_number', message_number);
    formData.append('module', module);
    formData.append('component', component);
    formData.append('id_component', id_component);
    const response = await upload(
      "voice/",
      formData
    );

    if (!response.ok) {
      throw new Error("Error uploada Voice");
    }

    return { message: "Upload successfully!" };
  };

  const { mutate: uploadVoice, isLoading: isUpdatingUploadVoice } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        reload();
        displayNotificationSuccess(msg.message);
      },
    }
  );

  return { uploadVoice, isUpdatingUploadVoice };
};

type Props = {
  mode: string;
  audioBlob: Blob;
  from: string;
  to: string;
  message_number: string;
  module: string;
  component: string;
  id_component: string;
};

export { useUploadAudio };
