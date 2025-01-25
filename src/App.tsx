import { Header } from "./header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="flex flex-col text-zinc-100 bg-zinc-800 h-screen">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<h1>Sign up</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
