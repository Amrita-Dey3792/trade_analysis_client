import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function StockForm({ initialData, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    date: "",
    trade_code: "",
    high: "",
    low: "",
    open: "",
    close: "",
    volume: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date || "",
        trade_code: initialData.trade_code || "",
        high: initialData.high || "",
        low: initialData.low || "",
        open: initialData.open || "",
        close: initialData.close || "",
        volume: initialData.volume || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.trade_code) newErrors.trade_code = "Trade code is required";
    if (!formData.high || isNaN(formData.high))
      newErrors.high = "High must be a number";
    if (!formData.low || isNaN(formData.low))
      newErrors.low = "Low must be a number";
    if (!formData.open || isNaN(formData.open))
      newErrors.open = "Open must be a number";
    if (!formData.close || isNaN(formData.close))
      newErrors.close = "Close must be a number";
    if (!formData.volume || isNaN(formData.volume))
      newErrors.volume = "Volume must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <section className="mx-3 my-8 md:m-8">
      <h2 className="text-center text-2xl font-medium text-gray-700">
        {initialData ? "Update Stock Data" : "Create Stock Data"}
      </h2>
      <div className="divider"></div>
      <form onSubmit={handleSubmit} className="p-8 rounded-lg bg-white">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="mb-4 gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`input input-bordered w-full font-medium ${
                errors.date ? "input-error" : ""
              }`}
              placeholder="YYYY-MM-DD"
            />
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          <div className="mb-4 gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trade Code
            </label>
            <input
              type="text"
              name="trade_code"
              value={formData.trade_code}
              onChange={handleChange}
              className={`input input-bordered w-full font-medium ${
                errors.trade_code ? "input-error" : ""
              }`}
              placeholder="Enter trade code"
            />
            {errors.trade_code && (
              <p className="text-xs text-red-500">{errors.trade_code}</p>
            )}
          </div>

          <div className="mb-4 gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              High
            </label>
            <input
              type="text"
              name="high"
              value={formData.high}
              onChange={handleChange}
              className={`input input-bordered w-full font-medium ${
                errors.high ? "input-error" : ""
              }`}
              placeholder="Enter high value"
            />
            {errors.high && (
              <p className="text-xs text-red-500">{errors.high}</p>
            )}
          </div>

          <div className="mb-4 gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Low
            </label>
            <input
              type="text"
              name="low"
              value={formData.low}
              onChange={handleChange}
              className={`input input-bordered w-full font-medium ${
                errors.low ? "input-error" : ""
              }`}
              placeholder="Enter low value"
            />
            {errors.low && <p className="text-xs text-red-500">{errors.low}</p>}
          </div>

          <div className="mb-4 gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Open
            </label>
            <input
              type="text"
              name="open"
              value={formData.open}
              onChange={handleChange}
              className={`input input-bordered w-full font-medium ${
                errors.open ? "input-error" : ""
              }`}
              placeholder="Enter open value"
            />
            {errors.open && (
              <p className="text-xs text-red-500">{errors.open}</p>
            )}
          </div>

          <div className="mb-4 gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Close
            </label>
            <input
              type="text"
              name="close"
              value={formData.close}
              onChange={handleChange}
              className={`input input-bordered w-full font-medium ${
                errors.close ? "input-error" : ""
              }`}
              placeholder="Enter close value"
            />
            {errors.close && (
              <p className="text-xs text-red-500">{errors.close}</p>
            )}
          </div>

          <div className="mb-4 gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volume
            </label>
            <input
              type="text"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className={`input input-bordered w-full font-medium ${
                errors.volume ? "input-error" : ""
              }`}
              placeholder="Enter volume"
            />
            {errors.volume && (
              <p className="text-xs text-red-500">{errors.volume}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-2">
          <Link to="/stock-data" className="btn btn-error text-white">
            Cancel
          </Link>
          <button type="submit" className="btn bg-blue-500 text-white">
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default StockForm;
