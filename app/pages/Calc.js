import React from "react";
import CountUp from 'react-countup';

export default class Calc extends React.Component {
    render() {
        return (
            <div>
              <h1 className="price">
                $<CountUp setParent={this.setParent} start={this.props.oldEstimate} end={this.props.newEstimate} />
              </h1>
            </div>
        );
    }
}