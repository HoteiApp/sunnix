import React, { Suspense } from "react";
import { classNames } from "primereact/utils";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from 'primereact/api';

import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import "primeicons/primeicons.css";
import "./styles/prime-react-custom-theme.css";
import "./styles/index.css";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "react-query";

import { LoadingView } from "./views/components";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./modules/auth";
import { ConfigProvider } from 'antd';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// const TRANSITIONS = {
//   toggleable: {
//     timeout: 500,
//     classNames: {
//       enter: 'max-h-0',
//       enterActive: '!max-h-40 overflow-hidden transition-all duration-500 ease-in-out',
//       exit: 'max-h-40',
//       exitActive: '!max-h-0 overflow-hidden transition-all duration-500 ease-in'
//     }
//   },
// };

const value = {
  button: {
    root: { className: 'bg-blue-400 hover:bg-yellow-400 cursor-pointer text-white pl-2 pr-2 border-round border-none flex gap-2' },
  },
  InputText: {
    root: { className: 'border-gray-400 p-3' },
  },
  Selectbutton: {
    root: ({ props }) => ({
      className: classNames({ 'opacity-60 select-none pointer-events-none cursor-default': props.disabled })
    }),
    button: ({ context }) => ({
      className: classNames(
        'inline-flex cursor-pointer select-none items-center align-bottom text-center overflow-hidden relative',
        'px-2 py-2',
        'transition duration-200 border border-r-0',
        'first:rounded-l-md first:rounded-tr-none first:rounded-br-none last:border-r last:rounded-tl-none last:rounded-bl-none last:rounded-r-md',
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        {
          'bg-white text-gray-700 border-gray-300 hover:bg-gray-50': !context.selected,
          'bg-orange-500 border-orange-500 text-white hover:bg-orange-600': context.selected,
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled
        }
      )
    }),
    label: 'font-bold'
  },
  InputTextarea: {
    root: { className: 'p-3' }
  },
  organizationchart: {
    table: {
      className: classNames('mx-auto my-0 border-spacing-0 border-separate')
    },
    cell: {
      className: classNames('text-center align-top py-0 px-3')
    },
    node: {
      className: classNames(
        'relative inline-block bg-white border border-gray-300 text-gray-600 p-5',
        // 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' // Dark Mode.
      )
    },
    linecell: 'text-center align-top py-0 px-3',
    linedown: {
      className: classNames(
        'mx-auto my-0 w-px h-[20px] bg-gray-300',
        // 'dark:bg-blue-900/40' //Dark Mode
      )
    },
    lineleft: ({ context }) => ({
      className: classNames(
        'text-center align-top py-0 px-3 rounded-none border-r border-gray-300',
        // 'dark:border-blue-900/40', //Dark Mode
        {
          'border-t': context.lineTop
        }
      )
    }),
    lineright: ({ context }) => ({
      className: classNames(
        'text-center align-top py-0 px-3 rounded-none',
        // 'dark:border-blue-900/40', //Dark Mode
        {
          'border-t border-gray-300': context.lineTop
        }
      )
    }),
    nodecell: 'text-center align-top py-0 px-3',
    nodetoggler: {
      className: classNames(
        'absolute bottom-[-0.75rem] left-2/4 -ml-3 w-6 h-6 bg-inherit text-inherit rounded-full z-2 cursor-pointer no-underline select-none',
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]' // Focus styles
      )
    },
    nodetogglericon: 'relative inline-block w-4 h-4'
  },
  panelmenu: {
    header: {
      className: classNames(
        'p-0 m-0',
      )
    },
    headercontent: {
      className: classNames(
        'bg-blue-100 hover:bg-secondary'
      )
    },
    headeraction: {
      className: classNames('flex items-center cursor-pointer relative')
    },
    menuContent: {
      className: classNames('p-0')
    },
    menu: {
      className: classNames('bg-blue-100 pl-2')
    },
    menuitem: {
      className: classNames(
        'bg-gray-100 hover:bg-secondary',
      )
    },
    action: {
      className: classNames('flex items-center cursor-pointer bg-gray-100 relative overflow-hidden')
    }

  }
};




root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          <Suspense fallback={<LoadingView timeOut={1000} relad="portfolio"/>}>
            <AuthProvider>
              <PrimeReactProvider value={{ pt: value, ripple: true }} >
                <ConfigProvider theme={{
                  components: {
                    Calendar: {
                      colorPrimary: "#FE9902",
                      itemActiveBg: "#f9eac5",
                    }
                  }
                }}>
                  <App />
                </ConfigProvider>
              </PrimeReactProvider>
            </AuthProvider>
          </Suspense>
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals.
reportWebVitals();
