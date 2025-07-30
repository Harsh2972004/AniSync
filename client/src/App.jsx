import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Router";
import { BrowseProvider } from "./context/BrowseContext";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <BrowseProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </BrowseProvider>
  );
};

export default App;
