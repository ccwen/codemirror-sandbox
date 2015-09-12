var React=require("react");
var E=React.createElement;
var IL=require("./interline");

var Handle=React.createClass({
	getInitialState:function() {
		return {text:"qq"}
	}
	,mousemove:function(e){
		this.setState({text:Math.random().toString().substr(2,2)})
	}
	,render:function() {
		return E("span",{onMouseMove:this.mousemove,className:"rubyhandle"},this.state.text)
	}
})

var Bookmark=React.createClass({
	render:function() {
		 return E(IL.Container,null
			,E(IL.Super, {}, E(Handle) )
			,E(IL.Embed, {}, null)
			);
	}
})
module.exports=Bookmark;