import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const LoadingView = ({ relad, timeOut }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (relad) {
      const timer = setTimeout(() => {
        navigate(relad);
      }, timeOut);

      // Limpia el temporizador cuando el componente se desmonte
      return () => clearTimeout(timer);
    }
  }, [relad]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <i
        className="pi pi-sun pi-spin text-secondary"
        style={{ fontSize: "5rem" }}
      />
    </div>
  );
};

type Props = {
  relad?: string ;
  timeOut?: number | 3000;
};

export { LoadingView };
