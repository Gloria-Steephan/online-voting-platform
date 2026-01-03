import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    // If token is missing, redirect to login
    if (!token) {
      navigate("/login");
      return;
    }

    // Save token
    localStorage.setItem("token", token);

    // Fetch authenticated user profile
    api
      .get("/protected/profile")
      .then((res) => {
        // ✅ Store ONLY the user object (important fix)
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirect safely to dashboard
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        // Token invalid or error → force login
        localStorage.clear();
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Signing you in with Google…
    </div>
  );
}
