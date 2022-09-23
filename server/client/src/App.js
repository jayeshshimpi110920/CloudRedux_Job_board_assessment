import Header from "./Components/Layout/Header/Header";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import theme from "./Utils/theme";
import Routes from "./Routes/Routes";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  // const isAuth = useSelector((state) => state.login.isAuth);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
          {/* {isAuth ? <Header /> : <></>} */}
          <Header/>
          <Routes />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
