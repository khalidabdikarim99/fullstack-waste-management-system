import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

const Processing = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
  });

  const [items, setItems] = useState([
    {
      category: "",
      quantity: "",
      price: "",
      company_name: "",
      image_url: "",
      processed_date: "",
      notes: "",
    },
  ]);

  // Handle user info change
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle item change
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  // Add new item
  const addItem = () => {
    setItems([
      ...items,
      {
        category: "",
        quantity: "",
        price: "",
        company_name: "",
        image_url: "",
        processed_date: "",
        notes: "",
      },
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Validate Image URL
  const isValidUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image URLs
    for (let i = 0; i < items.length; i++) {
      if (items[i].image_url && !isValidUrl(items[i].image_url)) {
        alert(`Item ${i + 1} has an invalid image URL.`);
        return;
      }
    }

    try {
      const payload = {
        fullname: userData.fullname.trim(),
        email: userData.email.trim(),
        phone: userData.phone.trim(),
        location: userData.location.trim(),
        items: items.map((item) => ({
          category: item.category,
          quantity: parseFloat(item.quantity) || 0,
          price: parseFloat(item.price) || 0,
          company_name: item.company_name.trim(),
          image_url: item.image_url.trim(),
          processed_date: item.processed_date,
          notes: item.notes.trim(),
        })),
      };

      const response = await axios.post(`${API_URL}/recycler`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Data submitted successfully:", response.data);
      alert("Data submitted successfully!");

      // Reset form
      setUserData({ fullname: "", email: "", phone: "", location: "" });
      setItems([
        {
          category: "",
          quantity: "",
          price: "",
          company_name: "",
          image_url: "",
          processed_date: "",
          notes: "",
        },
      ]);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(
        error.response?.data?.error ||
          "Failed to submit data. Please try again."
      );
    }
  };

  // Expanded category options
  const categoryOptions = [
    "Plastic",
    "Paper",
    "Metal",
    "Electronics",
    "Organic",
    "Clothes",
    "Furniture",
    "Watches",
    "Glass",
    "Batteries",
    "Rubber",
    "Textiles",
    "Toys",
    "Appliances",
    "Cardboard",
    "Wood",
    "Cans",
    "Books",
    "Jewelry",
    "Miscellaneous",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Recycler Submission Form</h2>
      <form onSubmit={handleSubmit}>
        {/* User Info */}
        <div className="mb-6">
          {["fullname", "email", "phone", "location"].map((field, idx) => (
            <div key={field} className={idx > 0 ? "mt-3" : ""}>
              <label className="block mb-1 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={userData[field]}
                onChange={handleUserChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}
        </div>

        {/* Processed Items */}
        {items.map((item, index) => (
          <div key={index} className="mb-6 p-4 border rounded bg-white">
            <h3 className="font-semibold mb-3">Item {index + 1}</h3>

            {[
              { name: "category", type: "select", options: categoryOptions },
              { name: "quantity", type: "number" },
              { name: "price", type: "number" },
              { name: "company_name", type: "text" },
              { name: "image_url", type: "url", placeholder: "https://example.com/image.jpg" },
              { name: "processed_date", type: "date" },
              { name: "notes", type: "textarea" },
            ].map((field) => (
              <div key={field.name} className={field.name !== "category" ? "mt-3" : ""}>
                <label className="block mb-1 capitalize">
                  {field.name.replace("_", " ")}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={item[field.name]}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select {field.name}</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={item[field.name]}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={item[field.name]}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder={field.placeholder || ""}
                    className="w-full p-2 border rounded"
                    required={field.name !== "notes"}
                  />
                )}
              </div>
            ))}

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="mt-3 text-red-500 hover:underline"
              >
                Remove Item
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Add Item
        </button>

        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Processing;
