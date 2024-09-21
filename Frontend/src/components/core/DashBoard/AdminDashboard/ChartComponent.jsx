import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ type, data, labelKey, dataKey }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      // If a chart instance already exists, destroy it before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: type,
        data: {
          labels: data.map((item) => item[labelKey]),
          datasets: [
            {
              label:
                type === "bar" && dataKey === "revenue"
                  ? "Revenue"
                  : type === "bar" && dataKey === "sales"
                  ? "Sales"
                  : "Number of Students",
              data: data.map((item) => item[dataKey]),
              backgroundColor:
                type === "bar"
                  ? "rgba(75, 192, 192, 0.2)"
                  : "rgba(255, 99, 132, 0.2)",
              borderColor:
                type === "bar"
                  ? "rgba(75, 192, 192, 1)"
                  : "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
      });
    }

    // Cleanup function to destroy the chart instance when the component unmounts or data changes
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [type, data, labelKey, dataKey]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
