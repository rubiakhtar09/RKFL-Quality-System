"use client";
import { useState } from "react";
import Select from "react-select";
import "./machining-form.css";


export default function InhouseForm() {

  // 🔹 Mapping
  const itemPartMap = [
    {item: "Eco Dummy Hub_Rear-5508",part: "2736 3960 5508"},
    {item:"Front Hub 6.5 T P-II-5502",part:"2846 3340 5502"},
    {item:"RA 109 Carrier Hsg",part: "2732 3511 0401"},
    {item:"Front Half_Hsg-414",part: "2691 2610 0414"},
    {item:"Rear Half_Hsg-415",part: "2691 2610 0415"},
    {item:"Brake drum-3701",part: "5080 4230 3701"},
    {item:"Brake drum-3711",part: "5006 4210 3711"},
    {item:"Adapter Narrow Jaw Class E-S9",part: "WD-89067-S9"},
    {item:"Differential cover-5112",part: "2732 3530 5112-60"},
    {item:"Differential case-5106",part: "2732 3530 5106-60"},
    {item:"Differential case-5112",part: "2732 3530 5112-61"},
    {item:"Differential case-5111",part: "2732 3530 5111-60"},
    {item:"Rear Hub-5512",part: "2732 3560 5512"},
    {item:"Brake Disc_Front",part: "5555 4210 3701"},
    {item:"RKFL Brake Drum-506",part: "RT0506"},
    {item:"Steering Gear box Mtg Bkt_3305",part: "5039 4670 3305"},
    {item:"Rear hub( RA-210 HR)",part: "2739 3560 5501"},
    {item:"Top cover LHD",part: "2715 2671 3701"},
    {item:"Reaction Bracket LH/RH",part: "1696267/266"},
    {item:"TG Case-4622",part: "4622"},
    {item:"Adapter WJK",part: "SK78525"},
    {item:"Adapter NJ_Class-K_S3",part: "15070-S3"},
    {item:"Flywheel housing",part: "HSG922"},
    {item:"BRAKE DRUM _180 dia.",part: "5564 4230 3701"},
    {item:"Brake disc small_5564",part: "5564 4210 3701"},
    {item:"Brake_Drum_3709",part: "2776 4230 3709"},
    {item:"Battery Bracket",part: "5560 3170 3701"},
    {item:"Brake_Drum_3703N",part: "501442103703N"},
    {item:"Brake Drum_5021",part: "5021 4210 3701"},
    {item:"Brake drum_5014",part: "5014 4210 3701"},
    {item:"Front_Hub_5503",part: "2846 3340 5503"},
    {item:"Brake_Drum_3704",part: "5530 4230 3704"},
    {item:"Wheel hub_010401C",part: "RT010401C"},
    {item:"Rear hub_5507",part: "5829 3560 5507"},
  ];

  const itemOptions = itemPartMap.map((i) => ({
  value: i.item,
  label: i.item,
}));

const partOptions = itemPartMap.map((i) => ({
  value: i.part,
  label: i.part,
}));

  // 🔹 Form State
  const [form, setForm] = useState({
    customer: "",
    item: "",
    part: "",
    quantity: "",
    rejected: "",
    date: "",
    shift: "Shift A",
  });

  // 🔹 Breakdown Rows
  const [rows, setRows] = useState([
    { defect: "", heat: "", qty: "", image: null },
  ]);

  // 🔹 Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = { ...form, [name]: value };

    // 👉 Rejected validation
    if (name === "rejected") {
      const rejectedValue = Number(value);
      const maxQty = Number(form.quantity);

      if (rejectedValue > maxQty) {
        alert("Rejected Pieces cannot be greater than Inspection Quantity");
        return;
      }
    }

    // 👉 Item → Part
    if (name === "item") {
      const found = itemPartMap.find((i) => i.item === value);
      if (found) updatedForm.part = found.part;
    }

    // 👉 Part → Item
    if (name === "part") {
      const found = itemPartMap.find((i) => i.part === value);
      if (found) updatedForm.item = found.item;
    }

    setForm(updatedForm);
  };

  // 🔹 Row Functions
  const addRow = () => {
    setRows([...rows, { defect: "",otherDefect: "", heat: "", qty: "", image: null }]);
  };

  const removeRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const handleRowChange = (index, field, value) => {
    let updated = [...rows];

    // 👉 Quantity validation
    if (field === "qty") {
      const newQty = Number(value);
      const currentTotal = rows.reduce(
        (sum, r, i) => sum + (i === index ? 0 : Number(r.qty || 0)),
        0
      );

      const rejected = Number(form.rejected);

      if (currentTotal + newQty > rejected) {
        alert("Total quantity cannot exceed rejected pieces");
        return;
      }
    }

    updated[index][field] = value;
    setRows(updated);
  };

  // 🔹 Total Calculation
  const totalQty = rows.reduce((sum, r) => sum + Number(r.qty || 0), 0);

  // 🔹 Final Validation
  const isValid =
    form.stage &&
    form.item &&
    form.part &&
    form.quantity &&
    form.date &&
    form.shift &&
    (
      Number(form.rejected) === 0 ||
      totalQty === Number(form.rejected)
    );

  return (
    <div className="quality-page">

      <div className="quality-card">

        {/* Logo */}
        <img src="/rkfl-logo.png" className="rkfl-logo" alt="logo" />

        {/* Icons */}
        <div className="form-icons">
          <button onClick={() => window.history.back()}>⬅</button>
          <button onClick={() => (window.location.href = "/")}>🏠</button>
        </div>

        <h1>MACHINING QUALITY INSPECTION</h1>

        <div className="quality-grid">

          <div className="form-group">
  <label>Customer Name</label>
  <input
    type="text"
    name="customer"
    placeholder="Enter Customer / Company Name"
    value={form.customer || ""}
    onChange={handleChange}
  />
</div>

          <div className="form-group">
  <label>Item Name</label>

  <Select
    className="react-select-container"
    classNamePrefix="react-select"
    options={itemOptions}
    placeholder="Search Item Name..."
    value={
      itemOptions.find(
        (opt) => opt.value === form.item
      ) || null
    }
    onChange={(selected) => {

      const found =
        itemPartMap.find(
          (i) => i.item === selected.value
        );

      setForm({
        ...form,
        item: selected.value,
        part: found?.part || "",
      });
    }}
    isSearchable
  />
</div>

          <div className="form-group">
            <label>Part Number</label>

            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={partOptions}
              placeholder="Search Part Number..."
              value={
                partOptions.find(
                   (opt) => opt.value === form.part
                ) || null
              }
              onChange={(selected) => {

                const found =
                  itemPartMap.find(
                    (i) =>
                      i.part === selected.value
                  );

              setForm({
                ...form,
                part: selected.value,
                item: found?.item || "",
              });
            }}
            isSearchable
          />
        </div>

          <div className="form-group">
            <label>Machining Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Rejected Pieces</label>
            <input
              type="number"
              name="rejected"
              value={form.rejected}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>Shift</label>
            <select name="shift" value={form.shift} onChange={handleChange}>
              <option>Shift A</option>
              <option>Shift B</option>
              <option>Shift C</option>
              <option>General</option>
            </select>
          </div>

        </div>

        {/* Breakdown */}
        {Number(form.rejected) > 0 && (
          <div className="breakdown-box">

            <h2>Rejected Pieces Breakdown</h2>
            <p>Enter the detailed breakdown.</p>

            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Defects</th>
                  <th>Heat Code</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>

                    <td>
  <select
    value={row.defect}
    onChange={(e) =>
      handleRowChange(index, "defect", e.target.value)
    }
  >
    <option>Select Defect</option>
    <option>Sand Drop</option>
    <option>Scabbing</option>
    <option>Sand Inclusion</option>
    <option>Mould broken</option>
    <option>Mould crush</option>
    <option>Sand fusion</option>
    <option>Core shift</option>
    <option>Box Leakage</option>
    <option>Shakeout break/dent</option>
    <option>Extra Material</option>
    <option>Swelling</option>
    <option>Shrinkage</option>
    <option>Blow hole</option>
    <option>Gas</option>
    <option>Deppression</option>
    <option>Slag</option>
    <option>Short pour</option>
    <option>intrpt.pouring</option>
    <option>Metal_Drainage</option>
    <option>Low Hardness</option>
    <option>High harness</option>
    <option>Metallurgical Fail</option>
    <option>Micro cut</option>
    <option>Porosity</option>
    <option>Pin Hole</option>
    <option>Core fault</option>
    <option>Without core/core brk</option>
    <option>Fettling dent/dmg/brk</option>
    <option>Degatng Brk/Dent/damage</option>
    <option>Over Fettling</option>
    <option>Mismatch</option>
    <option>Unclean</option>
    <option>Other</option>
  </select>

  {row.defect === "Other" && (
    <input
      type="text"
      placeholder="Enter Other Defect"
      value={row.otherText || ""}
      onChange={(e) =>
        handleRowChange(index, "otherText", e.target.value)
      }
      style={{
        marginTop: "6px",
        width: "100%",
      }}
    />
  )}
</td>

                    <td>
                      <input
                        type="text"
                        placeholder="Heat Code"
                        value={row.heat}
                        onChange={(e) =>
                          handleRowChange(index, "heat", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        placeholder="Qty"
                        value={row.qty}
                        onChange={(e) =>
                          handleRowChange(index, "qty", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleRowChange(index, "image", e.target.files[0])
                        }
                      />
                    </td>

                    <td>
                      <button className="remove-btn" onClick={() => removeRow(index)}>
                        Remove
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            <button className="add-row-btn" onClick={addRow}>
              + Add Row
            </button>

            <div
              className="total-row-box"
              style={{
                borderColor:
                  totalQty === Number(form.rejected) ? "green" : "red",
                color:
                  totalQty === Number(form.rejected) ? "green" : "red",
              }}
            >
              Total Row Quantity: {totalQty} / Rejected Pieces: {form.rejected}
            </div>

          </div>
        )}

        {/* Submit */}
        <button
          className="submit-quality-btn"
          disabled={!isValid}
          style={{
            opacity: isValid ? 1 : 0.6,
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          Submit Quality Report
        </button>

      </div>
    </div>
  );
}