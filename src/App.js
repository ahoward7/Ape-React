import React, {Component} from 'react'
import './App.css';
import Banner from './components/Banner'
import UR from './components/UR'
import UL from './components/UL'
import LL from './components/LL'
import LR from './components/LR'
import Term from './components/Term'
import Year from './components/Year'
import {Plan} from './components/Plan'
import {Course} from './components/Course'
import {Major} from './components/Major'
import {Category} from './components/Category'
import {PlanTerm} from './components/PlanTerm'
import {PlanYear} from './components/PlanYear'

var $ = require('jquery');

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  cat: null,
		  catalogArray: [],
		  plans: null,
		  myPlans: null,
		  reqs: null,
		  defaultMajor: null,
		  enrolled: null,
		  incr: 0,
		};
	}

	moveBackground() {
		var x = 0;
		setInterval(function(){
			x+=1;
			$('#background-div').css('background-position', x + 'px 0');
		}, 40);
	}
		
	loadNewPlan(){
		fetch("http://judah.cedarville.edu/~howard/getCourses.php")
		.then(response => response.json())
		.then(		
			data => this.setState({cat: data.catalog, plans: data.plans, reqs: data.requirements, defaultMajor: data.defMajor, enrolled: this.convertCourses(data.enrolled)})
		);
	}
 
    componentDidMount() {
		this.moveBackground();
      	this.loadNewPlan();
    }

	convertCourses(enrolled) {
		var myPlan = new Plan();
		$.each(enrolled, function (i, en) {
			myPlan.pushCourse(new Course(en.term, en.year, en.id, en.description, en.title, en.credits));
		});

		var array = myPlan.getCourseArray();
		let arrays = [];
		let years = [];
		let yearsObj = [];
		let unused = [];

		for (let i = 0; i < array.length; i++) {
			// Get year of current course
			let year = array[i].getYear();

			if (year == "") {
				unused.push(array[i]);
				continue;
			}

			// Push every course with the matching year into arrays
			if (!years.includes(year)) {
				years.push(year);
				yearsObj.push(new PlanYear(year));
			}
		}

		//-----------------Split into terms--------------------
		for (let i = 0; i < array.length; i++) {
			// Get year and term of each course
			let year = array[i].getYear();
			let term = array[i].getTerm();

			if (year == "" && term == "") {
				continue;
			}

			// Loop year array to compare year of current course
			for (let j = 0; j < years.length; j++) {
				let terms = yearsObj[j].getTerms();

				// Push term into year if it matches with current course
				if (year == years[j] && !terms.includes(term)) {
					yearsObj[j].pushTerms(term);
					yearsObj[j].pushTermsObj(new PlanTerm(term));
				}
			}
		}

		// Split into courses
		for (let i = 0; i < array.length; i++) {

			// Get year, term, and course of each course
			let year = array[i].getYear();
			let term = array[i].getTerm();

			if (year == "" && term == "") {
				continue;
			}

			let course = array[i];
			for (let j = 0; j < years.length; j++) {

				// Get integer and object term arrays
				let terms = yearsObj[j].getTerms();
				let termsObj = yearsObj[j].getTermsObj();

				for (let k = 0; k < terms.length; k++) {

					// Get course array of current term
					let courses = termsObj[k].getCourses();

					// Push course into array if term and year match
					if (year == years[j] && term == terms[k] && !courses.includes(course)) {
						termsObj[k].pushCourses(course);
					}
				}
			}
		}

		arrays.push(yearsObj);
		arrays.push(unused);

		return arrays;
	}

	render(){
	  return (
		<div className="App" id="main">
			<Banner plans={this.state.plans} defMaj={this.state.defaultMajor}/>
			<UL requirements={this.state.reqs} catalog={this.state.cat} />
			<UR plans={this.state.plans} catalog={this.state.cat} data={this.state.enrolled} defMaj={this.state.defaultMajor}/>
			<LL />
			<LR catalog={this.state.cat} />
		</div>		
	  );
	}
}
export default App;