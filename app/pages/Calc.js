import React from "react";
import CountUp from 'react-countup';

export default class Calc extends React.Component {
    render() {
        return (
            <div>
              <h1>
                $<CountUp setParent={this.setParent} start={0} end={160526} />
              </h1>
            </div>
        );
    }
}