import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Base URL of your Flask backend
const API_URL = "http://127.0.0.1:5000"; // Updated to match Flask backend

const ProductApproval = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStore();
  }, []);

  const fetchAdminStore = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin-store`);
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching admin store:", err);
      Swal.fire("Error", "Failed to fetch admin store data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (itemId) => {
    try {
      await axios.put(`${API_URL}/admin-store/approve_item/${itemId}`);
      // Update state locally to mark approved
      setStores((prevStores) =>
        prevStores.map((store) => ({
          ...store,
          items: store.items.map((item) =>
            item.id === itemId ? { ...item, approved: true } : item
          ),
        }))
      );
      Swal.fire("Success", "Item approved successfully!", "success");
    } catch (err) {
      console.error("Error approving item:", err);
      Swal.fire("Error", "Failed to approve item.", "error");
    }
  };

  const handleDelete = async (itemId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(`${API_URL}/admin-store/delete_item/${itemId}`);
        // Remove item from state to disappear from UI
        setStores((prevStores) =>
          prevStores
            .map((store) => ({
              ...store,
              items: store.items.filter((item) => item.id !== itemId),
            }))
            .filter((store) => store.items.length > 0) // remove empty stores
        );
        Swal.fire("Deleted!", "Item has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting item:", err);
        Swal.fire("Error", "Failed to delete item.", "error");
      }
    }
  };

  if (loading) return <p className="text-center mt-6">Loading products...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.length === 0 && <p className="col-span-full text-center">No products found.</p>}

      {stores.map((store) =>
        store.items.map((item) => (
          <div
            key={item.id}
            className="border rounded shadow p-4 flex flex-col transition hover:shadow-lg bg-white"
          >
            <h2 className="font-bold text-lg mb-2">{store.fullname}</h2>
            <p className="text-sm"><strong>Email:</strong> {store.email}</p>
            <p className="text-sm"><strong>Phone:</strong> {store.phone}</p>
            <p className="text-sm"><strong>Location:</strong> {store.location}</p>

            <hr className="my-2" />

            <h3 className="font-semibold text-md mb-1">{item.category}</h3>
            <p className="text-sm"><strong>Quantity:</strong> {item.quantity}</p>
            <p className="text-sm"><strong>Price:</strong> ${item.price}</p>
            <p className="text-sm"><strong>Company:</strong> {item.company_name}</p>
            <p className="text-sm"><strong>Processed Date:</strong> {new Date(item.processed_date).toLocaleDateString()}</p>
            <p className="text-sm"><strong>Notes:</strong> {item.notes || "N/A"}</p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.category}
                className="w-full h-40 object-contain mt-2 rounded"
              />
            )}

            <div className="mt-3 flex gap-2">
              {item.approved ? (
                <span className="flex-1 py-1 rounded text-white bg-green-600 text-center font-semibold">
                  Ready
                </span>
              ) : (
                <>
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="flex-1 py-1 rounded text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductApproval;
