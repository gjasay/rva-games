import { Header } from "./header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { MyProfile } from "./pages/MyProfile";
import { UploadGame } from "./pages/UploadGame";

function App() {
  return (
    <div className="flex flex-col text-zinc-100 bg-zinc-900 h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Home />} />
          <Route path="/forum" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/upload-game" element={<UploadGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
