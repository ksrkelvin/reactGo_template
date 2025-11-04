import { serverClient } from "../../adapter/http/server.client";
import { useAuth } from "../../contexts/auth";

const MePage = () => {
  const { user } = useAuth();

  console.log("MePage user:", user);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Me!
          </h1>
          <p className="text-gray-600">Email: {user?.email}</p>
          <p className="text-gray-600">Name: {user?.name}</p>
        </div>
        <a
          href={serverClient.getUrl("/auth/logout")}
          className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default MePage;
