import { useState, useEffect } from "react";
import type { JobDetails } from "../../types/Interfaces";
import Loader from "../Loader/Loader";

const API_JOBIS = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const JOB_DETAILS = "https://hacker-news.firebaseio.com/v0/item/";
const PAGE_SIZE = 5;

export default function JobBoard() {
  const message = "Hacker News Jobs Board";
  const [jobIds, setJobIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState<JobDetails[]>([]);
  const [jobLoading, setJobLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await fetch(API_JOBIS);
        const data = await res.json();
        setJobIDs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (jobIds.length === 0) return;
      setJobLoading(true);
      try {
        const jobArr = jobIds.slice(page * PAGE_SIZE, PAGE_SIZE * (page + 1));
        const promiseArr = jobArr.map((arr) => {
          return `${JOB_DETAILS}${arr}.json`;
        });
        const res = await Promise.all(
          promiseArr.map((url) => fetch(url).then((res) => res.json()))
        );
        setJobDetails((prev) => [...prev, ...res]);
      } catch (e) {
        console.error("error loading job details", e);
      } finally {
        setJobLoading(false);
      }
    };

    fetchDetails();
  }, [jobIds, page]);

  const handlePage = () => {
    const totalPages = Math.ceil(jobIds.length / PAGE_SIZE);
    if (page >= totalPages - 1) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>{message}</h2>
      {loading ? (
        <Loader/>
      ) : (
        jobDetails.map((job, index) => (
          <div
            key={index}
            style={{
              background: "#333",
              padding: "10px",
              marginBottom: "10px",
              boxShadow: "1px 1px 5px #333",
              borderRadius: "5px",
            }}
          >
            <a
              style={{
                fontWeight: "600",
                textDecoration: "none",
              }}
              href={job.url ?? "/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.title}
            </a>
            <p style={{ fontSize: "12px" }}>
              By {job.by} . {new Date(job.time * 1000).toLocaleString()}
            </p>
          </div>
        ))
      )}
      <button
        style={{
          color: "#fff",
          background: "#eb9534",
          padding: "8px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handlePage}
      >
        {jobLoading ? "Loading..." : "Load More Jobs"}
      </button>
    </div>
  );
}
