import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = "http://localhost:5000"; // Your backend URL

const Inventory = () => {
  const [recyclers, setRecyclers] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecyclers();
  }, []);

  const fetchRecyclers = async () => {
    try {
      const res = await axios.get(`${API_URL}/recycler`);
      setRecyclers(res.data);
      calculateCategoryStats(res.data);
    } catch (err) {
      console.error("Error fetching recyclers:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateCategoryStats = (data) => {
    const stats = {};
    data.forEach((recycler) => {
      recycler.items?.forEach((item) => {
        if (stats[item.category]) {
          stats[item.category] += parseFloat(item.quantity) || 0;
        } else {
          stats[item.category] = parseFloat(item.quantity) || 0;
        }
      });
    });
    setCategoryStats(stats);
  };

  if (loading) return <p className="text-center mt-6">Loading stats...</p>;

  const categories = Object.keys(categoryStats);
  const quantities = Object.values(categoryStats);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Total Quantity Recycled",
        data: quantities,
        backgroundColor: "rgba(34,197,94,0.7)", // Tailwind green-500
        borderColor: "rgba(21,128,61,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Recycled Items Statistics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((cat) => (
          <div
            key={cat}
            className="p-4 bg-white rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2 capitalize">{cat}</h2>
            <p className="text-3xl font-bold text-green-600">{categoryStats[cat]}</p>
            <p className="text-gray-500 mt-1">Total items recycled</p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Recycled Quantities by Category</h2>
        {categories.length === 0 ? (
          <p>No data available</p>
        ) : (
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
        )}
      </div>
    </div>
  );
};

export default Inventory;
