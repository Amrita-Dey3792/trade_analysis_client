import { useState, useEffect } from "react";
import MultiAxisChartComponent from "./MultiAxisChartComponent";
import BarChartComponent from "./BarChartComponent";
import LineChartComponent from "./LineChartComponent";

const DashboradOveriew = () => {
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
        const { trade_codes, aggregated_data } = await response.json();
        setFilteredData(
          Object.entries(aggregated_data).map(([date, values]) => ({
            date,
            ...values,
          }))
        );
        setTradeCodes(trade_codes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTradeData();
  }, [selectedTradeCode]);

  if (loading) {
    return (
      <div
        className="w-fit gap-2 flex items-center mx-auto mt-10 pointer-events-none  rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        disabled
      >
        <div
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-fit gap-2 flex items-center mx-auto mt-10 pointer-events-none  rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        disabled
      >
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="dashboard-container mx-3 my-8 md:m-8">
      <div className="flex flex-col gap-5 md:flex-row items-center justify-between mb-12">
        <h1 className="text-2xl">Dashboard</h1>

        <div className="flex items-center gap-2">
          <label className="text-nowrap">Select Trade Code: </label>
          <select
            className="select select-bordered w-full max-w-xs focus:outline-none"
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

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Line Chart (Close Price Trend) */}
          <LineChartComponent filteredData={filteredData} />

          {/* Bar Chart (Volume) */}
          <BarChartComponent filteredData={filteredData} />

          {/* Multi-Axis Chart (Close Price & Volume) */}
          <MultiAxisChartComponent filteredData={filteredData} />
        </div>
      ) : (
        !loading && <p>No data available for selected trade code</p>
      )}
    </div>
  );
};

export default DashboradOveriew;
