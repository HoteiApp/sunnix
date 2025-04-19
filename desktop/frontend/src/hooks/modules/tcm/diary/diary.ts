
import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { DataDiary } from "../../../../models";
import { post } from "../../../api";

const useDateDiary = () => {
  const newData = async ({ date }: Props) => {
    const response = await post(
      "my/diary",
      JSON.stringify({ date: date })
    );
    const dateDiary = response.status === 200 ? await response.json() : undefined;
    return dateDiary as DataDiary;
  };

  const { mutateAsync: dateDiary, isLoading: isLoadingdateDiary } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
    }
  );

  return { dateDiary, isLoadingdateDiary };
};
type Props = {
  date: string;
};
export { useDateDiary };
