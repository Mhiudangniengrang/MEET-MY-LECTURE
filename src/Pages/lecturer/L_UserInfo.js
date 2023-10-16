import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import L_Layout from "../../Layouts/L_Layout";
import L_SubjectList from "../../components/SubjectList_userinfo/L_SubjectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function L_UserInfo() {
  const location = useLocation();
  const formData = location.state.formData;
  const subjects = [
    { id: 1, name: "CEA201 - Computer Organization and Architecture" },
    { id: 2, name: "CSI104 - Introduction to Computing" },
    { id: 3, name: "CSI105 - Introduction to Computer Science - AI" },
    { id: 4, name: "SWP391 - Application Development Project" },
    { id: 5, name: "SWT301 - Software Testing" },
    { id: 6, name: "PRF192 - Programming Fundamentals Using" },
    { id: 7, name: "SWE102 - Introduction to Software Engineering" },
    { id: 8, name: "SWR301 - Software Requirement" },
    // Add more subjects here
  ];
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [major, setMajor] = useState("Select Major"); // Default major
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Initialize with an empty array for multi-selection
  const [enteredID, setEnteredID] = useState(""); // Initialize with an empty string

  const handleEnteredIDChange = (event) => {
    setEnteredID(event.target.value);
  };
  const handleSearch = (searchTerm) => {
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };

  const handleSubjectSelection = (subject) => {
    setSelectedSubjects([...selectedSubjects, subject]);
  };

  return (
    <L_Layout>
      <Container className="py-2">
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <div className="py-1 text-center m-0">
              <div className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon className="h5 px-2" icon={faUser} />
                <h3 className=" ">User Information</h3>
              </div>
            </div>
            <Card className="px-2">
              <CardBody>
                <div>
                  <p>Your Name: {formData.name}</p>
                  <p>Campus: {formData.campus}</p>
                  <p>Role: {formData.role}</p>
                  <p>
                    Lecture ID:{" "}
                    <input
                      className="rounded border mx-2"
                      type="text"
                      placeholder=" EnterID"
                      value={enteredID}
                      onChange={handleEnteredIDChange}
                      required
                    />
                  </p>
                  <FormGroup>
                    <label htmlFor="major">Major:</label>
                    <select
                      className="mx-2"
                      id="major"
                      name="major"
                      value={major}
                      onChange={handleMajorChange}
                      required
                    >
                      <option value="Select Major">Select Major</option>
                      <option value="">
                        Software Engineering (Kĩ thuật phần mềm)
                      </option>
                      <option value="">
                        Artificial Intelligence (AI) (Trí tuệ nhân tạo (AI))
                      </option>
                      <option value="">
                        Information Assurance (An toàn thông tin)
                      </option>
                      <option value="">
                        Information System - IS (Hệ thống thông tin)
                      </option>
                      <option value="">
                        Digital Art & Design (Thiết kế Mỹ thuật số)
                      </option>
                    </select>
                  </FormGroup>
                  <p className="my-3">Your teaching subjects:</p>
                  {selectedSubjects.map((subject) => (
                    <li key={subject.id}>{subject.name}</li>
                  ))}
                  <L_SubjectList
                    subjects={filteredSubjects}
                    onSearch={handleSearch}
                    onSubjectSelect={handleSubjectSelection}
                    required
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </L_Layout>
  );
}

export default L_UserInfo;
