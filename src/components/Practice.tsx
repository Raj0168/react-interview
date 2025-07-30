import React from "react";
import useFetch from "./hooks/useFetch";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const { data, loading, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || data.length === 0) return <p>No posts found.</p>;

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
