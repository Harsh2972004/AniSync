import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Router";
import { BrowseProvider } from "./context/BrowseContext";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { UserListProvider } from "./context/UserListContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BrowseProvider>
          <UserListProvider>
            <ScrollToTop />
            <AppRouter />
          </UserListProvider>
        </BrowseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
