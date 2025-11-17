import React, { useState } from "react";
import { serverClient } from "../../adapter/http/server.client";
import { useLoading } from "../../contexts/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useLoading();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    loading.showLoading();

    try {
      const response = await serverClient.post("auth/login", {
        email,
        password,
      });

      if (response?.redirect) {
        window.location.href = response.redirect;
        return;
      }
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e.message || "Erro ao fazer login";
      setError(message);
    } finally {
      loading.hideLoading();
    }
  }

  return (
    <div
      className="max-w-md mx-auto mt-12 rounded-xl shadow-lg p-6 transition-all"
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-semibold mb-1">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-input)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold mb-1">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-input)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Sign In
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full text-center mt-2 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold rounded-lg transition-colors"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center">
        <a
          href={serverClient.getUrl("/auth/google")}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#DB4437] hover:bg-[#c5372f] text-white font-semibold rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faGoogle} />
          Google
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
