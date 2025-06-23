import { useState } from "react";
import MessageBox from "./MessageBox";

export default function LoginFormValidator() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = (): boolean => {
    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("Email must include @");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 chatacters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (validateForm()) {
      setSuccessMessage("Login Successful!");
      setEmail("");
      setPassword("");
    }
  };

  const closeMessage = () => {
    setSuccessMessage("");
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p>{emailError}</p>}
        <label htmlFor="email">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p>{passwordError}</p>}
        <button type="submit">Sign In</button>
      </form>
      <MessageBox message={successMessage} onClose={closeMessage} />
    </div>
  );
}
