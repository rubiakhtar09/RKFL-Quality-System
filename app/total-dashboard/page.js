"use client";
import "./total-dashboard.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


import { useState } from "react";

import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  ComposedChart,
  LabelList,
} from "recharts";

export default function TotalDashboard() {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showFilter, setShowFilter] = useState(false);

const [selectedPeriod, setSelectedPeriod] =
  useState("current-month");

const [selectedItem, setSelectedItem] =
  useState("");

const [selectedHeat, setSelectedHeat] =
  useState("");
  const itemList = [
  "Steering Gear Box",
  "Adapter Narrow Jaw",
  "RA 109 Carrier",
  "Differential Cover",
  "Eco Dummy Hub",
];

const heatList = [
  "HT24001",
  "HT24002",
  "HT24003",
  "HT24004",
  "HT24005",
];

const [fromDate, setFromDate] =
  useState("");

const [toDate, setToDate] =
  useState("");

  const paretoData = [
  { defect: "Sand Drop", ton: 1.70, cumulative: 20.4 },
  { defect: "Mould Crush", ton: 1.48, cumulative: 38.3 },
  { defect: "Shakeout", ton: 1.10, cumulative: 50.8 },
  { defect: "Short Pour", ton: 0.95, cumulative: 62.3 },
  { defect: "Blow Hole", ton: 0.88, cumulative: 72.8 },
  { defect: "Depression", ton: 0.58, cumulative: 79.9 },
  { defect: "Mould Broken", ton: 0.57, cumulative: 86.8 },
  { defect: "Low Metallurgy", ton: 0.55, cumulative: 93.3 },
  { defect: "Degating", ton: 0.32, cumulative: 97.1 },
  { defect: "Sand Inclusion", ton: 0.24, cumulative: 100 },
];

const paretoColors = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f43f5e",
];

const topRejectedQtyData = [
  {
    type: "Inhouse",
    item: "Steering Gear Box Mtg Bkt_3305",
    partNumber: "5039 4670 3305",
    inspectedQty: 1492,
    rejectedQty: 82,
    rejectedTon: 1.85,
    rejectedTonPercent: "5.50%",
  },
  {
    type: "Inhouse",
    item: "Adapter Narrow Jaw Class E-S9",
    partNumber: "WD-89067-S9",
    inspectedQty: 846,
    rejectedQty: 71,
    rejectedTon: 0.99,
    rejectedTonPercent: "8.39%",
  },
  {
    type: "Customer",
    item: "Eco Dummy Hub_Rear-5508",
    partNumber: "2736 3960 5508",
    inspectedQty: 5000,
    rejectedQty: 50,
    rejectedTon: 1.47,
    rejectedTonPercent: "1.00%",
  },
];

  const itemWiseData = [
  { name: "Steering Gear Box", value: 82 },
  { name: "Adapter Narrow Jaw", value: 71 },
  { name: "Eco Dummy Hub", value: 50 },
  { name: "RA 109 Carrier", value: 41 },
  { name: "Differential Cover", value: 24 },
];

const pieColors = [
  "#2563eb",
  "#16a34a",
  "#f97316",
  "#9333ea",
  "#ef4444",
];

  const qualityData = [
  { name: "OK", value: 15980 },
  { name: "Reject", value: 360 },
];

const COLORS = ["#16a34a", "#ef4444"];

const inhouseSummary = [
  { name: "OK", value: 11000 },
  { name: "Reject", value: 250 },
];

const machiningSummary = [
  { name: "OK", value: 4950 },
  { name: "Reject", value: 50 },
];
const breakdownRows = [
[
"Steering Gear box Mtg Bkt_3305",
"5039 4670 3305",
"Sand drop",
"26D1025",
"1",
"rubina",
"12 Apr 2026",
"General",
"Stage 1",
],
[
"Steering Gear box Mtg Bkt_3305",
"5039 4670 3305",
"Micro cut",
"26D1025",
"1",
"rubina",
"12 Apr 2026",
"General",
"Stage 1",
],
[
"Steering Gear box Mtg Bkt_3305",
"5039 4670 3305",
"Short pour",
"26D1028",
"2",
"rubina",
"12 Apr 2026",
"General",
"Stage 1",
],
];

