import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
// import { ReadText } from '../../modules/commons';
import { useSpeech } from "../../hooks/modules/commons/voices/speech";
import { post } from "../api";

const useLogin = (
  setError: (error: Error) => void,
  setShowTwoFactor: (status: boolean) => void,
  relad: () => void
) => {
  const navigate = useNavigate();
  const { mutate: speech } = useSpeech();

  const LogIn = async ({ username, password, token }: Props) => {
    const response = await post(
      "login",
      JSON.stringify({
        username: username,
        password: password,
        token: token,
      })
    );

    const resp = await response.json();
    if (resp.OK === false) {
      speech({ text: resp.message, lang: "en-EN" });
      throw new Error("Unauthorized", {
        cause: { name: "401", message: "Unauthorized" },
      });
    }
    return resp;
  };

  const { mutate: login, isLoading } = useMutation(LogIn, {
    onError: (error: Error) => {
      setError(error);
    },
    onSuccess: (resp, variables) => {
      speech({ text: resp.message, lang: "en-EN" });
      // const user = resp as User;
      // if (user?.url) {
      //   setShowTwoFactor(true);
      // } else {
      navigate("/portfolio");
      relad()
      // }
    },
  });

  return { login, isLogin: isLoading };
};

type Props = {
  username: string;
  password: string;
  token: string;
};

export { useLogin };
