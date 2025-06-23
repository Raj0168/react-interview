import type { PhoneEntry } from "../../types/Interfaces";

interface TableProps {
  entries: PhoneEntry[];
}

export default function InformationTable({ entries }: TableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry: PhoneEntry) => (
          <tr key={entry.id}>
            <td>{entry.firstName}</td>
            <td>{entry.lastName}</td>
            <td>{entry.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
