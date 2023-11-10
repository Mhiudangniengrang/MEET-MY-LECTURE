import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
const FormSearch = () => {
  const { filter, search } = useParams()
  const [searchText, setSearchText] = useState(search);
  const [filterData, setFilterData] = useState("lecturer");
  return (
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
            style={{ minWidth: "100px", maxWidth: "150px", marginRight: "10px" }}
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
          <Button variant="secondary">
            <Link
              to={`/student/search/${filterData}/${searchText}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Go
            </Link>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormSearch;