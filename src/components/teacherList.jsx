import React, { useEffect, useState } from "react";
import axios from "axios";
import "./teacherList.css";
const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(5);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9010/api/v1/teachers"
        );

        if (Array.isArray(response.data.teachers)) {
          setTeachers(response.data.teachers);
        } else {
          throw new Error("Dữ liệu trả về không phải là mảng.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const totalPages = Math.ceil(teachers.length / teachersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="teacher-list">
      <div className="header">
        <input
          type="text"
          placeholder="Tìm kiếm thông tin"
          className="search"
        />
        <button
          className="refresh"
          style={{ color: "#000", background: "grey" }}
        >
          Tải lại
        </button>
        <button className="add" style={{ color: "#000", background: "grey" }}>
          Tạo mới
        </button>
      </div>
      <table className="teacher-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Giáo viên</th>
            <th>Trình độ (cao nhất)</th>
            <th>Bộ môn</th>
            <th>TT Công tác</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.code}</td>
              <td>{teacher.name || "N/A"}</td>
              <td>
                {teacher.degrees?.map((degree, index) => (
                  <p key={index}>{degree.type}</p>
                )) || "N/A"}
              </td>
              <td>N/A</td>
              <td>
                {teacher.degrees?.map((degree, index) => (
                  <p key={index}>{degree.school}</p>
                )) || "N/A"}
              </td>
              <td>{teacher.address}</td>
              <td>
                {teacher.isActive ? (
                  <p
                    style={{
                      background: "#4CAF50",
                      width: "fit-content",
                      textAlign: "center",
                      padding: "5px 9px",
                      borderRadius: "1rem",
                      color: "#fff",
                    }}
                  >
                    Đang công tác
                  </p>
                ) : (
                  "Không công tác"
                )}
              </td>
              <td>
                <a href="#">Xem chi tiết</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TeacherList;
