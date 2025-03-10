import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MultiAxisChartComponent = ({ chartData }) => {
  console.log(chartData);
  return (
    <section className="bg-white shadow-md p-5 rounded-xl xl:col-span-2">
      <h2 className="text-center mb-2">
        Multi-Axis Chart (Close Price & Volume)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#2ecc71" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="close" 
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Bar yAxisId="right" dataKey="volume" fill="#2ecc71" />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
};

export default MultiAxisChartComponent;
