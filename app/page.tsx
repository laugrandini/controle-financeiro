
'use client';
import { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const defaultData = months.map((month) => ({ month, total: 0, meta: 0 }));

export default function Page() {
  const [data, setData] = useState(defaultData);

  const updateValue = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = parseFloat(value) || 0;
    setData(newData);
  };

  const totalGeral = data.reduce((acc, item) => acc + item.total, 0);
  const metaGeral = data.reduce((acc, item) => acc + item.meta, 0);

  return (
    <div className="grid gap-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Controle Financeiro Anual</h1>

      {data.map((item, index) => (
        <div key={item.month} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 border p-4 rounded-xl">
          <div className="font-semibold">{item.month}</div>
          <input
            type="number"
            className="p-2 border rounded"
            placeholder="Total Gasto"
            value={item.total}
            onChange={(e) => updateValue(index, "total", e.target.value)}
          />
          <input
            type="number"
            className="p-2 border rounded"
            placeholder="Meta"
            value={item.meta}
            onChange={(e) => updateValue(index, "meta", e.target.value)}
          />
          <div className={item.total > item.meta ? "text-red-600" : "text-green-600"}>
            {item.total - item.meta >= 0 ? `+${(item.total - item.meta).toFixed(2)}` : "OK"}
          </div>
        </div>
      ))}

      <div className="border rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">Resumo Gráfico</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="total" stroke="#FF6F61" name="Total Gasto" />
            <Line type="monotone" dataKey="meta" stroke="#9bc886" name="Meta" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="border rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">Distribuição Anual</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#9bc886" : "#FF6F61"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="border rounded-xl p-4 grid gap-2">
        <div className="font-semibold">Total Anual Gasto: R$ {totalGeral.toFixed(2)}</div>
        <div className="font-semibold">Meta Anual: R$ {metaGeral.toFixed(2)}</div>
        <div className={totalGeral > metaGeral ? "text-red-600" : "text-green-600"}>
          Diferença: R$ {(totalGeral - metaGeral).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
