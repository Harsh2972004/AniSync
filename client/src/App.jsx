import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Router";
import { BrowseProvider } from "./context/BrowseContext";

const App = () => {
  return (
    <BrowseProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </BrowseProvider>
  );
};

export default App;
