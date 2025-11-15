import React, { useState } from "react";
import { serverClient } from "../../adapter/http/server.client";
import { useLoading } from "../../contexts/loading";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const loading = useLoading();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    loading.showLoading();

    try {
      const response = await serverClient.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.redirect) {
        window.location.href = response.redirect;
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
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
      <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="font-semibold">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
              boxShadow: "none",
            }}
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
        </label>

        {error && (
          <p
            className="text-sm text-center rounded-lg p-2"
            style={{
              color: "var(--color-primary-hover)",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
            }}
          >
            {error}
          </p>
        )}

         <button
            type="submit"
            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold py-2 rounded-lg transition-colors"
          >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full text-center mt-2 px-4 py-2  bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold rounded-lg transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
