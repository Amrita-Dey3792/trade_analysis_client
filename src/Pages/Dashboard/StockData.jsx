import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DeleteConfModal from "../../Components/Shared/DeleteConfModal";
import { toast } from "react-toastify";

const StockData = () => {
  const [loading, setLoading] = useState(false);
  const [seletedStockId, setSeletedStockId] = useState(null);

  const {
    data: stocks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stockdata"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/trades/");
      return response.json();
    },
  });

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
      if (response.status == 204) {
        toast.success("Stock deleted successfully.", {
          position: "top-right",
          theme: "colored",
          hideProgressBar: true,
        });
        console.log("Stock deleted successfully.");
        refetch();
        setSeletedStockId(null);
        setLoading(false);
        document.getElementById("delete_conf_modal").close();
      }
    } catch (error) {
      console.error("Error deleting stock: ", error);
      setLoading(false);
      toast.error("Failed to delete stock. Please try again.", {
        position: "top-right",
        theme: "colored",
        hideProgressBar: true,
      });
      document.getElementById("delete_conf_modal").close();
    }
  };

  return (
    <div className="mx-3 my-8 md:m-8">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl text-gray-900">Stock Data</h2>
        <button className="btn btn-primary text-white">
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
          Add New
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Date</th>
              <th>Trade Code</th>
              <th>High</th>
              <th>Low</th>
              <th>Open</th>
              <th>Close</th>
              <th>Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks?.map(
              (
                { id, date, trade_code, high, low, open, close, volume },
                index
              ) => {
                return (
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
                      <button className="btn btn-info text-white">
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
                      </button>
                      <button
                        onClick={() => {
                          setSeletedStockId(id);
                          document
                            .getElementById("delete_conf_modal")
                            .showModal();
                        }}
                        className="btn btn-error text-white"
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
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <DeleteConfModal onConfirm={handleConfirmDelete} loading={loading} />
    </div>
  );
};

export default StockData;
