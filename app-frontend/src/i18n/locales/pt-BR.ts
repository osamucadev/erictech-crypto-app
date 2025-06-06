export default {
  login: {
    title: "Login",
    email: "Email",
    password: "Senha",
    submit: "Entrar",
    loading: "Carregando...",
    createAccount: "Criar nova conta",
    errors: {
      invalidCredentials: "Credenciais inválidas",
      loginError: "Erro ao fazer login",
    },
  },
  register: {
    title: "Criar Conta",
    name: "Nome Completo",
    email: "Email",
    password: "Senha (mín. 6 caracteres)",
    confirmPassword: "Confirmar Senha",
    submit: "Cadastrar",
    errors: {
      invalidEmail: "Email inválido",
      shortPassword: "A senha deve ter pelo menos 6 caracteres",
      passwordMismatch: "As senhas não coincidem",
      connectionError: "Erro de conexão. Por favor tente novamente.",
      registrationError: "Erro no cadastro",
    },
    success: "Cadastro realizado com sucesso!",
    loginPrompt: "Já tem uma conta?",
    loginLink: "Fazer Login",
  },
  dashboard:{
    noDescription: "Sem descrição.",
    editProfileButton: "Editar perfil"
  },
  editProfile: {
    title: "Editar Perfil",
    profileImage: "Foto de Perfil:",
    changeImage: "Alterar Imagem",
    selectImage: "Selecionar Imagem",
    name: "Nome:",
    email: "Email:",
    description: "Descrição:",
    cancel: "Cancelar",
    saveChanges: "Salvar Alterações",
    saving: "Salvando...",
    errors: {
      tokenNotFound: "Token não encontrado",
      fetchFailed: "Erro ao buscar dados do usuário",
      loadProfile: "Erro ao carregar perfil",
      imageTooLarge: "A imagem deve ter no máximo 5MB",
      updateFailed: "Erro ao atualizar perfil",
      unknown: "Erro desconhecido",
    },
    success: {
      updateSuccess: "Perfil atualizado com sucesso!",
    },
  },
  crypto: {
    details: {
      title: "Detalhes da Cripto",
      back: "Voltar para Home",
      price: "Preço Atual",
      marketCap: "Capitalização de Mercado",
      rank: "Ranking",
      supply: "Fornecimento Circulante",
      totalSupply: "Fornecimento Total",
      allTimeHigh: "Máximo Histórico",
      allTimeLow: "Mínimo Histórico",
      description: "Descrição",
      categories: "Categorias",
      links: "Links",
      homepage: "Site Oficial",
      blockchain: "Explorador de Blockchain",
      github: "Repositórios GitHub",
      reddit: "Reddit",
      lastUpdated: "Última Atualização",
    },
  },
  notFound: {
    title: "404 - Página não encontrada",
    message: "A página que você está procurando não existe.",
    backButton: "Voltar para a página inicial",
  },
  footer: {
    language: "Idioma:",
    english: "Inglês",
    portuguese: "Português",
    spanish: "Espanhol",
    logout: "Sair",
  },
};
