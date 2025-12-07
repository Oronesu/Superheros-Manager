import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HeroDetails from "./pages/HeroDetails";
import AddHero from "./pages/AddHero";
import EditHero from "./pages/EditHero";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* 🔹 Navbar toujours visible */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
              <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/heroes/:id"
          element={
            <ProtectedRoute>
              <Layout>
              <HeroDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/heroes/add"
          element={
            <ProtectedRoute>
              <Layout>
              <AddHero />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/heroes/:id/edit"
          element={
            <ProtectedRoute>
              <Layout>
              <EditHero />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
