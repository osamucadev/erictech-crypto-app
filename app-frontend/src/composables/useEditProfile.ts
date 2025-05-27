import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export const useEditProfile = (apiBaseUrl: string) => {
  const router = useRouter();
  const loading = ref(false);
  const errorMessage = ref("");
  const successMessage = ref("");
  const previewImage = ref("");

  const form = ref({
    name: "",
    email: "",
    description: "",
    profileImage: "",
  });

  const userInitial = computed(() => {
    return form.value.name?.charAt(0).toUpperCase() || "U";
  });

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`${apiBaseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

      const data = await response.json();
      form.value = {
        name: data.name,
        email: data.email,
        description: data.description || "",
        profileImage: data.profileImage || "",
      };
    } catch (error) {
      errorMessage.value = "Erro ao carregar perfil";
    }
  };

  const handleSubmit = async () => {
    try {
      loading.value = true;
      errorMessage.value = "";
      successMessage.value = "";

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const formData = new FormData();
      formData.append("name", form.value.name);
      formData.append("email", form.value.email);
      formData.append("description", form.value.description);

      const fileInput = document.getElementById(
        "profileImage"
      ) as HTMLInputElement;
      if (fileInput.files?.[0]) {
        formData.append("profileImage", fileInput.files[0]);
      }

      const response = await fetch(`${apiBaseUrl}/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar perfil");
      }

      const data = await response.json();
      successMessage.value = "Perfil atualizado com sucesso!";

      form.value.profileImage = data.profileImage || form.value.profileImage;
      previewImage.value = "";

      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : "Erro desconhecido";
    } finally {
      loading.value = false;
    }
  };

  const handleImageChange = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      errorMessage.value = "A imagem deve ter no máximo 5MB";
      return;
    }
    previewImage.value = URL.createObjectURL(file);
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  onMounted(fetchUserData);

  return {
    form,
    loading,
    errorMessage,
    successMessage,
    previewImage,
    userInitial,
    handleSubmit,
    handleCancel,
    handleImageChange,
  };
};
