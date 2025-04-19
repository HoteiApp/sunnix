import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { remove } from "../../../../hooks/api";

const useDeleteS3Object = (reload: () => void) => {
  const newData = async ({ key }: Props) => {
    const response = await remove(
      "module/tcm/s3/object",
      JSON.stringify({ 
        key: key, 
        // name: name, 
       }),
    );

    if (!response.ok) {
      throw new Error("Error");
    }
    
    return { message: "Deleted successfully!" };
  };

  const { mutate: deleteS3object, isLoading: isUpdatingDeleteS3object } = useMutation(
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

  return { deleteS3object, isUpdatingDeleteS3object };
};

type Props = {
  key: string;
  // name: string;
};

export { useDeleteS3Object };
