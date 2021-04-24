import React, {Component, Fragment} from 'react';
import Term from './Term';

class Year extends Component {

	render (){

		return (
			<Fragment>
				<Term catalog={this.props.catalog} data={this.props.data['Fall']} term="Fall" year={this.props.year}/>
				<Term catalog={this.props.catalog} data={this.props.data['Spring']} term="Spring" year={this.props.year + 1}/>
				<Term catalog={this.props.catalog} data={this.props.data['Summer']} term="Summer" year={this.props.year + 1}/>
			</Fragment>
		);
	}
}
export default Year;
