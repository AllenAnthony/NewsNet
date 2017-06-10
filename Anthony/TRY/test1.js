var WebSite = React.createClass({
    getInitialState: function() {
        return {
            name: "菜鸟教程",
            site: "http://www.runoob.com"
        };
    },

    render: function() {
        return (
            <div>
                <Name name={this.state.name} />
                <Link site={this.state.site} />
            </div>
        );
    }
});

var Name = React.createClass({
    render: function() {
        return (
            <h1>{this.props.name}</h1>
        );
    }
});

var Link = React.createClass({
    render: function() {
        return (
            <a href={this.props.site}>
                {this.props.site}
            </a>
        );
    }
});

ReactDOM.render(
    <WebSite />,
    document.getElementById('example')
);

var MyComponent = React.createClass({
    handleClick: function() {
        // 使用原生的 DOM API 获取焦点
        this.refs.myInput.value="fuck";
    },
    render: function() {
        //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
        return (
            <div>
                <input type="text" ref="myInput" />
                <input
                    type="button"
                    value="点我fuck"
                    onClick={this.handleClick}
                />
            </div>
        );
    }
});

ReactDOM.render(
    <MyComponent />,
    document.getElementById('example')
);