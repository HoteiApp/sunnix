import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { post } from "../api";

const useLoginFA = (setError: (error: Error) => void) => {
  const navigate = useNavigate();

  const LogIn = async ({ username, password, code }: Props) => {
    const response = await post(
      "2fa/auth",
      JSON.stringify({
        username: username,
        password: password,
        code: code,
      })
    );

    const resp = await response.json();
    if (resp.OK === false) {
      throw new Error("Unauthorized", {
        cause: { name: "401", message: "Unauthorized" },
      });
    }
    return resp;
  };
  const { mutate: loginFA, isLoading } = useMutation(LogIn, {
    onError: (error: Error) => {
      setError(error);
    },
    onSuccess: () => {
      navigate("/portfolio");
    },
  });

  return { loginFA, isLoginFA: isLoading };
};

type Props = {
  username: string;
  password: string;
  code: string;
};

export { useLoginFA };
