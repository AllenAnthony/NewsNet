import React from 'react';
import Session from './Session';

import 'antd/dist/antd.css';

class News extends React.Component {
    state = {
        cardArr: []
    }
    componentWillReceiveProps(nextProps){
        var cardArr;

        if(nextProps.column == "我喜欢"){
            // 临时请求新闻，而不是从传递过来的数组中获取，因为后端sql api较为强大，更方便得到想要的数据
            var columnInfo = nextProps.columnLikeRatio.slice(0);
            console.log("喜欢率： "+columnInfo);
            for(let item of columnInfo){
                item.reqCount = 0;
            }
            cardArr = [];
            for(let i = 0; i < 32; i++){
                let random = Math.random();
                let sum = 0;
                for(let item of columnInfo){
                    sum += item.ratio;
                    if(sum > random){
                        const url = 'http://127.0.0.1:3000/getOneByTypeOrdered';
                        var req = new Request(url, {
                            method: 'POST',
                            body: `type=${item.type}&index=${item.reqCount++}`,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        });

                        fetch(req).then((response) => {
                            return response.json();
                        }).then((data) => {
                            if(data.code == 0){
                                cardArr.push(
                                    <Session key={data.news.id} {...data.news} />
                                );
                                this.setState({
                                    cardArr: cardArr
                                })
                            }
                        });
                        break;
                    }
                }
            }
        }else{
            cardArr = nextProps.newsArr.map((item, index)=>{
                // console.log("item.type: "+item.type);
                // console.log(item.url);
                // console.log("nextProps.column: "+nextProps.column);
                // console.log("item: "+item);
                if(item.type == nextProps.column){
                    return (
                        <Session key={index} {...item}/>
                    );
                }
            });
            this.setState({
                cardArr: cardArr
            });
        }
    }
    render(){
        var display = (this.props.show == true) ? "block" : "none";

        return (
            <div style={{ width: '100%', height: '100%', position: 'relative', display: display }}>
                {this.state.cardArr}
            </div>
        );
    }
}

export default News;