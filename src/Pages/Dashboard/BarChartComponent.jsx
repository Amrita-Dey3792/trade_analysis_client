import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartComponent = ({ chartData }) => {
  return (
    <section className="bg-white p-5 rounded-xl shadow-md">
      <h2 className="text-center mb-2">Bar Chart (Volume)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" fill="#2ecc71" />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
};

export default BarChartComponent;
