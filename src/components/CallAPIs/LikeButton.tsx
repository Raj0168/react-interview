import { useState } from "react";
import { SpinnerIcon, HeartIcon } from "../../styles/icons";

const API = "https://questions.greatfrontend.com/api/questions/like-button";

export default function LikeButton() {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState("");

  const handleLike = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ action: liked ? "unlike" : "like" }),
      });
      if (!response.ok) {
        setError(
          `Error during attempted ${
            liked ? "unlike" : "like"
          }. Please try again later`
        );
        return;
      }
      setLiked((prev) => !prev);
    } catch {
      setError("Error with like API.");
      console.error("Error with like API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleLike}
        style={{
          padding: "5px 10px",
          background: liked ? "tomato" : "",
          color: liked ? "#fff" : "",
          border: "2px solid tomato",
          borderRadius: "1rem",
          cursor: "pointer",
          transition: "0.3s ease",
        }}
      >
        <span style={{ display: "flex", gap: "5px" }}>
          {loading ? <SpinnerIcon /> : <HeartIcon />}
          {liked ? "Liked" : "Like"}
        </span>
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
