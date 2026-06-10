"use client";

import { useState } from "react";
import Select from "react-select";
import "./production-form.css";


export default function ProductionForm() {

  // 🔥 REAL MAPPING (Sheet se)
  const partData = {
    "Eco Dummy Hub_Rear-5508": { partNumber: "2736 3960 5508", cavity: 3 },
    "Front Hub 6.5 T P-II-5502": { partNumber: "2846 3340 5502", cavity: 3 },
    "RA 109 Carrier Hsg": { partNumber: "2732 3511 0401", cavity: 1 },
    "Front Half_Hsg-414": { partNumber: "2691 2610 0414", cavity: 2 },
    "Rear Half_Hsg-415": { partNumber: "2691 2610 0415", cavity: 2 },
    "Brake drum-3701": { partNumber: "5080 4230 3701", cavity: 1 },
    "Brake drum-3711": { partNumber: "5006 4210 3711", cavity: 1 },
    "Adapter Narrow Jaw Class E-S9": { partNumber: "WD-89067-S9", cavity: 6 },
    "Differential cover-5112": { partNumber: "2732 3530 5112-60", cavity: 2 },
    "Differential case-5106": { partNumber: "2732 3530 5106-60", cavity: 2 },
    "Differential case-5111": { partNumber: "2732 3530 5111-60", cavity: 2 },
    "Rear Hub-5512": { partNumber: "2732 3560 5512", cavity: 3 },
    "Brake Disc_Front": { partNumber: "5555 4210 3701", cavity: 4 },
    "RKFL Brake Drum-506": { partNumber: "RT0506", cavity: 1 },
    "Steering Gear box Mtg Bkt_3305": { partNumber: "5039 4670 3305", cavity: 2 },
    "Rear hub( RA-210 HR)": { partNumber: "2739 3560 5501", cavity: 2 },
    "Top cover LHD": { partNumber: "2715 2671 3701", cavity: 1 },
    "Reaction Bracket LH/RH": { partNumber: "1696267/266", cavity: 2 },
    "TG Case-4622": { partNumber: "4622", cavity: 1 },
    "Adapter WJK": { partNumber: "SK78525", cavity: 4 },
    "Adapter NJ_Class-K_S3": { partNumber: "15070-S3", cavity: 6 },
    "Flywheel housing": { partNumber: "HSG922", cavity: 1 },
    "BRAKE DRUM _180 dia.": { partNumber: "5564 4230 3701", cavity: 2 },
    "Brake disc small_5564": { partNumber: "5564 4210 3701", cavity: 1 },
    "Brake_Drum_3709": { partNumber: "2776 4230 3709", cavity: 1 },
    "Battery Bracket": { partNumber: "5560 3170 3701", cavity: 1 },
    "Brake_Drum_3703N": { partNumber: "501442103703N", cavity: 1 },
    "Brake Drum_5021": { partNumber: "5021 4210 3701", cavity: 1 },
    "Brake drum_5014": { partNumber: "5014 4210 3701", cavity: 1 },
    "Front_Hub_5503": { partNumber: "2846 3340 5503", cavity: 3 },
    "Brake_Drum_3704": { partNumber: "5530 4230 3704", cavity: 2 },
    "Wheel hub_010401C": { partNumber: "RT010401C", cavity: 3 },
    "Rear hub_5507": { partNumber: "5829 3560 5507", cavity: 3 }
  };

  const partNameOptions = Object.keys(partData).map((item) => ({
  value: item,
  label: item,
}));

const partNumberOptions = Object.values(partData).map((item) => ({
  value: item.partNumber,
  label: item.partNumber,
}));

  const [partName, setPartName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [mouldProduced, setMouldProduced] = useState("");
  const [quantity, setQuantity] = useState("");

  const handlePartNameChange = (e) => {
    const selectedPart = e.target.value;
    setPartName(selectedPart);

    const data = partData[selectedPart];

    if (data) {
      setPartNumber(data.partNumber);
      setQuantity(mouldProduced ? Number(mouldProduced) * data.cavity : "");
    } else {
      setPartNumber("");
      setQuantity("");
    }
  };

  const handlePartNumberChange = (e) => {
    const selectedNumber = e.target.value;
    setPartNumber(selectedNumber);

    const matchedPart = Object.keys(partData).find(
      (key) => partData[key].partNumber === selectedNumber
    );

    if (matchedPart) {
      setPartName(matchedPart);
      setQuantity(mouldProduced ? Number(mouldProduced) * partData[matchedPart].cavity : "");
    } else {
      setPartName("");
      setQuantity("");
    }
  };

  const handleMouldChange = (e) => {
    const mould = e.target.value;
    setMouldProduced(mould);

    if (partName && partData[partName]) {
      setQuantity(Number(mould || 0) * partData[partName].cavity);
    } else {
      setQuantity("");
    }
  };

  return (
    <div className="quality-page">
      <div className="topbar">
        <h3>RKFL Quality System - Production Data Form - RKFL</h3>
      </div>

      <div className="quality-card production-card">
        <div className="form-icons">
          <button onClick={() => window.history.back()}>⬅</button>
          <button onClick={() => (window.location.href = "/")}>🏠</button>
        </div>

        <img src="/rkfl-logo.png" alt="RKFL Logo" className="rkfl-logo" />

        <h1>PRODUCTION DATA ENTRY</h1>

        <div className="quality-grid">

          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Shift</label>
            <select>
              <option>Select Shift</option>
              <option>Shift A</option>
              <option>Shift B</option>
              <option>Shift C</option>
              <option>General</option>
            </select>
          </div>

          <div className="form-group">
            <label>Part Name</label>
            <Select
  className="react-select-container"
  classNamePrefix="react-select"
  options={partNameOptions}
  placeholder="Search Part Name..."
  value={
    partNameOptions.find(
      (opt) => opt.value === partName
    ) || null
  }
  onChange={(selected) => {

    const selectedPart = selected.value;

    setPartName(selectedPart);

    const data = partData[selectedPart];

    if (data) {
      setPartNumber(data.partNumber);

      setQuantity(
        mouldProduced
          ? Number(mouldProduced) * data.cavity
          : ""
      );
    }
  }}
  isSearchable
/>
          </div>

          <div className="form-group">
            <label>Part Number</label>
            <Select
  className="react-select-container"
  classNamePrefix="react-select"
  options={partNumberOptions}
  placeholder="Search Part Number..."
  value={
    partNumberOptions.find(
      (opt) => opt.value === partNumber
    ) || null
  }
  onChange={(selected) => {

    const selectedNumber =
      selected.value;

    setPartNumber(selectedNumber);

    const matchedPart =
      Object.keys(partData).find(
        (key) =>
          partData[key].partNumber ===
          selectedNumber
      );

    if (matchedPart) {

      setPartName(matchedPart);

      setQuantity(
        mouldProduced
          ? Number(mouldProduced) *
              partData[matchedPart].cavity
          : ""
      );
    }
  }}
  isSearchable
/>
          </div>

          <div className="form-group">
            <label>Number of Mould Produced</label>
            <input
              type="number"
              placeholder="Enter mould produced"
              value={mouldProduced}
              onChange={handleMouldChange}
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              placeholder="Auto calculated quantity"
              value={quantity}
              readOnly
            />
          </div>

        </div>

        <button
          className="submit-quality-btn"
          onClick={() => alert("Production data submitted successfully")}
        >
          Submit Production Data
        </button>

      </div>
    </div>
  );
}