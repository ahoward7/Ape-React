import React, {Component} from 'react';

class Banner extends Component {

	render (){
		if (this.props.plans) {
			var info = this.props.plans.map((plan) => {
				if (plan.major === this.props.defMaj) {
					return (
						<React.Fragment>
							<div id="student" class="header-info">Student: {plan.studentName}</div>
							<div id="catalog" class="header-info">Catalog: {plan.catYear}</div>
							<select id="major-select">
								<option>{plan.major}</option>
							</select>
						</React.Fragment>
					);	
				}
		  	});
		}

		return(
			<div id="banner">
				<div id="background-div"></div>
				<span class="header" id="grape">World 4 - APE</span>
				<div id="major" class="header-info">Major: </div>
				{info}
				<div id="log-out">Log Out</div>
				<div id="total-hours"></div>
				<div id="minor" class="header-info">Minor: Bible</div>
			</div>
		);
	}	
}

export default Banner;