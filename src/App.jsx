import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailBimbel from "./pages/DetailBimbel";
import Navbar from "./components/Navbar";
import BimbelSaya from "./pages/BimbelSaya";
import Pendaftaran from "./pages/Pendaftaran";
import AdminDashboard from "./pages/AdminDashbord";
import KelolaBimbel from "./pages/KelolaBimbel";
import { BimbelkuProvider } from "./context/BimbelkuContext";
// router untuk semua halaman 
function AppContent() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<DetailBimbel />} />
        <Route path="/bimbel-saya" element={<BimbelSaya />} />
        <Route path="/pendaftaran" element={<Pendaftaran />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/kelola-bimbel" element={<KelolaBimbel />} />
      </Routes>
    </div>
  );
}
function App() {
  return (
    <BimbelkuProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </BimbelkuProvider>
  );
}
export default App;
