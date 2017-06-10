// var title = "菜鸟教程";
// // var title = 123;
// var MyTitle = React.createClass({
//
//     propTypes: {
//         title: React.PropTypes.string.isRequired,
//     },
//
//     render: function() {
//         return <h1> {this.props.title} </h1>;
//     }
// });
// ReactDOM.render(
//     <MyTitle title={title} />,
//     document.getElementById('example')
// );

// var LikeButton = React.createClass({
//     getInitialState: function() {
//         return {liked: false};
//     },
//     handleClick: function(event) {
//         this.setState({liked: !this.state.liked});
//     },
//     render: function() {
//         var text = this.state.liked ? '喜欢' : '不喜欢';
//         return (
//             <p onClick={this.handleClick}>
//                 你<b>{text}</b>我。点我切换状态。
//             </p>
//         );
//     }
// });
//
// ReactDOM.render(
//     <LikeButton />,
//     document.getElementById('example')
// );

var Button = React.createClass({
    getInitialState: function() {
        return {
            data:0
        };
    },
    setNewNumber: function() {
        this.setState({data: this.state.data + 1})
    },
    render: function () {
        return (
            <div>
                <button onClick = {this.setNewNumber}>INCREMENT</button>
                <Content myNumber = {this.state.data}></Content>
            </div>
        );
    }
});
var Content = React.createClass({
    componentWillMount:function() {
        console.log('Component WILL MOUNT!')
    },
    componentDidMount:function() {
        console.log('Component DID MOUNT!')
    },
    componentWillReceiveProps:function(newProps) {
        console.log('Component WILL RECEIVE PROPS!')
    },
    shouldComponentUpdate:function(newProps, newState) {
        return true;
    },
    componentWillUpdate:function(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    },
    componentDidUpdate:function(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    },
    componentWillUnmount:function() {
        console.log('Component WILL UNMOUNT!')
    },

    render: function () {
        return (
            <div>
                <h3>{this.props.myNumber}</h3>
            </div>
        );
    }
});
ReactDOM.render(
    <div>
        <Button />
    </div>,
    document.getElementById('example')
);