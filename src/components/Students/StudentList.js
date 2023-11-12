import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents, deleteStudent } from "../../redux/StudentSlice.js";
import "./student.css";
const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.data);
  const status = useSelector((state) => state.students.status);

  const [deletingIds, setDeletingIds] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllStudents());
    }
  }, [status, dispatch]);

  const handleDelete = async (id) => {
    setDeletingIds((prev) => [...prev, id]);
    await dispatch(deleteStudent(id));
    setDeletingIds((prev) => prev.filter((studentId) => studentId !== id));
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        {status === "loading" ? (
          <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
        ) : (
          students?.map((student) => (
            <Col md={4} sm={6} xs={12} key={student._id}>
              <Card className="mb-4 shadow">
                <Card.Body>
                  <Card.Title className="text-primary">
                    {student.name}
                  </Card.Title>
                  <Card.Text>
                    <strong>Grade:</strong> {student.grade}
                  </Card.Text>
                  <Card.Text>
                    <strong>Gender:</strong> {student.gender}
                  </Card.Text>
                  <Card.Text>
                    <strong>Age:</strong> {student.age}
                  </Card.Text>
                  <Card.Text>
                    <strong>Attendance:</strong> {student.attendance}
                  </Card.Text>
                  <Card.Text>
                    <strong>Marks:</strong> {student.marks}
                  </Card.Text>
                  <Link
                    to={`/student/edit/${student._id}`}
                    className="mr-3 text-warning"
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </Link>
                  {deletingIds.includes(student._id) ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <span
                      className="text-danger"
                      onClick={() => handleDelete(student._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Link
        to="/student/add"
        className="btn btn-primary btn-circle btn-lg fixed-bottom m-3"
      >
        <i className="fas fa-plus"></i>
      </Link>
    </Container>
  );
};

export default StudentList;
