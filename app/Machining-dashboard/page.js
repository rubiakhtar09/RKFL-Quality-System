"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as XLSX from "xlsx";

const itemList = [
  "Steering Gear Box",
  "Adapter Narrow Jaw",
  "RA 109 Carrier",
  "Differential Cover",
  "Adapter WJK",
];

const heatList = [
  "HT24001",
  "HT24002",
  "HT24003",
  "HT24004",
  "HT24005",
];

const companyList = [
  "Tata Motors",
  "Ashok Leyland",
  "Mahindra",
  "Eicher",
  "RKFL",
];

import "./machining-dashboard.css";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

export default function MachiningDashboard() {
const [filterType, setFilterType] = useState("");
const router = useRouter();

const [selectedPeriod, setSelectedPeriod] =
  useState("current-month");

const [selectedItem, setSelectedItem] =
  useState("");

const [selectedHeat, setSelectedHeat] =
  useState("");

const [selectedCompany, setSelectedCompany] =
  useState("");

const [fromDate, setFromDate] =
  useState("");

const [toDate, setToDate] =
  useState("");

const [selectedDefect, setSelectedDefect] =
  useState("");

const [selectedPieItem, setSelectedPieItem] =
  useState("");

const [showBreakdown, setShowBreakdown] =
  useState(false);

const [selectedRow, setSelectedRow] =
  useState(null);

const handleDownloadExcel = () => {
  const table1 = quantityRows.map(r => ({
    "Item Name": r[0],
    "Part Number": r[1],
    "Inspected Quantity": r[2],
    "Rejected Quantity": r[3],
    "Rejected Ton": r[4],
    "Rejected Ton %": r[5],
  }));

  const table2 = tonRows.map(r => ({
    "Item Name": r[0],
    "Part Number": r[1],
    "Inspected Quantity": r[2],
    "Rejected Quantity": r[3],
    "Rejected Ton": r[4],
    "Rejected Ton %": r[5],
  }));

  const wb = XLSX.utils.book_new();
  const ws1 = XLSX.utils.json_to_sheet(table1);
  const ws2 = XLSX.utils.json_to_sheet(table2);

  XLSX.utils.book_append_sheet(wb, ws1, "Rejected Qty");
  XLSX.utils.book_append_sheet(wb, ws2, "Rejected Ton");

  XLSX.writeFile(wb, "Machining_Rejection_Report.xlsx");
};


  const kpiData = [
  {
    title: "Total Machining Quantity",
    value: "10000",
    sub: "",
    color: "#2563eb",
  },
  {
    title: "OK Parts",
    value: "9950",
    sub: "",
    color: "#16a34a",
  },
  {
    title: "Rejected Parts",
    value: "50",
    sub: "",
    color: "#dc2626",
  },
  {
    title: "Reject %",
    value: "0.50%",
    sub: "",
    color: "#7c3aed",
  },
  {
    title: "Ton Wise Rejection",
    value: "1.47",
    sub: "Rejected ton",
    color: "#f97316",
  },
  {
    title: "Ton Reject %",
    value: "0.50%",
    sub: "Ton wise reject percentage",
    color: "#0891b2",
  },
];

  const defectData = [
    { name: "Sand drop", bar: 1.7, line: 23.3 },
    { name: "Mould crush", bar: 1.48, line: 43.6 },
    { name: "Shakeout break", bar: 1.1, line: 57.9 },
    { name: "Short pour", bar: 0.95, line: 71 },
    { name: "Mould broken", bar: 0.58, line: 78.9 },
    { name: "Low metallurgy", bar: 0.55, line: 86.3 },
    { name: "Sand inclusion", bar: 0.32, line: 90.7 },
    { name: "Micro cut", bar: 0.24, line: 97.2 },
    { name: "Degating box", bar: 0.21, line: 100 },
  ];

  const defectColors = [
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

  const pieData = [
    { name: "Steering Gear box", value: 27 },
    { name: "Adapter Narrow Jaw", value: 24 },
    { name: "RA 109 Carrier", value: 15 },
    { name: "Differential Cover", value: 8 },
    { name: "Adapter WJK", value: 7 },
    { name: "Rear Hub", value: 6 },
    { name: "Brake Drum", value: 5 },
    { name: "Adapter NJ", value: 3 },
    { name: "Eco Dummy", value: 2 },
    { name: "Adapter K", value: 1 },
  ];

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f97316",
    "#7c3aed",
    "#dc2626",
    "#0891b2",
    "#eab308",
    "#ec4899",
    "#14b8a6",
    "#f43f5e",
  ];

  const quantityRows = [
    ["Steering Gear box Mtg Bkt_3305","5039 4670 3305","15170","82","1.85","0.54%"],
    ["Adapter Narrow Jaw Class E-S9","WD-89067-S9","5436","71","0.99","1.31%"],
    ["RA 109 Carrier Hsg","2732 3511 0401","12925","41","2.28","0.32%"],
    ["Differential cover-5112","2732 3530 5112-60","10532","24","0.40","0.23%"],
    ["Adapter WJK","SK78525","1239","21","0.52","1.69%"],
  ];

  const tonRows = [
    ["RA 109 Carrier Hsg","2732 3511 0401","12925","41","2.28","0.32%"],
    ["Steering Gear box Mtg Bkt_3305","5039 4670 3305","15170","82","1.85","0.54%"],
    ["Adapter Narrow Jaw Class E-S9","WD-89067-S9","5436","71","0.99","1.31%"],
    ["Rear Hub-5512","2732 3560 5512","15961","17","0.60","0.11%"],
    ["Adapter WJK","SK78525","1239","21","0.52","1.69%"],
  ];

  
const breakdownRows = [
[
"TATA MOTORS",
"Eco Dummy Hub_Rear-5508",
"2736 3960 5508",
"Depression",
"jiookpolp",
"20",
"operator1",
"15 Apr 2026",
"General",
"-",
],
[
"TATA MOTORS",
"Eco Dummy Hub_Rear-5508",
"2736 3960 5508",
"Blow hole",
"ioopoppo",
"30",
"operator1",
"15 Apr 2026",
"General",
"-",
],
];

return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="topBar">
        <div className="iconWrap">
          <div
  className="circle"
  onClick={() =>
    router.push(
      "/dashboard-selection"
    )
  }
>
  🏠
</div>
          <div
  className="circle"
  onClick={() =>
    router.back()
  }
>
  ⬅
</div>
        </div>

        <div className="titleWrap">
          <h1>MACHINING REJECTION</h1>
          <p>RKFL Quality Monitoring System</p>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="buttonRow">
        <button className="green" onClick={handleDownloadExcel}>Download Excel</button>
        <button
  className="green"
  onClick={() =>
    { setFilterType("period") }
  }
>
  Filter
</button>

    <button
  className="green"
  onClick={() =>
    { setFilterType("company") }
  }
>
  Company Wise
</button>
        <button
  className="green"
  onClick={() =>
    { setFilterType("item")}
  }
>
  Item Wise
</button>




        <button
  className="green"
  onClick={() =>
    { setFilterType("heat") }
  }
>
  Heat Wise
</button>
        <button
  className="red"
  onClick={() => {
    setFilterType("");

    setSelectedPeriod("current-month");

    setSelectedCompany("");

    setSelectedItem("");
    setSelectedHeat("");

    setSelectedDefect("");
    setSelectedPieItem("");

    setFromDate("");
    setToDate("");
  }}
>
  Clear Filter
</button>

      </div>

      {/* FILTER BOX */}

      <div className="filterBox">
        <div className="filterText">
          Selected dashboard data is showing according to your applied filter.
        </div>

        <div className="chips">
        <span>Period: {selectedPeriod}</span>
        {selectedCompany && selectedCompany !== "open" && (
          <span>Company: {selectedCompany}</span>
        )}
          <span>Period: {selectedPeriod}</span>
          {selectedItem && selectedItem !== "open" && (
            <span>Item: {selectedItem}</span>
          )}
          {selectedHeat && selectedHeat !== "open" && (
            <span>Heat: {selectedHeat}</span>
          )}
          {selectedDefect && (
            <span>Defect: {selectedDefect}</span>
          )}
          {selectedPieItem && (
            <span>Chart Item: {selectedPieItem}</span>
          )}
          {fromDate && <span>From: {fromDate}</span>}
          {toDate && <span>To: {toDate}</span>}
        </div>
      </div>
      {
  filterType && (

    <div className="applyFilterCard">

      <h2>Apply Filter</h2>

      {
        filterType === "period" && (
          <>
            <div>
              <label>Select Period</label>

              <select
                value={selectedPeriod}
                onChange={(e)=>
                  setSelectedPeriod(
                    e.target.value
                  )
                }
              >
                <option value="last-week">
                  Last Week
                </option>

                <option value="current-week">
                  Current Week
                </option>

                <option value="last-month">
                  Last Month
                </option>

                <option value="custom">
                  Custom
                </option>
              </select>
            </div>

            {
              selectedPeriod === "custom" && (
                <div className="customDateWrap">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e)=>
                      setFromDate(
                        e.target.value
                      )
                    }
                  />

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
          </>
        )
      }

      {
        filterType === "company" && (
          <div>
            <label>Select Company</label>

            <select
              value={selectedCompany}
              onChange={(e)=>
                setSelectedCompany(
                  e.target.value
                )
              }
            >
              <option value="">
                All Companies
              </option>

              {companyList.map((company)=>(
                <option
                  key={company}
                  value={company}
                >
                  {company}
                </option>
              ))}
            </select>
          </div>
        )
      }

      {
        filterType === "item" && (
          <div>
            <label>Select Item</label>

            <select
              value={selectedItem}
              onChange={(e)=>
                setSelectedItem(
                  e.target.value
                )
              }
            >
              <option value="">
                All Products
              </option>

              {itemList.map((item)=>(
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        )
      }

      {
        filterType === "heat" && (
          <div>
            <label>Select Heat Code</label>

            <select
              value={selectedHeat}
              onChange={(e)=>
                setSelectedHeat(
                  e.target.value
                )
              }
            >
              <option value="">
                All Heat Codes
              </option>

              {heatList.map((heat)=>(
                <option
                  key={heat}
                  value={heat}
                >
                  {heat}
                </option>
              ))}
            </select>
          </div>
        )
      }

      <button
        className="applyBtn"
        onClick={() =>
          setFilterType("")
        }
      >
        Apply Filter
      </button>

    </div>
  )
}
      {/* KPI */}
      <div className="kpiGrid">
        {kpiData.map((item, i) => (
          <div
            key={i}
            className="kpiCard"
            style={{ borderTop: `5px solid ${item.color}` }}
          >
            <h3>{item.title}</h3>
            <h2>{item.value}</h2>
            <p>{item.sub}</p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="chartGrid">

        <div className="chartCard">
          <h3>Defect Analysis (Pareto - Ton Wise)</h3>

          <ResponsiveContainer width="100%" height={430}>
  <ComposedChart
    data={defectData}
    margin={{
      top: 25,
      right: 35,
      left: 5,
      bottom: 70,
    }}
  >
    <CartesianGrid
      strokeDasharray="2 2"
      stroke="#e5e7eb"
    />

    <XAxis
      dataKey="name"
      angle={-18}
      textAnchor="end"
      interval={0}
      tick={{
        fontSize: 13,
        fill: "#374151",
      }}
      height={70}
    />

    <YAxis
      yAxisId="left"
      domain={[0, 2]}
      tick={{
        fontSize: 13,
      }}
    />

    <YAxis
      yAxisId="right"
      orientation="right"
      domain={[0, 100]}
      tickFormatter={(v) => `${v}%`}
      tick={{
        fontSize: 11,
      }}
    />

    <Tooltip
  content={({ active, payload }) => {
    if (active && payload && payload.length) {

      const d = payload[0].payload;

      return (
        <div className="customTooltip">
          <h4>{d.name}</h4>

          <p>
            Rejected Ton : {d.bar}
          </p>

          <p>
            Cumulative % : {d.line}%
          </p>
        </div>
      );
    }

    return null;
  }}
/>

    <Legend
      verticalAlign="top"
      align="right"
      height={40}
    />

    <Bar
  yAxisId="left"
  dataKey="bar"
  barSize={42}
  radius={[5,5,0,0]}
  name="Rejection %"
>
  {defectData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={
        defectColors[
          index % defectColors.length
        ]
      }
    />
  ))}

  <LabelList
    dataKey="bar"
    position="top"
    fontSize={11}
  />
</Bar>

    <Line
      yAxisId="right"
      type="monotone"
      dataKey="line"
      stroke="#111827"
      strokeWidth={3}
      dot={{
        r:5,
        fill:"#111827",
      }}
      name="Cumulative %"
    >
      <LabelList
  dataKey="line"
  position="top"
  content={(props) => {

    const {
      x,
      y,
      value
    } = props;

    return (
      <g>
        <rect
          x={x - 24}
          y={y - 34}
          rx={12}
          ry={12}
          width={54}
          height={34}
          fill="white"
          stroke="#111827"
          strokeWidth={2}
        />

        <text
          x={x + 3}
          y={y - 12}
          fill="#111827"
          fontSize="12"
          fontWeight="800"
          textAnchor="middle"
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

        <div className="chartCard">
          <h3>Item Wise Rejected Quantity</h3>

          <ResponsiveContainer width="100%" height={370}>
  <PieChart>
    <Pie
  data={pieData}
  onClick={(d)=>setSelectedPieItem(d.name)}
  dataKey="value"
  cx="42%"
  cy="56%"
  outerRadius={118}
  innerRadius={0}
  paddingAngle={1}
  stroke="white"
  strokeWidth={2}
>
  {pieData.map(
    (_, index) => (
      <Cell
        key={index}
        fill={
          COLORS[
            index %
              COLORS.length
          ]
        }
      />
    )
  )}
</Pie>

    <Tooltip
  content={({ active, payload }) => {
    if (
      active &&
      payload &&
      payload.length
    ) {

      const d =
        payload[0].payload;

      return (
        <div className="pieTooltip">
          <h4>{d.name}</h4>

          <div className="pieValueRow">
            <span
              className="pieColorBox"
              style={{
                background:
                  payload[0].color,
              }}
            />

            <span>
              {d.value}
            </span>
          </div>
        </div>
      );
    }

    return null;
  }}
/>

    <Legend
  layout="horizontal"
  verticalAlign="top"
  align="center"
  iconType="square"
  wrapperStyle={{
    fontSize: "13px",
    paddingBottom: "12px",
    lineHeight: "26px",
  }}
/>
  </PieChart>
</ResponsiveContainer>
        </div>
      </div>

      {/* TABLE 1 */}
      <div className="tableSection">
        <div className="tableTitleRow">
          <h2>Top 5 Rejected Quantity Wise Products</h2>
          <span>In-House products with the highest rejected quantities.</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Part Number</th>
              <th>Inspected Quantity</th>
              <th>Rejected Quantity</th>
              <th>Rejected Ton</th>
              <th>Rejected Ton %</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {quantityRows.map((r, i) => (
              <tr key={i}>
                <td>{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td><span className="pillRed">{r[3]}</span></td>
                <td><span className="pillOrange">{r[4]}</span></td>
                <td><span className="pillOrange">{r[5]}</span></td>
                <td>
                  <button className="viewBtn" onClick={()=>{setSelectedRow(r);setShowBreakdown(true);}}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TABLE 2 */}
      <div className="tableSection">
        <div className="tableTitleRow">
          <h2>Top 5 Rejected Ton Wise Products</h2>
          <span>In-House products with the highest rejected tonnage.</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Part Number</th>
              <th>Inspected Quantity</th>
              <th>Rejected Quantity</th>
              <th>Rejected Ton</th>
              <th>Rejected Ton %</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {tonRows.map((r, i) => (
              <tr key={i}>
                <td>{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td><span className="pillRed">{r[3]}</span></td>
                <td><span className="pillOrange">{r[4]}</span></td>
                <td><span className="pillOrange">{r[5]}</span></td>
                <td>
                  <button className="viewBtn" onClick={()=>{setSelectedRow(r);setShowBreakdown(true);}}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{
showBreakdown && selectedRow && (
<div className="breakdownOverlay">

<div className="breakdownModal">

<div className="breakdownHeader">
<h2>
Rejected Pieces Breakdown - {selectedRow[0]}
</h2>

<button
className="closeBtn"
onClick={() => setShowBreakdown(false)}
>
Close
</button>
</div>

<p className="breakdownSub">
Selected product ka raw rejected pieces breakdown
</p>

<div className="breakdownCards">

<div className="bCard">
<h4>Company</h4>
<h3>TATA MOTORS</h3>
</div>

<div className="bCard">
<h4>Selected Item</h4>
<h3>{selectedRow[0]}</h3>
</div>

<div className="bCard">
<h4>Part Number</h4>
<h3>{selectedRow[1]}</h3>
</div>

<div className="bCard">
<h4>Inspected Quantity</h4>
<h3>{selectedRow[2]}</h3>
</div>

<div className="bCard">
<h4>Rejected Quantity</h4>
<h3>{selectedRow[3]}</h3>
</div>

<div className="bCard">
<h4>Casting Weight (kg)</h4>
<h3>29.38</h3>
</div>

<div className="bCard">
<h4>Rejected Ton</h4>
<h3>{selectedRow[4]}</h3>
</div>

<div className="bCard">
<h4>Rejected Ton %</h4>
<h3>{selectedRow[5]}</h3>
</div>

</div>

<table className="breakdownTable">

<thead>
<tr>
<th>Company</th>
<th>Item</th>
<th>Part Number</th>
<th>Defect</th>
<th>Heat Code</th>
<th>Rejected Qty</th>
<th>Operator</th>
<th>Date</th>
<th>Shift</th>
<th>Image</th>
</tr>
</thead>

<tbody>

{breakdownRows.map((r,i)=>(
<tr key={i}>

<td>{r[0]}</td>
<td>{r[1]}</td>
<td>{r[2]}</td>
<td>{r[3]}</td>
<td>{r[4]}</td>

<td>
<span className="pillRed">
{r[5]}
</span>
</td>

<td>{r[6]}</td>
<td>{r[7]}</td>
<td>{r[8]}</td>
<td>
<button className="viewBtn">
Open Image
</button>
</td>

</tr>
))}

</tbody>

</table>

<div
style={{
marginTop:"15px",
padding:"14px",
background:"#eef6ff",
border:"1px solid #bfd7ff",
borderRadius:"10px",
fontWeight:"700",
color:"#1d4ed8",
}}
>
Total Breakdown Quantity : 50
</div>

</div>

</div>
)
}

    </div>
  );
}