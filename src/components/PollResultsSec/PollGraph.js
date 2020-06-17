import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

const PollGraph = (props) => {
  const [graphData, setGraphData] = useState([{}]);

  useEffect(() => {
    if (props.apiStatus) {
      setGraphData(props.poll.answers);
    }
  }, [props]);

  const data = {
    labels: graphData.map((item) => item.poll_answer),
    datasets: [
      {
        data: graphData.map((item) => item.answer_count),
        backgroundColor: [
          "#209cee",
          "#00d1b2",
          "#ffdd57",
          "#3273dc",
          "#23d160",
          "#ff3860",
        ],
        hoverBackgroundColor: [
          "#209cee",
          "#23d160",
          "#ffdd57",
          "#3273dc",
          "#00d1b2",
          "#ff3860",
        ],
        //   backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        //   hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <h2>Answers Pie Chart</h2>
      <Pie width={700} height={600} data={data} />
    </div>
  );
};

export default PollGraph;
