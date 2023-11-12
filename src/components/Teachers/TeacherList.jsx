import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteTeacher, fetchAllTeachers } from "../../redux/TeacherSlice.js";

const TeacherList = () => {
  const teachers = useSelector((state) => state.teachers?.data);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTeacher(id));
  };
  useEffect(() => {
    dispatch(fetchAllTeachers());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row>
        {teachers?.map((teacher) => (
          <Col md={4} sm={6} xs={12} key={teacher._id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{teacher.name}</Card.Title>
                <Card.Text>Subject: {teacher.subject}</Card.Text>
                <Card.Text>Contact: {teacher.contact}</Card.Text>
                <Link to={`/teacher/edit/${teacher._id}`}>
                  <i className="fas fa-pencil-alt mr-3"></i>
                </Link>
                <i
                  className="fas fa-trash-alt"
                  onClick={() => handleDelete(teacher._id)}
                ></i>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/teacher/add" className="btn btn-primary btn-circle btn-lg">
        <i className="fas fa-plus"></i>
      </Link>
    </Container>
  );
};

export default TeacherList;
