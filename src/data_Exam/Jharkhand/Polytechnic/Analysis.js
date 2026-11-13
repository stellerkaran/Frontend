import React from "react";
import { ProgressBar, Form } from "react-bootstrap";

export default function Analysis({ progress = { phy: 0, chem: 0, math: 0 }, totals = { phy: 0, chem: 0, math: 0 } }) {
  const { phy: totalPhy, chem: totalChem, math: totalMath } = totals;
  return (
    <div className="progress-box">
      <div className="progress-header">
        <h5 style={{ fontWeight: 700 }}>Your Progress</h5>
        <Form.Select
          size="sm"
          style={{ width: "120px", fontWeight: 600, color: "#2563eb" }}
        >
          <option>All Years</option>
          <option>2025 </option>
          <option>2024</option>
        </Form.Select>
      </div>

      <div className="overall-progress">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#2563eb", fontWeight: 800 }}>5.45%</h1>
          <p>Overall</p>
        </div>

        <div style={{ flex: 2, minWidth: "240px" }}>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Physics</span>
              <span>{totalPhy} questions</span>
            </div>
            <ProgressBar now={progress.phy} className="progress-orange" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Chemistry</span>
              <span>{totalChem} questions</span>
            </div>
            <ProgressBar now={progress.chem} className="progress-green" />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Mathematics</span>
              <span>{totalMath} questions</span>
            </div>
            <ProgressBar now={progress.math} className="progress-blue" />
          </div>
        </div>
      </div>
    </div>
  );
}