const downloadExcel = () => {

  const excelData = topRejectedQtyData.map((row) => ({
    Type: row.type,
    Item: row.item,
    PartNumber: row.partNumber,
    InspectedQty: row.inspectedQty,
    RejectedQty: row.rejectedQty,
    RejectedTon: row.rejectedTon,
    RejectedTonPercent: row.rejectedTonPercent,
  }));

  const worksheet =
    XLSX.utils.json_to_sheet(excelData);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Total Rejection"
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(
    fileData,
    "Total_Rejection_Report.xlsx"
  );
};

  return (
    
    <div className="dashboard-container">
      {/* Header */}
      <div className="topHeader">

  <div className="headerLeft">

    <button
      className="headerIconBtn"
      onClick={() =>
        window.location.href="/"
      }
    >
      🏠
    </button>

    <button
      className="headerIconBtn"
      onClick={() =>
        window.location.href="/dashboard-selection"
      }
    >
      ⬅️
    </button>

  </div>

  <div className="headerCenter">

    <h1>TOTAL REJECTION</h1>

    <p>
      INHOUSE + MACHINING REJECTION
    </p>

  </div>

</div>

      {/* Buttons */}
      <div
  className="dashboard-actions"
  style={{ position: "relative" }}
>
  <button
  onClick={downloadExcel}
>
  Download Excel
</button>

  <button
    onClick={() =>
      setShowFilter(!showFilter)
    }
  >
    Filter
  </button>

  <button
    onClick={() => {
      setSelectedItem("open");
      setSelectedHeat("");
      setShowFilter(false);
    }}
  >
    Item Wise
  </button>

  <button
    onClick={() => {
      setSelectedHeat("open");
      setSelectedItem("");
      setShowFilter(false);
    }}
  >
    Heat Wise
  </button>

  <button
    onClick={() => {
      setShowFilter(false);
      setSelectedPeriod("current-month");
      setSelectedItem("");
      setSelectedHeat("");
      setFromDate("");
      setToDate("");
    }}
  >
    Clear Filter
  </button>

  {selectedItem === "open" && (
    <div className="itemModal">
      <h3>Select Item</h3>

      {itemList.map((item, index) => (
        <button
          key={index}
          className="itemBtn"
          onClick={() => {
            setSelectedItem(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  )}

  {selectedHeat === "open" && (
    <div className="heatModal">
      <h3>Select Heat Code</h3>

      {heatList.map((heat, index) => (
        <button
          key={index}
          className="heatBtn"
          onClick={() => {
            setSelectedHeat(heat);
          }}
        >
          {heat}
        </button>
      ))}
    </div>
  )}
</div>



      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">Total Inspected<br /><strong>16340</strong></div>
        <div className="kpi-card">Total OK<br /><strong>15980</strong></div>
        <div className="kpi-card">Total Reject<br /><strong>360</strong></div>
        <div className="kpi-card">Reject %<br /><strong>2.20%</strong></div>
        <div className="kpi-card">Total Ton Rejection<br /><strong>10.09</strong></div>
        <div className="kpi-card">Ton Reject %<br /><strong>1.75%</strong></div>
        <div className="kpi-card">Inhouse Ton Rejection<br /><strong>8.62</strong></div>
        <div className="kpi-card">Machining Rejection<br /><strong>1.47</strong></div>
        <div className="kpi-card">Production Number<br /><strong>100</strong></div>
        <div className="kpi-card">Production Tonnage<br /><strong>2.85</strong></div>
      </div>

      {
  showFilter && (

    <div className="filterModal">

      <h3>Filter Dashboard</h3>

      <div className="filterOptions">

        <button
          className="filterOptionBtn"
          onClick={() =>
            setSelectedPeriod(
              "last-week"
            )
          }
        >
          Last Week
        </button>

        <button
          className="filterOptionBtn"
          onClick={() =>
            setSelectedPeriod(
              "current-week"
            )
          }
        >
          Current Week
        </button>

        <button
          className="filterOptionBtn"
          onClick={() =>
            setSelectedPeriod(
              "last-month"
            )
          }
        >
          Last Month
        </button>

        <button
          className="filterOptionBtn"
          onClick={() =>
            setSelectedPeriod(
              "custom"
            )
          }
        >
          Custom
        </button>

      </div>

      {
        selectedPeriod ===
          "custom" && (

          <div
            className="customDateWrap"
          >

            <label>From</label>

            <input
              type="date"
              value={fromDate}
              onChange={(e)=>
                setFromDate(
                  e.target.value
                )
              }
            />

            <label>To</label>

            <input
              type="date"
              value={toDate}
              onChange={(e)=>
                setToDate(
                  e.target.value
                )
              }
            />

          </div>
        )
      }

    </div>
  )
}
      {/* Charts Placeholder */}
      {/* Quality Distribution */}
<div className="chart-card full-width-chart">
  <h3>Quality Distribution</h3>

  <div style={{ width: "100%", height: "350px" }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={qualityData}
          innerRadius={80}
          outerRadius={120}
          dataKey="value"
        >
          {qualityData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend
  verticalAlign="top"
  height={40}
/>
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

{/* Summary Charts */}
<div className="summary-grid">

  <div className="chart-card">
    <h3 className="blue-title">
      Inhouse Quality Summary
    </h3>

    <div style={{ width: "100%", height: "350px" }}>
      <ResponsiveContainer>
        <BarChart data={inhouseSummary}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="chart-card">
    <h3 className="green-title">
      Machining Quality Summary
    </h3>

    <div style={{ width: "100%", height: "350px" }}>
      <ResponsiveContainer>
        <BarChart data={machiningSummary}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#16a34a"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

</div>

{/* Bottom Charts */}
<div className="summary-grid">

  <div className="chart-card">
    <h3>Item Wise Rejected Quantity</h3>

    <div style={{ width: "100%", height: "350px" }}>
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={itemWiseData}
        dataKey="value"
        outerRadius={120}
        label
      >
        {itemWiseData.map((entry, index) => (
          <Cell
            key={index}
            fill={pieColors[index % pieColors.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
  </div>

<div className="chart-card">
  <h3 className="red-title">
    Defect Pareto Analysis
  </h3>

  <p className="table-subtitle">
    Bar shows defect-wise rejected ton.
    Line shows cumulative rejected ton %.
  </p>

  <ResponsiveContainer width="100%" height={520}>
    <ComposedChart
      data={paretoData}
      margin={{
  top: 60,
  right: 50,
  left: 20,
  bottom: 120,
}}
    >
      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
  dataKey="defect"
  angle={-35}
  textAnchor="end"
  interval={0}
  height={100}
/>

      <YAxis
        yAxisId="left"
        label={{
          value: "Rejected Ton",
          angle: -90,
          position: "insideLeft",
        }}
      />

      <YAxis
        yAxisId="right"
        orientation="right"
        domain={[0, 100]}
        tickFormatter={(v) => `${v}%`}
      />

      <Tooltip />

      <Legend />

      <Bar
        yAxisId="left"
        dataKey="ton"
        name="Rejected Ton"
        radius={[6,6,0,0]}
        barSize={40}
      >
        {paretoData.map((entry, index) => (
          <Cell
            key={index}
            fill={
              paretoColors[
                index %
                paretoColors.length
              ]
            }
          />
        ))}

        <LabelList
          dataKey="ton"
          position="top"
        />
      </Bar>

      <Line
  yAxisId="right"
  type="monotone"
  dataKey="cumulative"
  stroke="#111827"
  strokeWidth={3}
  dot={{
    r: 5,
    fill: "#111827",
  }}
  name="Cumulative Ton %"
>
  <LabelList
    dataKey="cumulative"
    position="top"
    content={(props) => {

      const {
        x,
        y,
        value,
      } = props;

      return (
        <g>
          <rect
            x={x - 24}
            y={y - 50}
            width={48}
            height={24}
            rx={12}
            fill="white"
            stroke="#111827"
            strokeWidth={1.5}
          />

          <text
            x={x + 3}
            y={y - 30}
            textAnchor="middle"
            fill="#111827"
            fontSize="11"
            fontWeight="700"
          >
            {value}%
          </text>
        </g>
      );
    }}
  />
</Line>

    </ComposedChart>
  </ResponsiveContainer>
</div>
  </div>


      {/* Table 1 */}
      <div className="table-section">
        <h3>Top 5 Rejected Quantity Wise Records</h3>
<p className="table-subtitle">
  Showing highest rejected quantity records according to selected filter.
</p>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Item Name</th>
              <th>Part Number</th>
              <th>Inspected Qty</th>
              <th>Rejected Qty</th>
              <th>Rejected Ton</th>
              <th>Rejected Ton %</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
  {topRejectedQtyData.map((row, index) => (
    <tr key={index}>
      <td>{row.type}</td>
      <td>{row.item}</td>
      <td>{row.partNumber}</td>
      <td>{row.inspectedQty}</td>

      <td>
        <span className="reject-badge">
          {row.rejectedQty}
        </span>
      </td>

      <td>
        <span className="ton-badge">
          {row.rejectedTon}
        </span>
      </td>

      <td>
        <span className="percent-badge">
          {row.rejectedTonPercent}
        </span>
      </td>

      <td>
        <button
  className="view-btn"
  onClick={() => {
    setSelectedRow(row);
    setShowBreakdown(true);
  }}
>
  View
</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* Table 2 */}
      <div className="table-section">
        <h3>Top 5 Rejected Ton Wise Records</h3>
<p className="table-subtitle">
  Showing highest rejected ton records according to selected filter.
</p>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Item Name</th>
              <th>Part Number</th>
              <th>Inspected Qty</th>
              <th>Rejected Qty</th>
              <th>Rejected Ton</th>
              <th>Rejected Ton %</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
  {topRejectedQtyData.map((row, index) => (
    <tr key={index}>
      <td>{row.type}</td>
      <td>{row.item}</td>
      <td>{row.partNumber}</td>
      <td>{row.inspectedQty}</td>

      <td>
        <span className="reject-badge">
          {row.rejectedQty}
        </span>
      </td>

      <td>
        <span className="ton-badge">
          {row.rejectedTon}
        </span>
      </td>

      <td>
        <span className="percent-badge">
          {row.rejectedTonPercent}
        </span>
      </td>

      <td>
<button
  className="view-btn"
  onClick={() => {
  setSelectedRow(row);
  setShowBreakdown(true);
}}
>
  View
</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
{showBreakdown && selectedRow && (
  <div className="breakdownOverlay">
    <div className="breakdownModal">

      <div className="breakdownHeader">
        <h2>
          Reject Breakdown - {selectedRow.item}
        </h2>

        <button
          className="closeBtn"
          onClick={() => setShowBreakdown(false)}
        >
          Close
        </button>
      </div>

      <div className="breakdownCards">

        <div className="bCard">
          <h4>Source Type</h4>
          <h3>{selectedRow.type}</h3>
        </div>

        <div className="bCard">
          <h4>Selected Item</h4>
          <h3>{selectedRow.item}</h3>
        </div>

        <div className="bCard">
          <h4>Part Number</h4>
          <h3>{selectedRow.partNumber}</h3>
        </div>

        <div className="bCard">
          <h4>Inspected Quantity</h4>
          <h3>{selectedRow.inspectedQty}</h3>
        </div>

        <div className="bCard">
          <h4>Casting Weight</h4>
          <h3>22.58</h3>
        </div>

        <div className="bCard">
          <h4>Rejected Ton</h4>
          <h3>{selectedRow.rejectedTon}</h3>
        </div>

        <div className="bCard">
          <h4>Rejected Ton %</h4>
          <h3>{selectedRow.rejectedTonPercent}</h3>
        </div>

        <div className="bCard">
          <h4>Weight Status</h4>
          <h3>Available</h3>
        </div>

      </div>

      <table className="breakdownTable">
        <thead>
          <tr>
            <th>Item</th>
            <th>Part Number</th>
            <th>Defect</th>
            <th>Heat Code</th>
            <th>Rejected Qty</th>
            <th>Operator</th>
            <th>Date</th>
            <th>Shift</th>
            <th>Stage</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {breakdownRows.map((r, i) => (
            <tr key={i}>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
              <td>{r[3]}</td>
              <td>{r[4]}</td>
              <td>{r[5]}</td>
              <td>{r[6]}</td>
              <td>{r[7]}</td>
              <td>{r[8]}</td>

              <td>
                <button className="view-btn">
                  Open Image
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
)}

      <Link href="/dashboard-selection">
        <button className="backButton">
           ← Back
        </button>
      </Link>
    </div>
  );
}