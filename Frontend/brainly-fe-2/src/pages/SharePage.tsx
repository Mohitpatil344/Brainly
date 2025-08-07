import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function SharePage() {
  const { shareLink } = useParams();
  const [data, setData] = useState({ username: "", content: [] });

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setData(response.data);
      } catch (error) {
        alert("Invalid or expired link");
      }
    }
    fetchSharedBrain();
  }, [shareLink]);

  return (
    <div>
      <h1>Shared Brain of {data.username}</h1>
      <ul>
        {data.content.map(({ title, type, link }, index) => (
          <li key={index}>
            <strong>{title}</strong> - {type} - <a href={link}>Open</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
