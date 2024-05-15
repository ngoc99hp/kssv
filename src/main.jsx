import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer} from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      refetchOnMount: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </React.StrictMode>
  </QueryClientProvider>
);
