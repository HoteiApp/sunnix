import { ToastContainer } from "react-toastify";

import { LoginRoute } from "./Route";

function App() {
  return (
    <div className="h-screen">
      <LoginRoute />
      <ToastContainer
        autoClose={10000}
        theme={"light"}
        position={"bottom-left"}
      />
    </div>
  );
}

export default App;
