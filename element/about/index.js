import React from 'react';

import Introduction from './introduction';
import Statistic from './statistic';

class About extends React.Component{
    render(){
        let display=this.props.show?"block":"none";
        return(
            <div style={{display: display}}>
                <Introduction/>
                <Statistic duringDays={this.props.duringDays}  newsNum={this.props.newsNum} />
            </div>
        )
    }
}

export default About;