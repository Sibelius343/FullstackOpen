interface CoursePartBase {
  name: string,
  exerciseCount: number,
  type: string
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartDescription {
  type: 'normal'
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject',
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: 'submission',
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CoursePartDescription {
  type: 'special',
  requirements: Array<string>
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface HeaderType {
  courseName: string
}