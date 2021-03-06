import React, {Component, Fragment} from 'react';
import Year from './Year';

class UR extends Component {
	render (){
	  //var yrs = "";
	  if (this.props.plans) {
	  	var plan = this.props.plans.map((plan) => {
			if (plan.major === this.props.defMaj) {
				return (
					<Fragment>
						<Year catalog={this.props.catalog} year={plan.startYear} data={this.props.data[0][0]} />
						<Year catalog={this.props.catalog} year={plan.startYear + 1} data={this.props.data[0][1]} />
						<Year catalog={this.props.catalog} year={plan.startYear + 2} data={this.props.data[0][2]} />
						<Year catalog={this.props.catalog} year={plan.startYear + 3} data={this.props.data[0][3]} />
						<Year catalog={this.props.catalog} year={plan.startYear + 4} data={this.props.data[0][4]} />
					</Fragment>
				);	
			}
		});
	  
		// yrs = this.props.plan.years.map((value, key) => {
		//   return (
		// 	  <Year catalog={this.props.catalog} year={key} data={value} />
		//   );		
	    // });
	  }
	  return (
		<div id="main-board">
			<span class="main-header">~ Academic Plan Fall 2016 ~</span>
			{plan}
		</div>
	  );
	}	
}

export default UR;
