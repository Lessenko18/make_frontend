import { useMemo, useState } from "react";
import {
  Apple,
  Mail,
  Lock,
  UserRound,
  Chrome,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/common/useToast";
import {
  loginUser,
  registerUser,
  requestPasswordReset,
} from "../../services/authService";
import {
  AuthCanvas,
  AuthContainer,
  AuthCard,
  Brand,
  Title,
  Subtitle,
  InputGroup,
  Field,
  Input,
  InlineAction,
  MainButton,
  Divider,
  SocialActions,
  SocialButton,
  PasswordToggle,
  FooterText,
  TextButton,
  LeftArtwork,
  PanelGlow,
} from "./authStyled";

const initialLogin = { email: "", password: "" };
const initialRegister = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialForgot = { email: "" };

function Auth() {
  const navigate = useNavigate();
  const toast = useToast();
  const [mode, setMode] = useState("login");
  const [login, setLogin] = useState(initialLogin);
  const [register, setRegister] = useState(initialRegister);
  const [forgot, setForgot] = useState(initialForgot);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] =
    useState(false);

  const pageText = useMemo(() => {
    if (mode === "register") {
      return {
        title: "Crie sua conta",
        subtitle: "Organize sua agenda e finanças em poucos passos.",
      };
    }

    if (mode === "forgot") {
      return {
        title: "Recuperar senha",
        subtitle: "Digite seu e-mail para receber o link de redefinição.",
      };
    }

    return {
      title: "Bem-vinda de Volta!",
      subtitle: "Gerencie sua beleza, um clique por vez.",
    };
  }, [mode]);

  const getApiErrorMessage = (error, fallback) => {
    if (error?.response?.status === 404) {
      return "Endpoint de autenticação não encontrado no backend.";
    }

    const data = error?.response?.data;
    if (typeof data === "string") {
      if (data.includes("<!DOCTYPE") || data.includes("<html")) return fallback;
      return data;
    }
    if (data?.message && typeof data.message === "string") return data.message;
    if (Array.isArray(data?.message) && data.message.length)
      return data.message[0];
    return fallback;
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!login.email || !login.password) return;

    try {
      setIsSubmitting(true);
      await loginUser({ email: login.email, password: login.password });
      toast.success(
        "Login realizado",
        "Você será redirecionada para o dashboard.",
      );
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        "Falha no login",
        getApiErrorMessage(
          error,
          "Verifique e-mail e senha e tente novamente.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (!register.name || !register.email || !register.password) return;
    if (register.password !== register.confirmPassword) {
      toast.error(
        "Senha inválida",
        "A confirmação de senha precisa ser igual.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({
        name: register.name,
        email: register.email,
        password: register.password,
      });

      toast.success(
        "Cadastro realizado",
        "Agora faça login para acessar o sistema.",
      );
      setLogin({ email: register.email, password: "" });
      setRegister(initialRegister);
      setMode("login");
    } catch (error) {
      toast.error(
        "Falha no cadastro",
        getApiErrorMessage(error, "Não foi possível criar sua conta agora."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = async (event) => {
    event.preventDefault();
    if (!forgot.email) return;

    try {
      setIsSubmitting(true);
      await requestPasswordReset({ email: forgot.email });
      toast.success(
        "Link enviado",
        "Se o e-mail existir, você receberá instruções de recuperação.",
      );
      setForgot(initialForgot);
      setMode("login");
    } catch (error) {
      toast.error(
        "Erro ao enviar e-mail",
        getApiErrorMessage(
          error,
          "Não foi possível solicitar recuperação de senha.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AuthCanvas>
        <AuthContainer>
          <LeftArtwork aria-hidden="true">
            <PanelGlow />
          </LeftArtwork>

          <AuthCard>
            <Brand>JM</Brand>
            <Title>{pageText.title}</Title>
            <Subtitle>{pageText.subtitle}</Subtitle>

            {mode === "login" && (
              <form onSubmit={handleLoginSubmit}>
                <InputGroup>
                  <Field>
                    <Mail size={16} />
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={login.email}
                      onChange={(event) =>
                        setLogin((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      autoComplete="email"
                      required
                    />
                  </Field>

                  <Field>
                    <Lock size={16} />
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Senha"
                      value={login.password}
                      onChange={(event) =>
                        setLogin((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                      autoComplete="current-password"
                      required
                    />
                    <PasswordToggle
                      type="button"
                      aria-label={
                        showLoginPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                    >
                      {showLoginPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </PasswordToggle>
                  </Field>

                  <InlineAction>
                    <TextButton type="button" onClick={() => setMode("forgot")}>
                      Esqueceu a senha?
                    </TextButton>
                  </InlineAction>
                </InputGroup>

                <MainButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </MainButton>

                {/* <Divider>
                  <span>ou entre com</span>
                </Divider>

                <SocialActions>
                  <SocialButton type="button" aria-label="Entrar com Google">
                    <Chrome size={17} />
                  </SocialButton>
                  <SocialButton type="button" aria-label="Entrar com Apple">
                    <Apple size={17} />
                  </SocialButton>
                </SocialActions>

                <FooterText>
                  Não tem uma conta?{" "}
                  <TextButton type="button" onClick={() => setMode("register")}>
                    Cadastre-se.
                  </TextButton>
                </FooterText> */}
              </form>
            )}

            {mode === "register" && (
              <form onSubmit={handleRegisterSubmit}>
                <InputGroup>
                  <Field>
                    <UserRound size={16} />
                    <Input
                      type="text"
                      placeholder="Nome completo"
                      value={register.name}
                      onChange={(event) =>
                        setRegister((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      autoComplete="name"
                      required
                    />
                  </Field>

                  <Field>
                    <Mail size={16} />
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={register.email}
                      onChange={(event) =>
                        setRegister((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      autoComplete="email"
                      required
                    />
                  </Field>

                  <Field>
                    <Lock size={16} />
                    <Input
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="Senha"
                      value={register.password}
                      onChange={(event) =>
                        setRegister((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                      autoComplete="new-password"
                      required
                    />
                    <PasswordToggle
                      type="button"
                      aria-label={
                        showRegisterPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={() => setShowRegisterPassword((prev) => !prev)}
                    >
                      {showRegisterPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </PasswordToggle>
                  </Field>

                  <Field>
                    <Lock size={16} />
                    <Input
                      type={showRegisterConfirmPassword ? "text" : "password"}
                      placeholder="Confirmar senha"
                      value={register.confirmPassword}
                      onChange={(event) =>
                        setRegister((prev) => ({
                          ...prev,
                          confirmPassword: event.target.value,
                        }))
                      }
                      autoComplete="new-password"
                      required
                    />
                    <PasswordToggle
                      type="button"
                      aria-label={
                        showRegisterConfirmPassword
                          ? "Ocultar confirmação de senha"
                          : "Mostrar confirmação de senha"
                      }
                      onClick={() =>
                        setShowRegisterConfirmPassword((prev) => !prev)
                      }
                    >
                      {showRegisterConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </PasswordToggle>
                  </Field>
                </InputGroup>

                <MainButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </MainButton>

                <FooterText>
                  Já possui conta?{" "}
                  <TextButton type="button" onClick={() => setMode("login")}>
                    Fazer login.
                  </TextButton>
                </FooterText>
              </form>
            )}

            {mode === "forgot" && (
              <form onSubmit={handleForgotSubmit}>
                <InputGroup>
                  <Field>
                    <Mail size={16} />
                    <Input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={forgot.email}
                      onChange={(event) =>
                        setForgot({ email: event.target.value })
                      }
                      autoComplete="email"
                      required
                    />
                  </Field>
                </InputGroup>

                <MainButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar link"}
                </MainButton>

                <InlineAction>
                  <TextButton type="button" onClick={() => setMode("login")}>
                    <ArrowLeft size={14} />
                    Voltar para o login
                  </TextButton>
                </InlineAction>
              </form>
            )}
          </AuthCard>
        </AuthContainer>
      </AuthCanvas>
      <toast.ToastContainer />
    </>
  );
}

export default Auth;
