import { LineAxisOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios";

export default function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts/timeline/625446d86709b32b0aa49d29");
      setPosts(res.data)
    };
    fetchPosts();
  }, []); //a dependencia (colchetes) indicam que será renderizado apenas uma vez quando executar o feed

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map(p => (
          <Post key={p.id} post={p} />

        ))}
      </div>
    </div>
  )
}
