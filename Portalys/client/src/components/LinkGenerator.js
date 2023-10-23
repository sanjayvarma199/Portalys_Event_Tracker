import React, { useState } from "react";
import axios from "axios";
import "../components/styling/LinkGenerator.css"; 

const LinkGenerator = () => {
  const [linkIdentifier, setLinkIdentifier] = useState("");
  const [trackingLink, setTrackingLink] = useState("");
  const [error, setError] = useState(null);

  const generateLink = () => {
    axios
      .post("http://localhost:8080/api/generate-link", { linkIdentifier })
      .then((response) => {
        if (response.data.error) {
          setError("Link identifier already exists. Please choose a different one.");
          setTrackingLink(""); 
        } else {
          setError(null);
          setTrackingLink(response.data.trackingLink);
        }
      })
      .catch((error) => {
        setError("An error occurred while generating the tracking link.");
        setTrackingLink("");
      });
  };

  return (
    <div className="LinkGenerator">
      <div className="input-container">
        <input
          type="text"
          placeholder="Link Identifier"
          value={linkIdentifier}
          onChange={(e) => setLinkIdentifier(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={generateLink}>Generate Tracking Link</button>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {trackingLink && (
        <a className="tracking-link" href={trackingLink} target="_blank" rel="noopener noreferrer">
          Tracking Link: {trackingLink}
        </a>
      )}
    </div>
  );
};

export default LinkGenerator;
