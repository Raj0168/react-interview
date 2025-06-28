import { useState, useEffect } from "react";
import users from "../../data/users";
import type { Users } from "../../types/Interfaces";

const pageSizes = [5, 10, 20];
export default function PaginationTable() {
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [pagination, setPagination] = useState<number[]>([]);

  useEffect(() => {
    const count = Math.ceil(users.length / pageSize);
    let arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(i);
    }
    setPagination(arr);
  }, [pageSize]);

  useEffect(() => {
    const startPage = (page - 1) * pageSize;
    const endPage = startPage + pageSize;
    setFilteredUsers(users.slice(startPage, endPage));
  }, [page, pageSize]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span
        style={{
          marginBottom: "1rem",
          fontSize: "14px",
        }}
      >
        <label
          style={{
            paddingRight: "1rem",
          }}
          htmlFor="pageSize"
        >
          Page Size
        </label>
        <select value={pageSize} onChange={handlePageSizeChange}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </span>
      <table style={{ width: "90%" }}>
        <thead>
          <tr>
            {[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Age", key: "age" },
              { label: "Occupation", key: "occupation" },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section
        style={{
          display: "flex",
          marginTop: "1rem",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        {pagination &&
          pagination.map((p) => (
            <button
              style={{
                background: page === p ? "tomato" : "#000",
              }}
              key={p}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        <button
          disabled={page === Math.ceil(users.length / pageSize)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </section>
    </div>
  );
}
