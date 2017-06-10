import React from 'react';
import Card from './card';

import 'antd/dist/antd.css';

class News extends React.Component{
    state={
        cardArray:[]
    }

    componentWillReceiveProps(nextProps){
        let cardArray;

        if(nextProps.column=="you may like"){
            let columnInfo=nextProps.columLikeRatio.slice(0);
            for(let item of columnInfo){
                item.reqCount=0;
            }

            cardArray=[];
            for(let i=0;i<30;i++){
                let random =Math.random();
                let summary=0;
                for(let item of columnInfo){
                    summary+=item.ratio;
                    if(summary>random){
                        let url='http://127.0.0.1:3000/getone';
                        let req=new Request(url,{
                            method: 'POST',
                            body: `type=${item.type}&index=${item.reqCount++}`,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        });

                        fetch(req).then((response)=>{
                            return response.json();
                        }).then((data)=>{
                            if(data.code==0){
                                cardArray.push(<Card key={data.news.id} {...data.news} />);
                                this.setState({cardArray:cardArray})
                            }
                        });
                        break;
                    }
                }
            }

        }else{
            cardArray=nextProps.newsArr.map((item,index)=>{
                if(item.type==nextProps.column){
                    return(<Card key={index} {...item}/>);
                }
            });
            this.setState({cardArray:cardArray})
        }
    }

    render(){
        let display = (this.props.show == true) ? "block" : "none";

        return (
            <div style={{ width: '100%', height: '100%', position: 'relative', display: display }}>
                {this.state.cardArr}
            </div>
        );
    }

}

export default News;
