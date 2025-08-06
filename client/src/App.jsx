import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Router";
import { BrowseProvider } from "./context/BrowseContext";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BrowseProvider>
          <ScrollToTop />
          <AppRouter />
        </BrowseProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
