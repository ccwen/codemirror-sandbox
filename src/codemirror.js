var CM = require('codemirror');
var React = require('react');

var CodeMirror = React.createClass({

	propTypes: {
		onChange: React.PropTypes.func,
		onFocusChange: React.PropTypes.func,
		onCursorActivity: React.PropTypes.func,
		options: React.PropTypes.object,
		path: React.PropTypes.string,
		value: React.PropTypes.string
	},

	getInitialState:function () {
		return {
			isFocused: false
		};
	},
	cursorActivity:function(cm) { 
		this.props.onCursorActivity&&this.props.onCursorActivity(cm);
	} 
	,componentDidMount:function () {
		var textareaNode = React.findDOMNode(this.refs.textarea);
		this.codeMirror = CM.fromTextArea(textareaNode, this.props.options);
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this.codeMirror.on('cursorActivity',this.cursorActivity);
		this._currentCodemirrorValue = this.props.value;
	},

	componentWillUnmount:function () {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},

	componentWillReceiveProps:function (nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
	},

	getCodeMirror:function () {
		return this.codeMirror;
	},

	focus:function () {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},

	focusChanged:function (focused) {
		this.setState({isFocused: focused});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	},

	codemirrorValueChanged:function (doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange && this.props.onChange(newValue);
	},

	render:function () {
		var className = 'ReactCodeMirror';
		if (this.state.isFocused) {
			className += ' ReactCodeMirror--focused';
		}
		return (
			<div className={className}>
				<textarea ref="textarea" name={this.props.path} defaultValue={this.props.value} autoComplete="off" />
			</div>
		);
	}

});

module.exports = CodeMirror;