import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouteMatch } from "react-router-dom";

const PollResult = () => {
  const { itemID } = useParams();
  const { path, url } = useRouteMatch();
  const [poll, setPoll] = useState([]);

  console.log("url ", url, "\npath ", path);

  useEffect(() => {
    try {
      axios
        .get(`https://poll--app.herokuapp.com/api/poll/${itemID}`)
        .then((res) => {
          console.log("ilk data", res.data);
          setPoll(res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      throw err;
    }
  }, []);

  return (
    <div>
      <p>ID: {poll.id}</p>
      <p>Poll Link: {poll.poll_link}</p>
      <p>Poll question: {poll.poll_question}</p>
      <p>IP : {poll.location_ip}</p>
    </div>
  );
};

export default PollResult;
