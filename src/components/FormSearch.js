import React, { useEffect, useState } from "react";
import { Container, Form, ListGroup, Button, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import axios from "../Services/customizeAxios";
const FormSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchSubject, setSearchSubject] = useState([]);
  const [searchLecture, setSearchLecture] = useState([]);
  const [filterData, setFilterData] = useState("lecturer"); // Corrected the typo in the state name
  useEffect(() => {
    setSearchText("");
    setSearchSubject([]);
    setSearchLecture([]);
  }, [filterData]);

  const handleSearchSubject = async () => {
    await axios
      .get(`/api/v1/student/searching/subject`, {
        params: {
          keyword: searchText,
        },
      })
      .then((res) => {
        res.map((result) => {
          // console.log(res);
          setSearchSubject((prev) => [...prev, result]);
        });
      })
      .catch((error) => {
        console.log("error at searchname:" + error);
      });
  };
  const handleSearchLecture = async () => {
    await axios
      .get(`/api/v1/student/searching/lecturer`, {
        params: {
          name: searchText,
        },
      })
      .then((res) => {
        res.map((result) => {
          // console.log(res);
          setSearchLecture((prev) => [...prev, result]);
        });
      })
      .catch((error) => {
        console.log("error at searchname:" + error);
      });
  };
  const handleSearch = async (e) => {
    e.preventDefault();

    setSearchSubject([]);
    setSearchLecture([]);

    if (filterData === "lecturer") {
      handleSearchLecture(e);
    } else if (filterData === "subject") {
      handleSearchSubject(e);
    }
  };

  return (
    <Container>
      <div>
        <div
          style={{
            maxWidth: "30vw",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: "40px",
          }}
        >
          <label className="pe-2" id="search_label" htmlFor="search">
            Search for:{" "}
          </label>
          <form
            id="search"
            className="form pe-0"
            style={{ display: "flex", flex: "1" }}
          >
            <select
              className="form-select pe-0"
              style={{ maxWidth: "150px", marginRight: "10px" }}
              onChange={(e) => setFilterData(e.target.value)}
              value={filterData}
            >
              <option value="lecturer">Lecturer</option>
              <option value="subject">Subject</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="me-2 p-1"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="secondary" type="submit" onClick={handleSearch}>
              <NavLink>Go</NavLink>
            </Button>
          </form>
        </div>
      </div>

      {filterData === "lecturer" && searchLecture.length > 0 && (
        <div>
          <p>Search Results: {searchLecture.length} result(s) found</p>
        </div>
      )}

      {filterData === "lecturer" && searchLecture.length > 0 && (
        <div>
          <ListGroup>
            {searchLecture.map((teacher, index) => (
              <ListGroup.Item
                style={{
                  border: "none",
                }}
                key={index}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    Teacher: {teacher.lecturerName}
                    <div className="mx-4 small">
                      <div>Subject: {teacher.subjectId}</div>
                    </div>
                  </div>
                  <div className="d-flex">
                    Subject:
                    <FontAwesomeIcon
                      className="mx-1 my-1"
                      icon={faCalendarDays}
                    />{" "}
                    <div
                      onClick={() => handleClickSubject(teacher.subjectName)}
                    >
                      {teacher.subjectName}
                    </div>
                    <FontAwesomeIcon
                      className="mx-2 my-1"
                      icon={faMagnifyingGlass}
                      onClick={handleSearch}
                    />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      {filterData === "subject" && searchSubject.length > 0 && (
        <div>
          <p>Search Results: {searchSubject.length} result(s) found</p>
        </div>
      )}

      {filterData === "subject" && searchSubject.length > 0 && (
        <div>
          <ListGroup>
            {searchSubject.map((subject, index) => (
              <ListGroup.Item
                style={{
                  border: "none",
                }}
                key={index}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div>Subject: {subject.subjectId}</div>
                    <div className="mx-4 small">
                      Teacher: {subject.lecturerName}
                    </div>
                  </div>
                  <div className="d-flex">
                    Subject:
                    <FontAwesomeIcon
                      className="mx-1 my-1"
                      icon={faCalendarDays}
                    />{" "}
                    <div
                      onClick={() => handleClickSubject(subject.subjectName)}
                    >
                      {subject.subjectName}
                    </div>
                    <FontAwesomeIcon
                      className="mx-2 my-1"
                      icon={faMagnifyingGlass}
                      onClick={handleSearch}
                    />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </Container>
  );
};

export default FormSearch;
