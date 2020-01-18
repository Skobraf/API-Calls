import React from "react";
import { formatDate } from "../helpers";

const GitRepo = props => {
  const {
    name,
    avatar,
    description,
    numbIssues,
    numbStars,
    authorName,
    timeInterval
  } = props.user;
  return (
    <section>
      <div>
        <img src={avatar} alt={name} />
      </div>
      <ul>
        <li>
          <h1>{name}</h1>
        </li>
        <li>
          <p>{description} </p>
        </li>
        <li>
          <div style={{ display: "inline-block" }}>
            <span>Stars: {numbStars}</span>
          </div>
          <div style={{ display: "inline-block" }}>
            <span>Issues: {numbIssues}</span>
          </div>
          <div style={{ display: "inline-block" }}>
            <p>
              Submited {formatDate(timeInterval)} days ago by: {authorName}
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default GitRepo;
