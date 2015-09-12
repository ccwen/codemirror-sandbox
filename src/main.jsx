var React=require("react");
var E=React.createElement;
var CodeMirror=require("./codemirror");
var text1="0123456789";
var text="";
var Bookmark=require("./bookmark");
var Punc=require("./punc");
var fullwidthpunc={",":"，",".":"。","!":"！","?":"？"}
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
  ,onBeforeCopy:function(s,cm,e) {
    if (this.excerptcopy) {
      var c=cm.getDoc().getCursor();
      return  s+"@"+c.line+":"+c.ch;
    } else return s;
  }
  ,onCopyClick:function() {
    this.excerptcopy=true;
    document.execCommand("copy");
    setTimeout(function(){
      this.excerptcopy=false;
    }.bind(this),100);
  }
  ,onBeforeChange:function(cm,obj) {
    if (obj.from.ch===obj.to.ch && obj.to.line===obj.from.line && obj.origin==="+input") {
      var punc=fullwidthpunc[obj.text[0]];
      if (punc) {
        setTimeout(function(){
          this.addpunc(punc);  
        }.bind(this),100);
        
        obj.cancel();
      }
    }
  }
  ,addpunc:function(punc) {
    var c=this.cm.getDoc().getCursor("from");
    function makeWidget() {
        var hint = document.createElement('span');
        React.render(E(Punc,null,{punc:punc}),hint);
        return hint;
    }
    this.punc=this.cm.getDoc().setBookmark( c,{widget:makeWidget() });    
  }
  ,onClick:function(){
    var c=this.cm.getDoc().getCursor("from");
    function makeWidget() {
        var hint = document.createElement('span');
        hint.className="segment";
        React.render(E(Bookmark,null,{line:c.line}),hint);
        return hint;
    }
    this.bookmark=this.cm.getDoc().setBookmark( c,{widget:makeWidget() });

    //this.cm.getDoc().addLineWidget(c.line,makeWidget(),{above:true});
  }
  ,onclearbookmark:function(){
    this.bookmark.clear();
  }
  ,refresh:function() {
    this.forceUpdate();
  }
  ,render: function() {
    return <div>
      <button onClick={this.onCopyClick}>Excerpt Copy</button>
      <button onClick={this.onClick}>bookmark</button>
      <button onClick={this.onpunc}>punc</button>
      <button onClick={this.onclearbookmark}>clear</button>
      <button onClick={this.refresh}>refresh</button>
      <CodeMirror ref="cm" value={text} onBeforeCopy={this.onBeforeCopy} onBeforeChange={this.onBeforeChange}/>
    </div>;
  }
});
module.exports=maincomponent;