import React from 'react'

const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }

const Content = ({parts}) => {
return (
    <>
    {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </>
)
}

const Total = ({parts}) => {
const total = parts.reduce((s, p) => s + p.exercises, 0)

return (
    <>
    <p style={{fontWeight: 'bold'}}>
        Number of exercises {total}
    </p>
    </>
)
}

const Course = ({course}) => (
<div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
</div>
)

const Courses = ({courses}) => (
<>
    <h1 style={{fontSize: '250%'}}>Web development curriculum</h1>
    {courses.map(course => <Course key={course.id} course={course} />)}
</>  
)

export default Courses