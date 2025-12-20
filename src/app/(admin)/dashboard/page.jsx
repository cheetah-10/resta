'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-2 rounded-md">
        <p className="text-lg text-yellow-400">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm text-yellow-400">
            {p.dataKey}: <span className="ml-2">${p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardCharts = () => {
  const [productSales, setProductSales] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/product");
        setProductSales(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-12">
      {/* Area Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={productSales} margin={{ right: 30 }}>
          <XAxis dataKey="name" stroke="#ffbb15" />
          <YAxis stroke="#ffbb15" />
          <CartesianGrid strokeDasharray="5 5" stroke="#ffeb99" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#ffbb15"
            fill="#ffe58f"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={productSales} margin={{ right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffeb99" />
          <XAxis dataKey="name" stroke="#ffbb15" />
          <YAxis stroke="#ffbb15" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#ffbb15" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="text-center relative w-full min-h-screen bg-black/80 py-8 relative -top-25">
      <p className="text-yellow-400 text-4xl font-black mb-8">Hello Admin</p>
      <DashboardCharts />
    </div>
  );
}
