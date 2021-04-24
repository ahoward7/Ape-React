export class PlanYear {

    // Constructor
    constructor(year) {
        this.year = year;
        this.termsObj = [];
        this.terms = [];
    }

    // Getters
    getYear() {
        return this.year;
    }

    getTerms() {
        return this.terms;
    }

    getTermsObj() {
        return this.termsObj;
    }

    // Array pushers
    pushTerms(term) {
        this.terms.push(term);
    }

    pushTermsObj(term) {
        this.termsObj.push(term);
    }
}
export default PlanYear