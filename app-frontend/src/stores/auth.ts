import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const token = ref<string | null>(localStorage.getItem("token"));
  const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

  const isAuthenticated = computed(
    () => !!token.value || !!localStorage.getItem("token")
  );

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_USERS_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      token.value = data.token;
      user.value = {
        id: data._id,
        name: data.name,
        email: data.email,
        profileImage: data.profileImage,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user.value));

      router.push({ name: "dashboard" });

      return true;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push({ name: "home" });
  };

  return { token, user, isAuthenticated, login, logout };
});
