import MainRoutes from "./Routes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <MainRoutes/>
    </BrowserRouter>
  );
}
