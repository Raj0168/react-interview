import { useAuth } from "../../../context/AuthContext";

interface LoginProps {
  username: string;
}

export default function LoginButton({ username }: LoginProps) {
  const { user, login, logout } = useAuth();

  return user ? (
    <button onClick={logout}>Logout {user}</button>
  ) : (
    <button onClick={() => login(username)}>Login</button>
  );
}
