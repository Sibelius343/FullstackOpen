import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({courses}: { courses: Array<CoursePart> }) => (
  <>
    {courses.map(c => <Part key={c.name} coursePart={c} />)}
  </>
);

export default Content;