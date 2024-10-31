import React, { useState } from "react";
import axios from "axios";
import "./CreatePosition.css";

function CreatePositionForm() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name || !code) {
      setError("Vui lòng nhập mã và tên.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9010/api/v1/teacher-positions",
        {
          name,
          code,
          des,
          isActive,
        }
      );

      setSuccessMessage(response.data.message);
      setCode("");
      setName("");
      setDes("");
      setIsActive(true);
    } catch (err) {
      setError("Lỗi khi tạo vị trí công tác: " + err.response.data.message);
    }
  };

  return (
    <div className="position-form-container">
      <h2>Vị trí công tác</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã *</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tên *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mô tả *</label>
          <textarea
            value={des}
            onChange={(e) => setDes(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Trạng thái *</label>
          <div className="status-toggle">
            <button
              type="button"
              className={isActive ? "active" : ""}
              onClick={() => setIsActive(true)}
            >
              Hoạt động
            </button>
            <button
              type="button"
              className={!isActive ? "inactive" : ""}
              onClick={() => setIsActive(false)}
            >
              Ngừng
            </button>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="submit-btn">
          Lưu
        </button>
      </form>
    </div>
  );
}

export default CreatePositionForm;
