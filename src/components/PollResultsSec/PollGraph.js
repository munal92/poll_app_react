import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

const PollGraph = (props) => {
  const [graphData, setGraphData] = useState([{}]);

  useEffect(() => {
    if (props.apiStatus) {
      setGraphData(props.poll.answers);
    }
  }, [props]);

  let voteCalc = graphData.reduce(
    (totalAnswerCount, count) => totalAnswerCount + count.answer_count,
    0
  );

  const data = {
    labels: graphData.map((item) => item.poll_answer),
    datasets: [
      {
        data: graphData.map((item) => item.answer_count),
        backgroundColor: [
          "#5cb85c",
          "#FF6384",
          "#4BC0C0",
          "#FFCD56",
          "#36A2EB",
          "#292b2c",
        ],
        hoverBackgroundColor: [
          "#46a046",
          "#ff1a4b",
          "#2e8484",
          "#ffba1a",
          "#0b4a74",
          "#000000",
        ],
        //   backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        //   hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const NoData = {
    labels: ["Graph will get update after first vote"],
    datasets: [
      {
        data: [1],
        backgroundColor: ["#f0f0f0"],
        hoverBackgroundColor: ["#d3d3d3"],
      },
    ],
  };

  return (
    <div>
      {/* <h2>Answers Pie Chart</h2> */}
      {voteCalc === 0 ? (
        <Pie width={700} height={600} data={NoData} />
      ) : (
        <Pie width={700} height={600} data={data} />
      )}
    </div>
  );
};

export default PollGraph;
