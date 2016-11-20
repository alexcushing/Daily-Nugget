import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import TinyMCE from 'react-tinymce'
import './index.css';
var Squire = require('squire-rte');
var TextEditor = require('react-texteditor');
var ReactRouter = require('react-router');
var $ = require("jquery");
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var HtmlToReactParser = require('html-to-react').Parser;
import renderHTML from 'react-render-html';
import { browserHistory, IndexRoute, useRouterHistory } from 'react-router'

/*
  App
*/

var App = React.createClass({
  getInitialState : function () {
    return{
      blogPost : {},
      textBox : {}
    }
  },
  addBlog : function(currPost){
    var timestamp = (new Date()).getTime();
    this.state.blogPost['post-'+timestamp] = currPost;
    this.setState({ blogPost : this.state.blogPost });
  },
  render : function() {
    return (
      <div>
        <Header />
        <TDNMenu blogPost={this.state.blogPost}/>
        <BlogTextArea addBlog={this.addBlog}/>
        <Posts blogPost={this.state.blogPost}/>
      </div>
    )
  }
});

/*
  Header
  <Header/>
*/
var Header = React.createClass({
  render : function() {//this.refs.blog.props.value
    return (
      <header className="top">
        <h1 className="TDNTop"><div className="title">The Daily <div className="TopNugget">Nugget</div>
        </div></h1>
        <hr/>
      </header>
    )
  }
})


/*
  TDNMenu
  <TDNMenu/>
*/
var TDNMenu = React.createClass({
  render : function() {
    return (
      <div className="mainNav">
        {/*}<div className="fullStretch">
          <p className="openMenu"><div className="plus hiddenPls">+</div><DispMenu blogPost={this.props.blogPost}/></p>
        </div>*/}
        <DispMenu blogPost={this.props.blogPost} />
      </div>
    )
  }
})


var PostCompTitle = React.createClass({
  render : function () {
    var goTo = "#" + this.props.details.title;
    return(
      <li><a href={goTo} >{this.props.details.title}</a></li>
    )
  }
});

var PostComp = React.createClass({
  render : function () {
    return(
      <div className="outerPost">
        <div className="eachPost" id={this.props.details.title}>
          <h2 className="postCompTitleStyle"><a className='titlePost'>{this.props.details.title}</a></h2>
          <br/>
          <div className="postCompBodyStyle">{this.props.details.post}</div>
        </div>
      </div>
    )
  }
});

/*
  DispMenu
  <TDNMenu/>
*/
var DispMenu = React.createClass({
  CreateMenuItem : function (key){
    return<PostCompTitle key={key} index={key} details={this.props.blogPost[key]}/>
  },
  render : function() {
    return (
      <ul className="DispMenu">
      {Object.keys(this.props.blogPost).map(this.CreateMenuItem)}
      </ul>
    )
  }
})

/*
  Not Found
*/

var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>
  }
});

//alpal
var Posts = React.createClass({
  PostBlogLive : function (key) {
    var currKey = this.props.blogPost[key]
    console.log('current key: ', currKey, 'key: ', key);
    var htmlBlock = <PostComp key={key} index={key} details={this.props.blogPost[key]}/>
    return htmlBlock
  },
  render : function() {
    return (
      <div>
          {Object.keys(this.props.blogPost).map(this.PostBlogLive)}
      </div>
    )
  }
});


/*
  blogtextArea
  <blogtextArea/>
*/
var BlogTextArea = React.createClass({
  onTextChange: function(value) {
    this.setState({ text:value });
  },
  showText : function (){
    var show = this.refs.hideShow;
    var hide = this.refs.editBtn;
    show.style.display = 'block';
    hide.style.display = 'none';
  },
  hideText : function (){
    var hide = this.refs.hideShow;
    var show = this.refs.editBtn;
    show.style.display = 'block';
    hide.style.display = 'none';
  },
  stateVal:function(){
    console.log('test funcy', this);
    text:'';
    this.refs.rte.resetState()
  },
  SubmitBlog : function (event){
    event.preventDefault();
    var deUnicoded = this.refs.rte.refs.tinymceRef.props.text
    var blogPost = {
      title : this.refs.title.value,
      post : deUnicoded
    }
    this.props.addBlog(blogPost)
    console.log("value: ",this.refs.rte.refs.tinymceRef.props.text)
    console.log(blogPost)
    event.preventDefault();
    this.refs.title.value = "";
    this.refs.rte.state.text="";
    //this.stateVal();

  },

  render : function() {
    return (
      <div>
        <div className="editWrap" ref="editBtn"><i className="fa fa-pencil-square-o custom" aria-hidden="true" onClick={this.showText}></i></div>
        <div className="blogging hiddenDef" ref="hideShow">
          <form onSubmit={this.SubmitBlog}>
          <div className="bloggingStyle">
                <input className="blogTitle" placeholder="Title" id="blogTitle" ref="title"></input>
                <i className="fa fa-times-circle closer" aria-hidden="true" ref="closer" onClick={this.hideText}></i>
              </div><br/>
              {/*<textBox className="textareaBlog" id="myTextarea" ref="blog" value="..." />*/}
              {/*<ExampleView className="textareaBlog" id="myTextarea" ref="blog" />*/}
              <TextApp className="textareaBlog"  id="myTextarea" ref="rte" stateVal = {this.props.resetState} />
              <br/>
              <div className="bloggingStyle">
                <button className="subBlogBtn" type="submit">Submit</button>
              </div>
            </form>
        </div>
      </div>
    )
  }
})


const TextApp = React.createClass({

  getInitialState: function() {
    return{
    text: ''
    }
  },

  resetState: function(e) {
    var x = document.getElementById("tinymce")
    console.log('got this far, bud. keep it up :)', x );
  },

  handleEditorChange(e) {
    console.log(e.target.getContent());
    this.setState({ text:e.target.getContent()});

  },

  render() {
    return (
      <TinyMCE
        ref="tinymceRef"
        text={this.state.text}
        resetState={this.resetState}
        content=""
        config={{
          plugins: 'autolink link image lists print preview',
          entity_encoding : "raw",
          width: '70%',
          height: '400px',
          margin: '0 auto',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
});

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
