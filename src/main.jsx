var React=require("react");
var E=React.createElement;
var CodeMirror=require("./codemirror");
var text1="0123456789";
var text="";
var Bookmark=require("./bookmark");
var maincomponent = React.createClass({
  getInitialState:function() {
    return {result:[],tofind:"君子"};
  }
  ,componentWillMount:function() {
    for (var i=0;i<10000;i++) {
      text+=i+":"+text1+Math.random()+"\n";
    }
  }
  ,componentDidMount:function() {
    this.cm=this.refs.cm.getCodeMirror();

    for (var i=0;i<100;i++) {
      this.cm.getDoc().markText( {line:i*10,ch:1} , {line:i*10,ch:5} , 
        {className:"hl0"} );


      this.cm.getDoc().markText( {line:i*10,ch:3} , {line:i*10,ch:7} , 
        {className:"underline"} );    

    }
  }
  ,onBeforeCopy:function(s,cm) {
    var c=cm.getDoc().getCursor();
    return  s+"@"+c.line+":"+c.ch;
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
      <CodeMirror ref="cm" value={text} options={{lineWiseCopyCut:true}} onBeforeCopy={this.onBeforeCopy}/>
    </div>;
  }
});
module.exports=maincomponent;