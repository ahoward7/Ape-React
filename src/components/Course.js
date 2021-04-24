export class Course {

    // Constructor
    constructor(term, year, courseID, description, courseName, credits) {
        this.term = term;
        this.year = year;
        this.description = description;
        this.ID = courseID;
        this.name = courseName;
        this.credits = credits;
    }

    // Getters
    getTerm() {
        return this.term;
    }

    getYear() {
        return this.year;
    }

    getID() {
        return this.ID;
    }

    getDescription() {
        return this.description;
    }

    getName() {
        return this.name;
    }

    getCredits() {
        return this.credits;
    }

    // Setters
    setTerm(term) {
        this.term = term;
    }

    setYear(year) {
        this.year = year;
    }
};