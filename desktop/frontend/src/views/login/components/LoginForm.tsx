import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { InputField } from "../../../modules/commons";
import { UserLogin } from "../../../models";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, params: {
        sitekey: string;
        callback?: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
      }) => void;
      reset: (container: string | HTMLElement) => void;
    };
  }
}

const LoginForm = ({ setUsername, setPassword, setTurnstileToken }: Props) => {
  const [tokenValue, setTokenValue] = useState<string>("");
  const [type, setType] = useState("password");
  const { values } = useFormikContext<UserLogin>();

  const turnstileRef = useRef<HTMLDivElement>(null);
  const [widgetError, setWidgetError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  useEffect(() => {
    setUsername(values.username);
    setPassword(values.password);
  }, [values, setUsername, setPassword]);

  const handleType = () => {
    setType(prev => prev === "text" ? "password" : "text");
  };

  // ----------------
  useEffect(() => {
    let isMounted = true;

    const loadTurnstile = () => {
      if (!window.turnstile) {
        // Verificar si el script ya existe
        const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');

        if (!existingScript) {
          scriptRef.current = document.createElement("script");
          scriptRef.current.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
          scriptRef.current.async = true;
          scriptRef.current.defer = true;
          scriptRef.current.id = "cf-turnstile-script";

          scriptRef.current.onload = () => {
            if (isMounted) renderTurnstile();
          };

          document.body.appendChild(scriptRef.current);
        } else {
          if (isMounted && window.turnstile) renderTurnstile();
        }
      } else {
        if (isMounted) renderTurnstile();
      }
    };

    loadTurnstile();

    return () => {
      isMounted = false;
      // Limpieza más segura
      if (scriptRef.current && scriptRef.current.parentNode === document.body) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  const renderTurnstile = () => {
    if (!turnstileRef.current || !window.turnstile) {
      setWidgetError(true);
      return;
    }

    try {
      turnstileRef.current.innerHTML = "";

      window.turnstile.render(turnstileRef.current, {
        sitekey: "0x4AAAAAABHCstO-w5I1IjPF",
        callback: (token: string) => {
          setTurnstileToken(token);
          setTokenValue(token);
          setWidgetError(false);
        },
        "error-callback": () => {
          setUsername("");
          setPassword("");
          window.location.reload(); // ✅ Más seguro
          if (window.turnstile && turnstileRef.current) {
            window.turnstile.reset(turnstileRef.current); // ✅ Más seguro
          }

        },
        "expired-callback": () => {
          if (window.turnstile && turnstileRef.current) {
            window.turnstile.reset(turnstileRef.current);
          }
          setTurnstileToken("");
          setTokenValue("");
          setUsername("");
          setPassword("");
          window.location.reload(); // ✅ Más seguro
        }
      });
    } catch (error) {
      setWidgetError(true);
    }
  };

  return (
    <div>
      {tokenValue !== "" && (<div>
        <InputField
          field="username"
          label="Username"
          floatLabel
          inputClassName="mt-2 sticky"
          className='w-full'
        />
        <div className="flex w-full mt-5">
          <InputField
            field="password"
            label="Password"
            floatLabel
            type={type}
            inputClassName="mt-2 sticky"
            className="w-full"
          />
          <FontAwesomeIcon
            icon={type === "text" ? faEyeSlash : faEye}
            onClick={handleType}
            className="-ml-8 z-10 mt-7 cursor-pointer"
          />
        </div>
      </div>)}


      {/* Contenedor con ref */}
      <div
        ref={turnstileRef}
        style={{
          width: '100%',
          margin: '1rem 0',
          minHeight: '65px',
          position: 'relative'
        }}
      >
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            color: '#666',
            fontSize: '14px'
          }}>
            Loading security verification...
          </div>
        )}
        {widgetError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff8f8',
            color: '#d32f2f',
            fontSize: '14px'
          }}>
            Failed to load security check. Please refresh the page.
          </div>
        )}
      </div>
    </div>
  );
};

type Props = {
  setUsername: (c: string) => void;
  setPassword: (c: string) => void;
  setTurnstileToken: (c: string) => void;
};

export { LoginForm };