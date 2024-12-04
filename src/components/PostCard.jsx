import React from "react";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";
import heartIcon from '../assets/icons/heart.svg';
import commentIcon from '../assets/icons/comment.svg';
import messageIcon from '../assets/icons/paper-plane.svg';


export default function PostCard({ post }) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/posts/${post.id}`);
  }

  return (
    <article className="post-card" onClick={handleNavigate}>
      <UserAvatar uid={post.uid} />
      <h6 className="location">{post.location}</h6>
      <h6 className="time">{post.time}</h6>
      <p className="caption">{post.caption}</p>
      <img src={post.image} alt={post.caption} />
      <h6 className="hashtags">{post.hashtags}</h6>

      <div className="reaction-container">
  
  <div className="reaction-group-left">
    <button className="reaction-button">
      <img src={heartIcon} alt="Like" />
      <p>Like</p>
    </button>

    <button className="reaction-button">
      <img src={commentIcon} alt="Comment" />
      <p>Comment</p>
    </button>
  </div>

  
  <div className="reaction-group-right">
    <button className="reaction-button">
      <img src={messageIcon} alt="Direct Message" />
      <p>Direct Message</p>
    </button>
  </div>
</div>

    </article>
  );
}
