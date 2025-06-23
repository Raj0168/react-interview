import { useState } from "react";
import type { PhoneEntry } from "../../types/Interfaces";

interface FormProps {
  onAdd: (form: PhoneEntry) => void;
}

export default function PhoneBookForm({ onAdd }: FormProps) {
  const [form, setForm] = useState<PhoneEntry>({
    id: Date.now(),
    firstName: "John",
    lastName: "Doe",
    contact: 98776543210,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      id: Date.now(),
      firstName: "John",
      lastName: "Doe",
      contact: 98776543210,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ gap: "1rem", display: "flex" }}>
      <label>First Name</label>
      <input
        name="firstName"
        type="text"
        value={form.firstName}
        onChange={handleChange}
      />
      <label>Last Name</label>
      <input
        name="lastName"
        type="text"
        value={form.lastName}
        onChange={handleChange}
      />
      <label>Contact</label>
      <input
        name="contact"
        type="text"
        value={form.contact}
        onChange={handleChange}
      />
      <input type="submit" value="Add User" />
    </form>
  );
}
