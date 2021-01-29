import React, { useMemo, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./Student.css";

const Student = (props) => {
  const {
    company,
    email,
    firstName,
    grades,
    lastName,
    pic,
    skill,
    tags,
  } = props.info;

  const [expanded, setExpanded] = useState(false);
  const [addTag, setAddTag] = useState("");

  const average = useMemo(() => {
    let average = 0;
    for (const grade of grades) {
      average += parseInt(grade, 10);
    }
    return average / grades.length;
  }, [grades]);

  return (
    <div>
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            width: "20vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={pic} className="profile-pic" />
        </div>
        <div
          style={{
            width: "calc(100% - 20vh - 50px)",
            justifyContent: "flex-start",
            alignItems: "left",
          }}
        >
          <p className="name">
            {firstName} {lastName}
          </p>
          <p>Email: {email}</p>
          <p>Company: {company}</p>
          <p>Skill: {skill}</p>
          <p>Average: {average}%</p>
        </div>
        <div className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <RemoveIcon
              style={{ fontSize: "50px", color: "rgb(169, 169, 169)" }}
            />
          ) : (
            <AddIcon
              style={{ fontSize: "50px", color: "rgb(169, 169, 169)" }}
            />
          )}
        </div>
      </div>
      {expanded && (
        <div
          style={{
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "20vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {grades.map((grade, index) => (
            <p>
              Test {index + 1}: {grade}%
            </p>
          ))}
          <div style={{ display: "flex", paddingLeft: "25px" }}>
            {tags.map((tag) => (
              <div className="tag">{tag}</div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <form>
              <input
                type="text"
                id="add-tag-input"
                value={addTag}
                onChange={(event) => setAddTag(event.target.value)}
                placeholder="Add a tag"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    tags.push(addTag);
                    setAddTag("");
                  }
                }}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
