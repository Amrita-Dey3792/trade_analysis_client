import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DeleteConfModal from "../../Components/Shared/DeleteConfModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const StockData = () => {
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSeletedStock] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["stockdata", page],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/stockdata/?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      return response.json();
    },
    keepPreviousData: true,
  });

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/stockdata/${selectedStock.id}/`,
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
      setSeletedStock(null);
      document.getElementById("delete_conf_modal").close();
    }
  };

  if (isLoading) {
    return (
      <p className="mt-10 mx-auto">
        <span className="loading loading-spinner loading-sm"></span> Loading...
      </p>
    );
  }
  if (error) {
    return (
      <p className="mt-10 mx-auto text-red-500">
        Failed to load stock data. Please try again.
      </p>
    );
  }

  return (
    <section className="mx-3 my-8 md:m-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 font-medium">All Stocks</h2>
        <Link to="/add-new-stock" className="btn bg-blue-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Stock
        </Link>
      </div>
      <div className="divider"></div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
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
            {data?.results?.map((stock, index) => (
              <tr key={index}>
                <td>{stock.id}</td>
                <td>{stock.date}</td>
                <td>{stock.trade_code}</td>
                <td>{stock.high}</td>
                <td>{stock.low}</td>
                <td>{stock.open}</td>
                <td>{stock.close}</td>
                <td>{stock.volume}</td>
                <td className="flex gap-3">
                  <Link to={`/update-stock/${stock.id}`} className="btn bg-green-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => {
                      setSeletedStock(stock);
                      document.getElementById("delete_conf_modal").showModal();
                    }}
                    className="btn bg-red-500 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end gap-4 mt-10">
        <button
          className="btn bg-gray-200"
          disabled={!data?.previous}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="btn bg-blue-600 text-white"
          disabled={!data?.next}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      <DeleteConfModal onConfirm={handleConfirmDelete} loading={loading} />
    </section>
  );
};

export default StockData;
