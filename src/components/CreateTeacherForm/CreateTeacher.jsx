import React, { useState } from "react";
import axios from "axios";
import "./CreateTeacher.css";

function CreateTeacher() {
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    cccd: "",
    degrees: [],
    teacherPositionsId: "",
  });
  const [newDegree, setNewDegree] = useState({
    level: "",
    school: "",
    major: "",
    status: "",
    graduationYear: "",
  });

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  const handleDegreeChange = (e) => {
    setNewDegree({ ...newDegree, [e.target.name]: e.target.value });
  };

  const addDegree = () => {
    setTeacherData({
      ...teacherData,
      degrees: [...teacherData.degrees, newDegree],
    });
    setNewDegree({
      level: "",
      school: "",
      major: "",
      status: "",
      graduationYear: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9010/api/v1/teachers",
        teacherData
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response ? error.response.data.message : "Lỗi server");
    }
  };

  return (
    <div className="form-container">
      <h2>Tạo thông tin giáo viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Họ và tên</label>
          <input
            type="text"
            name="name"
            value={teacherData.name}
            onChange={handleChange}
            required
          />
          <label>Ngày sinh</label>
          <input
            type="date"
            name="dob"
            value={teacherData.dob}
            onChange={handleChange}
            required
          />
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phoneNumber"
            value={teacherData.phoneNumber}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={teacherData.email}
            onChange={handleChange}
            required
          />
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={teacherData.address}
            onChange={handleChange}
          />
          <label>Số CCCD</label>
          <input
            type="text"
            name="cccd"
            value={teacherData.cccd}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Thông tin công tác</h3>
          <br />
          <label>Vị trí công tác</label>
          <br />
          <input
            type="text"
            name="teacherPositionsId"
            value={teacherData.teacherPositionsId}
            onChange={handleChange}
            required
          />
        </div>

        <div
          className="form-section"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h3>Học vị</h3>
          <div className="degree-inputs">
            <input
              type="text"
              placeholder="Bậc"
              name="level"
              value={newDegree.type}
              onChange={handleDegreeChange}
            />
            <br />
            <input
              type="text"
              placeholder="Trường"
              name="school"
              value={newDegree.school}
              onChange={handleDegreeChange}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Chuyên ngành"
              name="major"
              value={newDegree.major}
              onChange={handleDegreeChange}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Trạng thái"
              name="status"
              value={newDegree.isGraduated}
              onChange={handleDegreeChange}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Năm tốt nghiệp"
              name="graduationYear"
              value={newDegree.year}
              onChange={handleDegreeChange}
            />{" "}
            <br />
            <button type="button" onClick={addDegree}>
              Thêm
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Bậc</th>
                <th>Trường</th>
                <th>Chuyên ngành</th>
                <th>Trạng thái</th>
                <th>Tốt nghiệp</th>
              </tr>
            </thead>
            <tbody>
              {teacherData.degrees.map((degree, index) => (
                <tr key={index}>
                  <td>{degree.level}</td>
                  <td>{degree.school}</td>
                  <td>{degree.major}</td>
                  <td>{degree.isGraduated}</td>
                  <td>{degree.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default CreateTeacher;
