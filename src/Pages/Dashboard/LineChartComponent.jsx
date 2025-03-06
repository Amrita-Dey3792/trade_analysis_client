import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = () => {
  const [selectedTradeCode, setSelectedTradeCode] = useState("SILVAPHL"); // Default trade code
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tradeCodes, setTradeCodes] = useState([]);

  // Fetch trade data when selectedTradeCode changes
  useEffect(() => {
    const fetchTradeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/trade-visualization/?trade_code=${selectedTradeCode}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trade data.");
        }
        const {trade_codes, aggregated_data} = await response.json();
        setFilteredData(Object.entries(aggregated_data).map(([date, values]) => ({
          date,
          ...values,
        })));
        setTradeCodes(trade_codes);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTradeData();
  }, [selectedTradeCode]);

  return (
    <div className="dashboard-container mx-3 my-8 md:m-8">
      <div className="flex flex-col gap-5 md:flex-row items-center justify-between mb-12">
        <h1 className="text-3xl">Trade Data Dashboard</h1>

        <div className="flex items-center gap-2">
          <label className="text-nowrap">Select Trade Code: </label>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setSelectedTradeCode(e.target.value)}
            value={selectedTradeCode}
          >
            {/* Update the select options dynamically based on available trade codes */}
            {tradeCodes.map((item, index) => (
              <option key={index} value={item.trade_code}>
                {item.trade_code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Line Chart (Close Price Trend) */}
          <section className="bg-white p-5 rounded-xl">
            <h2>Line Chart (Close Price Trend)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avg" // Using avg from the response
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </section>

          {/* Bar Chart (Volume) */}
          <section className="bg-white p-5 rounded-xl">
            <h2>Bar Chart (Volume)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#82ca9d" />
              </ComposedChart>
            </ResponsiveContainer>
          </section>

          {/* Multi-Axis Chart (Close Price & Volume) */}
          <section className="bg-white p-5 rounded-xl xl:col-span-2">
            <h2>Multi-Axis Chart (Close Price & Volume)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="avg" // Using avg from the response
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Bar yAxisId="right" dataKey="volume" fill="#82ca9d" />
              </ComposedChart>
            </ResponsiveContainer>
          </section>
        </div>
      ) : (
        !loading && <p>No data available for selected trade code</p>
      )}
    </div>
  );
};

export default LineChartComponent;
