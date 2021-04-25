import React, {Component, Fragment} from 'react';
import Term from './Term';

class Year extends Component {

	render (){
		if (this.props.data) {
			return (
				<Fragment>
					<Term catalog={this.props.catalog} data={this.props.data.termsObj} term="Spring" year={this.props.year}/>
					<Term catalog={this.props.catalog} data={this.props.data.termsObj} term="Summer" year={this.props.year}/>
					<Term catalog={this.props.catalog} data={this.props.data.termsObj} term="Fall" year={this.props.year}/>
				</Fragment>
			);
		}
	}
}
export default Year;
