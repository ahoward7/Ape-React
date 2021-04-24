import React, {Component} from 'react';

class Term extends Component {
	
	render (){
		let courses = null;
		if (this.props.data) {
			const courseList = this.props.data;
			courses = Object.entries(courseList).map(([key,value]) => {
				const courseName = key + " " + this.props.catalog.id;
				return (
					courseName
				);	
			});
		}
		
		
		const semId = this.props.term + "1";
		const sem = this.props.term + " " + this.props.year;
		return (
		<div class="semesters" id={semId}>
			<span class="semester-header">
				<span class="credits">Hours: 0</span>
				<span class = "semester-term">{sem}</span>
				<span class = "world-name">W4</span>
			</span>
			<div class="class-column">
				{courses}
			</div>
		</div>
	  	);
	}
}

export default Term;
