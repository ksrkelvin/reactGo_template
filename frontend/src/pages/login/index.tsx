import React from 'react';
import { serverClient } from '../../adapter/http/server.client';

function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h1>
      <form method="POST" action="/login" className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-gray-700 font-semibold">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-gray-700 font-semibold">Password</span>
          <input
            type="password"
            name="password"
            required
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">Login with</p>
        <a
          href={serverClient.getUrl('/auth/google')}
          className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
            <path
              fill="#FFFFFF"
              d="M44.5 20H24v8.5h11.9C34.5 33.5 30.5 37 24 37c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.8 0 7.2 1.5 9.7 4l6.8-6.8C36.7 3.1 30.7 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.2 0 22.3-8.9 23.8-20.5H44.5z"
            />
          </svg>
          Google
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
