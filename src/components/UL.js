import React, {Component} from 'react';

class UL extends Component {
	
    render () {
        let core = null;
        let cognate = null;
        let elective = null;
        let cores = [];
        let cognates = [];
        let electives = [];

        if (this.props.requirements) {
            const reqs = this.props.requirements;

            for (let i = 0; i < reqs.length; i++) {
                if (reqs[i].major === this.props.major && reqs[i].categoryName.includes("Core")) {
                    cores.push(reqs[i].courseID + " " + reqs[i].title);
                }
            }

            for (let i = 0; i < reqs.length; i++) {
                if (reqs[i].major === this.props.major && reqs[i].categoryName.includes("Cognates")) {
                    cognates.push(reqs[i].courseID + " " + reqs[i].title);
                }
            }

            for (let i = 0; i < reqs.length; i++) {
                if (reqs[i].major === this.props.major && reqs[i].categoryName.includes("Electives")) {
                    electives.push(reqs[i].courseID + " " + reqs[i].title);
                }
            }

            core = cores.map((req) => {
                return (
                    req
                );
            })

            cognate = cognates.map((req) => {
                return (
                    req
                );
            })

            elective = electives.map((req) => {
                return (
                    req
                );
            })
            

            return (
                <div id="side-board">
                <   span class="side-header">~ Requirements ~</span>
                    <div class="accordion">
                        <h1 id="accordion-header1">Core</h1>
                        <div id="accordion-item1" class="accordion-item">
                            <div id="core-column" class="class-column">
                               {core.map(course => (
                                   <span class="semester-class" draggable="true">{course}</span>
                               ))}
                            </div>
                            <div id="goomba1"></div>
                        </div>
    
                        <h1 id="accordion-header2">Cognates</h1>
                        <div id="accordion-item2" class="accordion-item">
                            <div id="cognate-column" class="class-column">
                                {cognate.map(course => (
                                   <span class="semester-class" draggable="true">{course}</span>
                                ))}
                            </div>
                            <div id="goomba2"></div>
                        </div>
    
                        <h1 id="accordion-header3">Electives</h1>
                        <div id="accordion-item3" class="accordion-item">
                            <div id="elective-column" class="class-column">
                                {elective.map(course => (
                                   <span class="semester-class" draggable="true">{course}</span>
                                ))}
                            </div>
                            <div id="goomba3"></div>
                        </div>
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

export default UL;