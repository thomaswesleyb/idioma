import './App.css'
import {Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar.tsx";
import IdiomsPage from "./pages/IdiomsPage.tsx";
import IdiomDetailPage from "./pages/IdiomDetailPage.tsx";
import SubmitPage from "./pages/SubmitPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

function App() {

  return (
      <>
          <Navbar />
          <Routes>
              <Route path={"/idioms"} element={<IdiomsPage />} />
              <Route path={"/idioms/:id"} element={<IdiomDetailPage />} />
              <Route path={"/submit"} element={<SubmitPage />} />
              <Route path={"/login"} element={<LoginPage />} />
          </Routes>
      </>
  )
}

export default App
