import React from "react";
import { CoursePart } from "../types";

const Total = ({ courses }: {courses: Array<CoursePart> }) => (
  <>
    <p>
      Number of exercises{" "}
      {courses.reduce((total: number, current) => (
      total + current.exerciseCount
      ), 0)}
    </p>
  </>
)

export default Total;