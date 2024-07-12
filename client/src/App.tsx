import { SignUpPage } from "@/pages/sign-up";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import GuestLayout from "@/shared/ui/GuestLayout";

function App() {
  let authenticated = false;

  if (!authenticated)
    return (
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="register" element={<SignUpPage />} />
          <Route path="login" element={<SignUpPage />} />
          <Route path="" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="login" />} />
        </Route>
      </Routes>
    );

  if (authenticated)
    return (
      <Routes>
        <Route path="profile" element={<SignUpPage />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    );
}

export default App;
