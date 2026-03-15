import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routing";
import AuthContextProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
