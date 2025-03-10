import React from "react";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartComponent = ({ chartData }) => {
  console.log(chartData);
  return (
    <section className="bg-white p-5 rounded-xl shadow-md">
      <h2 className="text-center mb-2">Line Chart (close)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="close" 
            stroke="#8884d8"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
};

export default LineChartComponent;
