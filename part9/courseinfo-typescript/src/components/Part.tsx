import React from "react";
import { CoursePart } from '../types';

const assertNever = (part: never): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(part)}`
  );
}

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <div>
          <h4>{coursePart.name}</h4>
          exercises: {coursePart.exerciseCount}
          <div>
            {coursePart.description && <i>{coursePart.description}</i>}
          </div>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h4>{coursePart.name}</h4>
          exercises: {coursePart.exerciseCount}
          <br />
          group project count: {coursePart.groupProjectCount}
        </div>
      );
    case 'submission':
      return (
        <div>
          <h4>{coursePart.name}</h4>
          exercises: {coursePart.exerciseCount}
          <div>
            {coursePart.description && <i>{coursePart.description}</i>}
          </div>
          submission link: <a href={coursePart.exerciseSubmissionLink}>
            {coursePart.exerciseSubmissionLink}
          </a>
        </div>
      );
    case 'special':
      return (
        <div>
          <h4>{coursePart.name}</h4>
          exercises: {coursePart.exerciseCount}
          <div>
            {coursePart.description && <i>{coursePart.description}</i>}
          </div>
          required skills: {coursePart.requirements.join(', ')}
        </div>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part;