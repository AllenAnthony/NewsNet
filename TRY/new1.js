var Counter = React.createClass({
    getInitialState: function () {
        return { clickCount: 0 };
    },
    handleClick: function () {
        this.setState(function(state) {
            return {clickCount: state.clickCount + 1};
        });
    },
    render: function () {
        return (<h2 onClick={this.handleClick}>点我！点击次数为: {this.state.clickCount}</h2>);
    }
});
ReactDOM.render(
    <Counter />,
    document.getElementById('message')
);

var Hello = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1.0
        };
    },

    componentDidMount: function () {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity: opacity
            });
        }.bind(this), 100);
    },

    render: function () {
        return (
            <div style={{opacity: this.state.opacity}}>
                Hello {this.props.name}
            </div>
        );
    }
});

ReactDOM.render(
    <Hello name="world"/>,
    document.body
);