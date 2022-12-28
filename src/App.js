import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { lazy } from "react";
const HomePage = lazy(() => import ("./Pages/HomePage"));

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<HomePage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
