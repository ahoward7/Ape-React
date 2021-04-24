export class Major {
    constructor(major) {
        this.major = major;
        this.categories = [];
        this.categoriesObj = [];
    }

    getMajor() {
        return this.major;
    }

    getCategories() {
        return this.categories;
    }

    getCategoriesObj() {
        return this.categoriesObj;
    }

    pushCategory(cat) {
        this.categories.push(cat);
    }

    pushCategoryObj(cat) {
        this.categoriesObj.push(cat);
    }
};