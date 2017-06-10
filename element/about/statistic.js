import React from 'react';
import './statistic.css';

class Statistic extends React.Component{
    state={
        nowType: 0,
        nowDay: 0,
        nowNews: 0,
    };

    timerInterval = null;
    timerOut= null;

    componentWillReceiveProps=()=>{//在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。
        if(this.timerInterval){
            clearInterval(this.timerInterval);
        }
        if(this.timerOut){
            clearTimeout(this.timerOut);
        }

        const typeNum=10;
        const typeStep=1;
        const dayStep = Number.parseInt(this.props.duringDays/15);
        const newsStep=Number.parseInt(this.props.newsNum/20);

        let flag={
            type:false,
            day: false,
            news:false,
        };

        let nowState={
            nowType:0,
            nowDay:0,
            nowNews:0,
        };

        this.setState(nowState,()=>{
            this.timerOut=setTimeout(()=>{
                this.timerInterval=setInterval(()=>{
                    if(!flag.type)
                        nowState.nowType+=typeStep;
                    if(!flag.day)
                        nowState.nowDay+=dayStep;
                    if(!flag.news)
                        nowState.nowNews+=newsStep;

                    if(nowState.nowType>typeNum){
                        nowState.nowType=typeNum;
                        flag.type=true;
                    }
                    if(nowState.nowDay > this.props.duringDays){
                        nowState.nowDay = this.props.duringDays;
                        flag.day = true;
                    }
                    if(nowState.nowNews > this.props.newsNum){
                        nowState.nowNews = this.props.newsNum;
                        flag.news = true;
                    }

                    this.setState(nowState, () => {
                        if(flag.type && flag.day && flag.news)
                            clearInterval(this.timerInterval);
                    })

                },100);
            },1000);
        })

    }

    render(){
        return(
            <div id="statistic">
                <div className="data">
                    <div className="number">{this.state.nowType}</div>
                    <div className="unit">types</div>
                </div>
                <div className="data">
                    <div className="number">{this.state.nowDay}</div>
                    <div className="unit">days</div>
                </div>
                <div className="data">
                    <div className="number">{this.state.nowNews}</div>
                    <div className="unit">news</div>
                </div>
            </div>
        );
    }

}

export default Statistic;