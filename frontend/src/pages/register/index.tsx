import React, { useState } from "react";
import { serverClient } from "../../adapter/http/server.client";
import { useLoading } from "../../contexts/loading";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useLoading();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    loading.showLoading();
    setError(null);

    try {
      const response = await serverClient.post("/auth/register", {
        email,
        password,
        name,
      });
      if (response.redirect) {
        window.location.href = response.redirect;
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      loading.hideLoading();
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Register
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-gray-700 font-semibold">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-gray-700 font-semibold">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-gray-700 font-semibold">Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
