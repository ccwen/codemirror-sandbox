var React=require("react");
var E=React.createElement;
var CodeMirror=require("./codemirror");
var text="0123456789\n0123456789";
var Bookmark=require("./bookmark");
var maincomponent = React.createClass({
  getInitialState:function() {
    return {result:[],tofind:"君子"};
  }
  ,componentDidMount:function() {
    this.cm=this.refs.cm.getCodeMirror();

    this.cm.getDoc().markText( {line:0,ch:1} , {line:0,ch:5} , 
      {className:"hl0"} );


    this.cm.getDoc().markText( {line:0,ch:3} , {line:0,ch:7} , 
      {className:"underline"} );    
  }
  ,onClick:function(){

    function makeWidget() {
        var hint = document.createElement('span');
        React.render(E(Bookmark),hint);
        return hint;
    }
    var c=this.cm.getDoc().getCursor();
    this.bookmark=this.cm.getDoc().setBookmark( c,{widget:makeWidget() });
  }
  ,onclearbookmark:function(){
    this.bookmark.clear();
  }
  ,refresh:function() {
    this.forceUpdate();
  }
  ,render: function() {
    return <div>
      <button onClick={this.onClick}>bookmark</button>
      <button onClick={this.onclearbookmark}>clear</button>
      <button onClick={this.refresh}>refresh</button>
      <CodeMirror ref="cm" value={text}/>
    </div>;
  }
});
module.exports=maincomponent;