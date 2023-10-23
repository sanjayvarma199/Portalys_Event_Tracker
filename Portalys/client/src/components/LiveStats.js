// LiveStats.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/styling/LiveStats.css";

const LiveStats = () => {
  const [clicks, setClicks] = useState(0);
  const [trackingLinks, setTrackingLinks] = useState([]);

  const fetchClickCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tracking-links");
      const totalClicks = response.data.reduce((total, link) => total + link.clickCount, 0);
      setClicks(totalClicks);
      setTrackingLinks(response.data);
    } catch (error) {
      console.error("Error fetching click count and tracking links:", error);
    }
  };

  useEffect(() => {
    fetchClickCount();
    const intervalId = setInterval(fetchClickCount, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleDeleteLink = async (linkId) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete-link/${linkId}`);
      fetchClickCount();
    } catch (error) {
      console.error("Error deleting the tracking link:", error);
    }
  };

  return (
    <div className="LiveStats">
      <h2>Live Statistics</h2>
      <p>Clicks: {clicks}</p>
      <ul>
        {trackingLinks.map((link) => (
          <li key={link._id} className="tracking-link">
            <div className="link-container">
              <a href={link.trackingLink} target="_blank" rel="noopener noreferrer" className="link-text">
                Link: {link.trackingLink}
              </a>
            </div>
            <div className="clicks-container">
              <div className="clicks-text">Clicks: {link.clickCount}</div>
              <div className="delete-button" onClick={() => handleDeleteLink(link._id)}>
                <button>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveStats;
