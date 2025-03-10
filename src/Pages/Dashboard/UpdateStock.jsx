import { useLoaderData, useNavigate } from "react-router-dom";
import StockForm from "../../Components/Shared/StockForm";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateStock = () => {
  const stock = useLoaderData();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    setLoading(true);
    fetch(`http://localhost:8000/stockdata/${stock.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
            console.log(data);
          toast.success("Stock updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            theme: "colored",
          });
          navigate("/stock-data");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Error updating stock. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
        });
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <>
      <StockForm initialData={stock} onSubmit={onSubmit} loading={loading} />
    </>
  );
};

export default UpdateStock;
