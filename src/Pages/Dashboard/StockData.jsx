import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DeleteConfModal from "../../Components/Shared/DeleteConfModal";
import { toast } from "react-toastify";

const StockData = () => {
  const [loading, setLoading] = useState(false);
  const [seletedStockId, setSeletedStockId] = useState(null);
  const [page, setPage] = useState(1);

  const {
    data: stocks,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["stockdata", page],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/trades/?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      return response.json();
    },
    keepPreviousData: true,
  });

  console.log(stocks);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/trades/${seletedStockId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        toast.success("Stock deleted successfully.", {
          position: "top-right",
          theme: "colored",
          hideProgressBar: true,
        });
        refetch();
        setSeletedStockId(null);
      } else {
        throw new Error("Failed to delete stock");
      }
    } catch (error) {
      toast.error("Failed to delete stock. Please try again.", {
        position: "top-right",
        theme: "colored",
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
      document.getElementById("delete_conf_modal").close();
    }
  };

  if (isLoading) {
    return (
      <div className="w-fit gap-2 flex items-center mx-auto mt-10 text-white">
        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-fit gap-2 flex items-center mx-auto mt-10 text-white">
        <span>Failed to load stock data. Please try again.</span>
      </div>
    );
  }

  return (
    <div className="mx-3 my-8 md:m-8">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl text-gray-900">Stock Data</h2>
        <button className="btn btn-primary text-white">Add New</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/12">#</th>
              <th className="w-1/12">DATE</th>
              <th className="w-1/12">TRADE CODE</th>
              <th className="w-1/12">HIGH</th>
              <th className="w-1/12">LOW</th>
              <th className="w-1/12">OPEN</th>
              <th className="w-1/12">CLOSE</th>
              <th className="w-1/12">UPDATE</th>
              <th className="w-1/12">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {stocks?.map(
              (
                { id, date, trade_code, high, low, open, close, volume },
                index
              ) => (
                <tr key={index}>
                  <td>{id}</td>
                  <td>{date}</td>
                  <td>{trade_code}</td>
                  <td>{high}</td>
                  <td>{low}</td>
                  <td>{open}</td>
                  <td>{close}</td>
                  <td>{volume}</td>
                  <td className="flex gap-3">
                    <button className="btn btn-info text-white">Edit</button>
                    <button
                      onClick={() => {
                        setSeletedStockId(id);
                        document
                          .getElementById("delete_conf_modal")
                          .showModal();
                      }}
                      className="btn btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className="btn btn-primary"
            disabled={page === 1} // Disable if page is 1
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            className="btn btn-primary"
            disabled={!stocks || stocks.length === 0} // Disable if no data on next page
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      <DeleteConfModal onConfirm={handleConfirmDelete} loading={loading} />
    </div>
  );
};

export default StockData;
