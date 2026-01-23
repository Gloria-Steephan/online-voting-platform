import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    // ❌ No token → back to login
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", token);

    // ✅ Fetch authenticated user (CORRECT endpoint)
    api
      .get("/protected/profile")
      .then((res) => {
        // Store user object only
        localStorage.setItem("user", JSON.stringify(res.data));

        // Redirect to dashboard
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        // Token invalid / expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Signing you in…
    </div>
  );
}
