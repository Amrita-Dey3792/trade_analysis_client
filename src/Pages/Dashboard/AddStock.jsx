import React, { useState } from "react";
import StockForm from "../../Components/Shared/StockForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddStock = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (formData) => {
    setLoading(true);
    fetch("http://localhost:8000/stockdata/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Stock added successfully!", {
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
        toast.error("Error adding stock. Please try again.", {
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
      <StockForm onSubmit={onSubmit} loading={loading}/>
    </>
  );
};

export default AddStock;
