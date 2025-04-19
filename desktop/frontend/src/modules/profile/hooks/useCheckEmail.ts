import { post } from "../../../hooks/api";
import { Msg } from "../../../models"

const useCheckEmail = () => {
  // Resto del código

  const check = async ({ email }: Props) => {
    const response = await post('checkemail', JSON.stringify({ email: email }));
    const result = response.status === 200 ? await response.json() : undefined;
    return result as Msg;
  };

  return { check };
};

type Props = {
  email: string;
};


export { useCheckEmail };
