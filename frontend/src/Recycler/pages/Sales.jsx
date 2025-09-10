import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

const Sales = () => {
  const [recyclers, setRecyclers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecycler, setEditingRecycler] = useState(null);
  const [modalRecycler, setModalRecycler] = useState(null); // For modal
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    items: [],
  });

  useEffect(() => {
    fetchRecyclers();
  }, []);

  const fetchRecyclers = async () => {
    try {
      const res = await axios.get(`${API_URL}/recycler`);
      setRecyclers(res.data);
    } catch (err) {
      console.error("Error fetching recycler data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recyclerId) => {
    if (!window.confirm("Are you sure you want to delete this recycler?")) return;
    try {
      await axios.delete(`${API_URL}/recycler/${recyclerId}`);
      setRecyclers(recyclers.filter((r) => r.id !== recyclerId));
    } catch (err) {
      console.error("Error deleting recycler:", err);
    }
  };

  const openEdit = (recycler) => {
    setEditingRecycler(recycler);
    setFormData({
      fullname: recycler.fullname,
      email: recycler.email,
      phone: recycler.phone,
      location: recycler.location,
      items: recycler.items.map((item) => ({ ...item })),
    });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { category: "", quantity: "", price: "", company_name: "", processed_date: "", notes: "", image_url: "" },
      ],
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingRecycler) return;

    try {
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        replace_items: true,
        items: formData.items.map((item) => ({
          id: item.id,
          category: item.category,
          quantity: parseFloat(item.quantity) || 0,
          price: parseFloat(item.price) || 0,
          company_name: item.company_name,
          processed_date: item.processed_date,
          notes: item.notes,
          image_url: item.image_url,
        })),
      };

      await axios.put(`${API_URL}/recycler/${editingRecycler.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Recycler updated successfully!");
      setEditingRecycler(null);
      fetchRecyclers();
    } catch (err) {
      console.error("Error updating recycler:", err);
      alert("Failed to update recycler.");
    }
  };

  // --- Updated: Send recycler data to admin store ---
  const postToAdmin = async (recycler) => {
    try {
      const payload = {
        recycler_id: recycler.id,
        fullname: recycler.fullname,
        email: recycler.email,
        phone: recycler.phone,
        location: recycler.location,
        items: recycler.items.map((item) => ({
          category: item.category,
          quantity: parseFloat(item.quantity) || 0,
          price: parseFloat(item.price) || 0,
          company_name: item.company_name,
          processed_date: item.processed_date,
          notes: item.notes,
          image_url: item.image_url,
        })),
      };

      await axios.post(`${API_URL}/admin-store`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Recycler posted to admin successfully!");
      setModalRecycler(null);
    } catch (err) {
      console.error("Error posting to admin:", err);
      alert("Failed to post to admin.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading recyclers...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {editingRecycler ? (
        <div className="p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Edit Recycler: {editingRecycler.fullname}</h2>
          <form onSubmit={handleEditSubmit}>
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {["fullname", "email", "phone", "location"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 capitalize">{field.replace("_", " ")}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleUserChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Items */}
            {formData.items.map((item, idx) => (
              <div key={idx} className="mb-4 p-3 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2 text-sm">Item {idx + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["category", "quantity", "price", "company_name", "processed_date", "notes", "image_url"].map((field) => (
                    <div key={field}>
                      <label className="block mb-1 capitalize text-sm">{field.replace("_", " ")}</label>
                      {field === "notes" ? (
                        <textarea
                          name={field}
                          value={item[field]}
                          onChange={(e) => handleItemChange(idx, e)}
                          className="w-full p-2 border rounded text-sm"
                        />
                      ) : (
                        <input
                          type={field === "quantity" || field === "price" ? "number" : field === "processed_date" ? "date" : "text"}
                          name={field}
                          value={item[field]}
                          onChange={(e) => handleItemChange(idx, e)}
                          className="w-full p-2 border rounded text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.category}
                    className="w-full h-40 object-contain mt-2 rounded"
                  />
                )}
                {formData.items.length > 1 && (
                  <button type="button" onClick={() => removeItem(idx)} className="mt-2 text-red-500 text-sm hover:underline">
                    Remove Item
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addItem} className="mb-3 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
              + Add Item
            </button>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Save Changes
              </button>
              <button type="button" onClick={() => setEditingRecycler(null)} className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recyclers.length === 0 && <p className="col-span-full text-center">No recyclers found.</p>}

          {recyclers.map((recycler) => (
            <div
              key={recycler.id}
              className="border rounded shadow p-3 bg-white flex flex-col cursor-pointer hover:shadow-lg transition"
              onClick={() => setModalRecycler(recycler)}
            >
              <h2 className="font-bold text-lg mb-1">{recycler.fullname}</h2>
              <p className="text-sm"><strong>Email:</strong> {recycler.email}</p>
              <p className="text-sm"><strong>Phone:</strong> {recycler.phone}</p>
              <p className="text-sm"><strong>Location:</strong> {recycler.location}</p>

              <h3 className="font-semibold mt-3 mb-1 text-sm">Processed Items:</h3>
              {recycler.items && recycler.items.length > 0 ? (
                recycler.items.map((item) => (
                  <div key={item.id} className="border rounded p-2 mb-2">
                    <p className="text-sm"><strong>Category:</strong> {item.category}</p>
                    <p className="text-sm"><strong>Quantity:</strong> {item.quantity}</p>
                    {item.image_url && (
                      <img src={item.image_url} alt={item.category} className="w-full h-40 object-contain mt-1 rounded" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm">No items processed.</p>
              )}

              {/* Keep Edit/Delete buttons */}
              <div className="mt-auto flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); openEdit(recycler); }} className="flex-1 bg-yellow-400 text-white py-1 rounded hover:bg-yellow-500 text-sm transition">
                  Edit
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(recycler.id); }} className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalRecycler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto pt-10">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative shadow-lg">
            <button
              onClick={() => setModalRecycler(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">{modalRecycler.fullname}</h2>
            <p className="text-sm"><strong>Email:</strong> {modalRecycler.email}</p>
            <p className="text-sm"><strong>Phone:</strong> {modalRecycler.phone}</p>
            <p className="text-sm"><strong>Location:</strong> {modalRecycler.location}</p>

            <h3 className="font-semibold mt-4 mb-2 text-sm">Processed Items:</h3>
            {modalRecycler.items.map((item) => (
              <div key={item.id} className="border rounded p-2 mb-2">
                <p className="text-sm"><strong>Category:</strong> {item.category}</p>
                <p className="text-sm"><strong>Quantity:</strong> {item.quantity}</p>
                <p className="text-sm"><strong>Price:</strong> ${item.price}</p>
                <p className="text-sm"><strong>Company:</strong> {item.company_name}</p>
                <p className="text-sm"><strong>Processed Date:</strong> {new Date(item.processed_date).toLocaleDateString()}</p>
                <p className="text-sm"><strong>Notes:</strong> {item.notes || "N/A"}</p>
                {item.image_url && (
                  <img src={item.image_url} alt={item.category} className="w-full h-40 object-contain mt-1 rounded" />
                )}
              </div>
            ))}

            <button
              onClick={() => postToAdmin(modalRecycler)}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Post to Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
