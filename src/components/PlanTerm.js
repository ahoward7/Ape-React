export class PlanTerm {
    constructor(term) {
        this.term = term;
        this.courses = [];
    }

    // Getters
    getTerm() {
        return this.term;
    }

    getCourses() {
        return this.courses;
    }

    // Push course
    pushCourses(course) {
        this.courses.push(course);
    }
}
export default PlanTerm