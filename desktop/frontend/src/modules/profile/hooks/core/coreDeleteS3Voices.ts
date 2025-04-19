import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { remove } from "../../../../hooks/api";

const useDeleteS3Voices = (reload: () => void) => {
  const newData = async ({ key, name }: Props) => {
    const response = await remove(
      "voice/",
      JSON.stringify({ 
        key: key, 
        name: name, 
       }),
    );

    if (!response.ok) {
      throw new Error("Error");
    }
    
    return { message: "Deleted successfully!" };
  };

  const { mutate: deleteS3voice, isLoading: isUpdatingDeleteS3voice } = useMutation(
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

  return { deleteS3voice, isUpdatingDeleteS3voice };
};

type Props = {
  key: string;
  name: string;
};

export { useDeleteS3Voices };
