import { useState } from "react";
import { serverClient } from "../../adapter/http/server.client";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { useLoading } from "../../contexts/loading";

const MePage = () => {
  const { user } = useAuth();
  const { openModal } = useModal();

  return (
    <div
      className="max-w-4xl mx-auto flex flex-col gap-8 p-6 rounded-lg shadow-md"
      style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 border-gray-300 dark:border-gray-700">
        <button
          onClick={() =>
            openModal(<UpdateAvatar />, "Change Avatar")
          }
        >
          <img
            src={user?.avatar || "/avatar-placeholder.png"}
            alt={user?.name}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary"
            style={{ borderColor: "var(--primary)" }}
          />
        </button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold mb-1">
            {user?.name || "Usuário"}
          </h1>
          <p className="text-lg text-muted" style={{ color: "var(--muted)" }}>
            {user?.email}
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-4 md:gap-6">
        <div className="p-4 bg-[var(--input-bg)] rounded-lg shadow-sm">
          <h2 className="font-semibold text-xl mb-2">Detalhes do Perfil</h2>
          <p>
            Nome: <span className="font-normal">{user?.name}</span>
          </p>
          <p>
            Email: <span className="font-normal">{user?.email}</span>
          </p>
        </div>
      </section>

      <div className="flex justify-end">
        <a
          href={serverClient.getUrl("/auth/logout")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-white font-semibold rounded-lg transition-colors"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState("");
  const loading = useLoading();
  const [error, setError] = useState<string | null>(null);
  const { closeModal } = useModal();
  const { refreshUser } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    loading.showLoading();

    try {
      const response = await serverClient.put("api/me/avatar", {
        avatar,
      });

      if (response?.redirect) {
        window.location.href = response.redirect;
        return;
      }
      closeModal();
      await refreshUser();
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e.message || "Erro ao atualizar avatar";
      setError(message);
    } finally {
      loading.hideLoading();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}
      <label className="flex flex-col">
        <span className="text-sm font-semibold mb-1">Avatar URL</span>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
          className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-input)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
          placeholder="https://example.com/avatar.jpg"
        />
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition"
      >
        Update Avatar
      </button>
    </form>
  );
};

export default MePage;
