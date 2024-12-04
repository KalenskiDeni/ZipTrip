import { useNavigate } from "react-router-dom";

export default function ExploreCard({ post }) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/barcelona`);
  }

  return (
    <article className="explore-card" onClick={handleNavigate}>
      <img src={post.photo} alt={post.location} />
      <h6>{post.location}</h6>
    </article>
  );
}
