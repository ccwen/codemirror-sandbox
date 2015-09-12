var React=require("react");
var E=React.createElement;
var IL=require("./interline");

var ThePunc=React.createClass({
	render:function() {
		return E("span",{className:"rubypunc"},this.props.punc)
	}
})

var Punc=React.createClass({
	render:function() {
		 return E(IL.Container,null
			,E(IL.Embed, {}, null)
			,E(IL.Sub, {}, E(ThePunc,this.props.children) )
			);
	}
})
module.exports=Punc;