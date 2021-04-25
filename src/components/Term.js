import React, {Component} from 'react';

var $ = require('jquery');
class Term extends Component {

	render (){
		let courses = null;
		let term = "";
		let index = 4;
		if (this.props.data) {
			
			for (let i = 0; i < 3; i++) {
				if (this.props.data[i] && this.props.data[i].term === this.props.term) {
					index = i;
					term = this.props.term;
				}
			}

			if (index !== 4) {
				const courseList = this.props.data[index].courses;
				courses = Object.entries(courseList).map(([key,value]) => {
					const courseName = value.ID + " " + value.name;

					return (
						courseName
					);	
				});
			}
		}

		if (term === this.props.term) {
			const semId = term + "1";
			const sem = term + " " + this.props.year;
			return (
			<div class="semesters" id={semId}>
				<span class="semester-header">
					<span class="credits">Hours: 0</span>
					<span class = "semester-term">{sem}</span>
					<span class = "world-name">W4</span>
				</span>
				<div class="class-column">
					{courses.map(course => (
						<span class="semester-class" draggable="true">
							{course}
							<span class="delete">X</span>
						</span>
					))}
				</div>
			</div>
			);
		}
		else if (term === "" && this.props.term === "Summer" && this.props.year !== 2018) {
			const semId = term + "1";
			const sem =  "Summer " + this.props.year;
			return (
			<div class="semesters" id={semId}>
				<span class="semester-header">
					<span class="credits">Hours: 0</span>
					<span class = "semester-term">{sem}</span>
					<span class = "world-name">W4</span>
				</span>
				<div class="class-column">
					
				</div>
			</div>
			);
		}
		else {
			return (
				<React.Fragment></React.Fragment>
			);
		}
	}
}

export default Term;
