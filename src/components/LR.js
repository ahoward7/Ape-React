import React, {Component} from 'react';

class LR extends Component {
	
    render () {
        if (this.props.catalog) {
            return (
                <React.Fragment>
                    <div id="mush-border">
                    <div id="bottom-board">
                        <span class="bottom-header">~ Course Finder ~</span>
                        <table id="data-table" class="display" width="99%">
                            <thead>
                                <tr>
                                    <th id="bottom-left-header">Designator</th>
                                    <th id="bottom-middle-header">Title</th>
                                    <th id="bottom-right-header">Credits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.catalog.map(course => (
                                    <tr draggable="true" id="table-row">
                                        <td id="bottom-left">{course.id}</td >
                                        <td id="bottom-middle">{course.name}</td>
                                        <td id="bottom-right">{course.credits}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
    
                    <div id="lakitu">
                        <span id="back-to-projects">Back to Projects</span>
                    </div>
                    </div>
                    <div id="mush-border-left"></div>
                    <div id="mush-border-right"></div>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment></React.Fragment>
            );
        }
    }
}

export default LR;