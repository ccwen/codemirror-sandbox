var React=require("react");
var E=React.createElement;
var IL=require("./interline");

var Handle=React.createClass({
	mousemove:function(e){
		console.log(Math.random())
	}
	,render:function() {

		return E("span",{onMouseMove:this.mousemove,className:"handle"},"1")
	}
})

var Bookmark=React.createClass({
	render:function() {
		 return E(IL.Container,null
			,E(IL.Super, {}, E(Handle) )
			,E(IL.Embed, {}, "X")
			);
	}
})
module.exports=Bookmark;