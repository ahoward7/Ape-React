import React, {Component} from 'react'
import './App.css';
import Banner from './components/Banner'
import UR from './components/UR'
import UL from './components/UL'
import LL from './components/LL'
import LR from './components/LR'
import {Plan} from './components/Plan'
import {Course} from './components/Course'
import {Major} from './components/Major'
import {Category} from './components/Category'
import {PlanTerm} from './components/PlanTerm'
import {PlanYear} from './components/PlanYear'
import DataTable from 'datatables.net';

var $ = require('jquery');

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  cat: null,
		  catalogArray: null,
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
			data => this.setState({cat: data.catalog, plans: data.plans, reqs: data.requirements, defaultMajor: data.defMajor, 
				enrolled: this.convertCourses(data.enrolled), catalogArray: this.initCatalog(data.catalog)})
		);
	}
 
    componentDidMount() {
		this.initCatalog();
		this.loadNewPlan();
		this.moveBackground();
		this.startUp();
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

	initCatalog() {
		let array = [];

		$.each(this.state.cat, function (i, course) {
			let id = course.id;
			let name = course.title;
			let credits = course.credits;
	
			let myCourse = [];
			myCourse.push(id);
			myCourse.push(name);
			myCourse.push(credits);
			array.push(myCourse);
		});

		return array;
	}

	startUp() {
		$('#data-table').DataTable({
			paging: false,
			"dom": "lifrtp",
			fixedColumns: {
				heightMatch: 'none'
			},
		});

		$(".delete").hide();

		setTimeout(this.makeAccordion, 100);

		$(document).on("click", ".delete", function(e) {
			var hours = parseInt(e.target.parentNode.parentNode.parentNode.children[0].children[0].innerHTML.substr(7));
			var combined = e.target.parentNode.innerHTML;
			var myCourse = combined.substr(0, combined.length - 38);
	
			//this.markRequirements();
	
			const courses = () => {
				return this.state.catalogArray;
			}
			
			$.each(courses, function (i, course) {
				if (myCourse.includes(course.getID())) {
					hours -= course.credits;
					return false;
				}
			});
	
			e.target.parentNode.parentNode.parentNode.children[0].children[0].innerHTML = "Hours: " + hours;
	
			$(this).parent().remove();
		});

		$(document).on("mouseenter", ".semester-class", function(e) {
			$(this).find(".delete").show();
		});
		$(document).on("mouseleave", ".semester-class", function(e) {
			$(this).find(".delete").hide();
		});
	
		//----------------------------Make Semesters Drag and Drop----------------------------------Beginning
		var dragged;
		var ID;
		var tableID;
	
		/* events fired on the draggable target */
		document.addEventListener("drag", function (event) {
	
		}, false);
	
		document.addEventListener("dragstart", function (event) {
			dragged = event.target;
			ID = $(dragged).parent().attr('id');
			tableID = $(dragged).attr('id');
	
			// make it half transparent
			if (ID != "core-column" && ID != "cognate-column" && ID != "elective-column") {
				event.target.style.opacity = .4;
			}
	
			// make courses unselectable while dragging
			$(".semester-class").not(dragged).css("pointer-events", "none");
	
		}, false);
	
		document.addEventListener("dragend", function (event) {
			// reset the transparency
			event.target.style.opacity = "";
		}, false);
	
		/* events fired on the drop targets */
		document.addEventListener("dragover", function (event) {
			// prevent default to allow drop
			event.preventDefault();
		}, false);
	
		document.addEventListener("dragenter", function (event) {
			// highlight potential drop target when the draggable element enters it
			if (event.target.className == "class-column") {
				event.target.style.background = "";
			}
	
		}, false);
	
		document.addEventListener("dragleave", function (event) {
			// reset background of potential drop target when the draggable element leaves it
			if (event.target.className == "class-column") {
				event.target.style.background = "";
			}
	
		}, false);
	
		document.addEventListener("drop", function (event) {
			// make classes selectable again
	
			$(".semesters").each(function (i, sem) {
				if ($(sem).css("opacity") == 0.6) {
					$(sem).find(".semester-class").css("pointer-events", "none");
				}
				else {
					$(sem).find(".semester-class").css("pointer-events", "auto");
				}
			});
	
			$(".accordion-item").each(function (i, acc) {
				$(acc).find(".semester-class").css("pointer-events", "auto");
			});
	
			// prevent default action (open as link for some elements)
			event.preventDefault();
			// move dragged elem to the selected drop target
	
			if (event.target.className == "class-column") {
				event.target.style.background = "";
	
				// Get the hours of the div dragging the course from and to
				let afterHours = event.target.parentNode.children[0].children[0].innerHTML;
				let beforeHours = dragged.parentNode.parentNode.children[0].children[0].innerHTML;
	
				// Parse the hours out of the string
				let aHours = parseInt(afterHours.substr(7));
				let bHours = parseInt(beforeHours.substr(7));
	
				let semesterVal = event.target.parentNode.children[0].innerHTML;
				let term = semesterVal.substr(0, semesterVal.indexOf(' '));
				let year = semesterVal.substr(semesterVal.indexOf(' ') + 1, [4]);

				//let courses = this.state.catalogArray;
				
				const courses = () => {
					return this.state.catalogArray;
				}
				
				let courseVal = dragged.innerHTML;
	
				for (let i = 0; i < courses.length; i++) {
					let courseName = courses[i].getID();
	
					// Change year and term of course when dragged to another semester
					if (~courseVal.indexOf(courseName) != 0) {
						courses[i].setTerm(term);
						courses[i].setYear(year);
						aHours += parseInt(courses[i].getCredits());
						bHours -= parseInt(courses[i].getCredits());
						break;
					}
				}
	
				// Don't do anything with hours if putting the course back in the same semester
				if (event.target != dragged.parentNode) {
					if ($(event.target).attr("id") == "core-column" || $(event.target).attr("id") == "cognate-column" || $(event.target).attr("id") == "elective-column") {
	
					}
					else if (tableID == "table-row") {
						const courses = () => {
							return this.state.catalogArray;
						}

						$.each(courses, function (i, allCourse) {
							if (dragged.innerHTML.includes(allCourse[0])) {
								event.target.parentNode.children[0].children[0].innerHTML = "Hours: " + aHours;
								var course = $('<span />', {
									'class': 'semester-class',
									draggable: 'true',
									text: allCourse[0] + " " + allCourse[1],
								});
	
								$('<span />', {
									'class': 'delete',
									text: 'X',
								}).appendTo($(course));
	
								$(course).appendTo($(event.target));
								return false;
							}
						});
					}
					else if (ID != "core-column" && ID != "cognate-column" && ID != "elective-column") {
						event.target.parentNode.children[0].children[0].innerHTML = "Hours: " + aHours;
						dragged.parentNode.parentNode.children[0].children[0].innerHTML = "Hours: " + bHours;
	
						// Remove course from current semester and move to where it was dropped
						dragged.parentNode.removeChild(dragged);
						event.target.appendChild(dragged);
					}
					else {
						event.target.parentNode.children[0].children[0].innerHTML = "Hours: " + aHours;
	
						var course = $('<span />', {
							'class': 'semester-class',
							draggable: 'true',
							text: dragged.innerHTML,
						});
	
						$('<span />', {
							'class': 'delete',
							text: 'X',
						}).appendTo($(course));
	
						$(course).appendTo($(event.target));
					}
				}
			}
	
			let totHours = 0;
			$(".credits").each(function (i, creds) {
				totHours += parseInt($(creds).html().substr(7));
			});
	
			$("#total-hours").html("Total Hours: " + totHours)
	
			//this.markRequirements();
		}, false);
	}

	makeAccordion () {
		var previous;
		var firstClick = false;
		// Accordian Function
		$(".accordion h1").click(function () {
			var id = this.id;

			if (previous != null && $(this).html() == previous.html()) {
				return;
			}
			else if (!firstClick) {
				firstClick = true;
				previous = $(this)
				$(".accordion-item").each(function () {
					if ($("#" + id).next()[0].id != this.id) {
						$(this).slideUp();
					}
				});

				$(this).next().toggle();
				return
			}

			previous = $(this);
			$(".accordion-item").each(function () {
				if ($("#" + id).next()[0].id != this.id) {
					$(this).slideUp(300);
				}
			});

			$(this).next().toggle(300);
		});

		$("#accordion-header1").trigger('click');
	}

	markRequirements() {
		let courseArray = [];
	
		$(".semesters").find(".semester-class").each(function (i, course) {
			courseArray.push($(course).html())
		});
	
		$(".accordion-item").find(".semester-class").each(function (i, course) {
			$(this).css("padding", "0");
			var enrolled = false;
	
			$.each(courseArray, function(k, combined) {
				combined = combined.substr(0, combined.length - 52);
				if ($(course).html() == combined) {
					$(course).css("color", "green");
					enrolled = true;
				}
			});
	
			if (!enrolled) {
				$(course).css("color", "brown");
			}
		});
	}

	render(){
		return (
			<div className="App" id="main">
				<Banner plans={this.state.plans} defMaj={this.state.defaultMajor}/>
				<UR plans={this.state.plans} catalog={this.state.cat} data={this.state.enrolled} defMaj={this.state.defaultMajor}/>
				<LL />
				<LR catalog={this.state.cat}/>
				<UL requirements={this.state.reqs} catalog={this.state.cat}  major={this.state.defaultMajor}/>
			</div>		
		);
	}
}
export default App;