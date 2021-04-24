export class Plan {

    // Constructor
    constructor() {
        this.plan = "";
        this.year = "";
        this.major = "";
        this.student = "";
        this.semester = "";
        this.startYear = "";
        this.courseArray = [];
        this.unusedCourseArray = [];
    }

    // Getters
    getPlanName() {
        return this.plan;
    }

    getYear() {
        return this.year;
    }

    getMajor() {
        return this.major;
    }

    getStudent() {
        return this.student;
    }

    getTerm() {
        return this.semester;
    }

    getStartYear() {
        return this.startYear;
    }

    getCourseArray() {
        return this.courseArray;
    }

    getUnusedArray() {
        return this.unusedCourseArray;
    }

    getCourse(num) {
        return this.courseArray[num];
    }

    // Setters
    setPlan(plan) {
        this.plan = plan;
    }

    setYear(year) {
        this.year = year;
    }

    setMajor(major) {
        this.major = major;
    }

    setStudent(student) {
        this.student = student;
    }

    setSemester(semester) {
        this.semester = semester;
    }

    setStartYear(year) {
        this.startYear = year;
    }
    // Push course
    pushCourse(course) {
        this.courseArray.push(course);
    }

    pushUnusedCourse(course) {
        this.unusedCourseArray.push(course);
    }
};