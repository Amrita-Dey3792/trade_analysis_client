import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LineChartComponent from "./LineChartComponent";
import BarChartComponent from "./BarChartComponent";
import MultiAxisChartComponent from "./MultiAxisChartComponent";

const DashboradOveriew = () => {
  const [tradeCode, setTradeCode] = useState("");

  {/*Fetch unique trade codes from the server*/}
  const {
    data: tradeCodes,
    isLoading: isTradeCodesLoading,
    error: tradeCodesError,
  } = useQuery({
    queryKey: ["unique-trade-codes"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/stockdata/unique-trade-codes/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      return response.json();
    },
  });

  {/*Fetch char data from the server based on tradecode*/}
  const {
    data: chartData,
    isLoading: isChartDataLoading,
    error: chartDataError,
  } = useQuery({
    queryKey: ["filteredStockData", tradeCode],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/stockdata/chart_data/?trade_code=${tradeCode}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (tradeCodes) {
      setTradeCode(tradeCodes[0]);
    }
  }, [tradeCodes]);
  
  if (isChartDataLoading || isTradeCodesLoading) {
    return (
      <p className="mt-10 mx-auto">
        <span className="loading loading-spinner loading-sm"></span> Loading...
      </p>
    );
  }

  if (tradeCodesError || chartDataError) {
    return (
      <p className="mt-10 mx-auto text-red-500">
        Failed to load data. Please try again.
      </p>
    );
  }

  return (
    <section className="dashboard-container mx-3 my-8 md:m-8">
      <div className="flex flex-col gap-5 md:flex-row items-center justify-between mb-5">
        <h1 className="text-2xl font-medium">Dashboard</h1>

        <div className="flex items-center gap-2">
          <label className="text-nowrap">Select Trade Code: </label>
          <select
            value={tradeCode}
            onChange={(e) => setTradeCode(e.target.value)}
            className="select select-bordered w-full max-w-xs focus:outline-none"
          >
            {tradeCodes?.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 gap-8">
        {/* For Line Chart */}
        <LineChartComponent chartData={chartData} />
        {/* For Bar Chart */}
        <BarChartComponent chartData={chartData} />
        {/* For Multi-Axis Chart */}
        <MultiAxisChartComponent chartData={chartData} />
      </div>
    </section>
  );
};

export default DashboradOveriew;
