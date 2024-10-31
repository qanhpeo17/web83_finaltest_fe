import React, { useEffect, useState } from "react";
import axios from "axios";
import "./teacherPos.css";
function TeacherPos() {
  const [teacherPos, setTeacherPos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(5);

  useEffect(() => {
    const fetchTeacherPos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9010/api/v1/teacher-positions"
        );

        if (Array.isArray(response.data.positions)) {
          setTeacherPos(response.data.positions);
        } else {
          throw new Error("Dữ liệu trả về không phải là mảng.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherPos();
  }, []);

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teacherPos.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const totalPages = Math.ceil(teacherPos.length / teachersPerPage);

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
    <div className="wrapper">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã</th>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>Mô tả</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((pos) => (
            <tr key={pos._id}>
              <td>{}</td>
              <td>{pos.code}</td>
              <td>{pos.name}</td>
              <td>
                {pos.isActive ? (
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
                    Hoạt động
                  </p>
                ) : (
                  <p
                    style={{
                      background: "red",
                      width: "fit-content",
                      textAlign: "center",
                      padding: "5px 9px",
                      borderRadius: "1rem",
                      color: "#fff",
                    }}
                  >
                    Không hoạt động
                  </p>
                )}
              </td>{" "}
              <td>{pos.des}</td>
              <td>
                <a href="#">chỉnh sửa</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
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
}

export default TeacherPos;
