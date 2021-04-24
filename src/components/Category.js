export class Category {
    constructor(category) {
        this.category = category;
        this.courses = [];
    }

    getCategory() {
        return this.category;
    }

    getCourses() {
        return this.courses;
    }

    pushCourse(cat) {
        this.courses.push(cat);
    }
};