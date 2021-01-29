import React, { useState, useEffect } from "react";
import Student from "../Student";
import "./Main.css";

const Main = () => {
  const [students, setStudents] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    if (students.length == 0) {
      fetch("https://www.hatchways.io/api/assessment/students")
        .then((response) => response.json())
        .then((data) => {
          if (data.students) {
            const studentList = [];
            for (const student of data.students) {
              studentList.push({ ...student, tags: [] });
            }
            setStudents(studentList);
          }
        });
    }
  }, [students]);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "80%",
        marginLeft: "10%",
        height: "80%",
        marginTop: "5%",
        position: "absolute",
        overflow: "scroll",
        borderRadius: "10px",
        boxShadow: "0 0 4px rgb(220, 220, 220)",
      }}
    >
      <form>
        <input
          type="text"
          id="name-input"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
          placeholder="Search by name"
        />
        <input
          type="text"
          id="tag-input"
          value={tagFilter}
          onChange={(event) => {
            setTagFilter(event.target.value);
          }}
          placeholder="Search by tags"
        />
      </form>
      {students.length == 0 && (
        <p style={{ color: "red" }}>students are being loaded</p>
      )}
      {students
        .filter(
          (student) =>
            (student.firstName
              .toUpperCase()
              .startsWith(nameFilter.toUpperCase()) ||
              student.lastName
                .toUpperCase()
                .startsWith(nameFilter.toUpperCase())) &&
            (tagFilter === "" ||
              student.tags.filter((tag) =>
                tag.toUpperCase().startsWith(tagFilter.toUpperCase())
              ).length >= 1)
        )
        .map((student, index) => (
          <div>
            {index !== 0 && (
              <hr style={{ border: "1px solid rgb(240, 240, 240)" }} />
            )}
            <Student info={student} />
          </div>
        ))}
    </div>
  );
};

export default Main;
