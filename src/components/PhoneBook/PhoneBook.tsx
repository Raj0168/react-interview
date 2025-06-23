import { useState } from "react";
import type { PhoneEntry } from "../../types/Interfaces";
import PhoneBookForm from "./PhoneBookForm";
import InformationTable from "./InformationTable";

const contacts: PhoneEntry[] = [
  { id: 1, firstName: "Bruce", lastName: "Wayne", contact: 3421398 },
  { id: 2, firstName: "Clark", lastName: "Kent", contact: 2347242 },
  { id: 3, firstName: "Barry", lastName: "Allen", contact: 4293482 },
  { id: 4, firstName: "Diana", lastName: "Prince", contact: 4239483 },
];

export default function PhoneBook() {
  const [entries, setEntries] = useState<PhoneEntry[]>(contacts);

  const addEntry = (entry: PhoneEntry) => {
    const updatedEntries = [...entries, entry];
    updatedEntries.sort((a, b) => a.lastName.localeCompare(b.lastName));
    setEntries(updatedEntries);
  };

  return (
    <section className="center-all">
      <PhoneBookForm onAdd={addEntry} />
      <InformationTable entries={entries} />
    </section>
  );
}
