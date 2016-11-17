import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
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
  render : function() {
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
      <div className="fullStretch">
        <p className="openMenu"><div className="plus hiddenPls">+</div><DispMenu blogPost={this.props.blogPost}/></p>
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
        <p className="postCompBodyStyle">{this.props.details.post}</p>
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

var Posts = React.createClass({
  PostBlogLive : function (key) {
    return<PostComp key={key} index={key} details={this.props.blogPost[key]}/>
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
  SubmitBlog : function (event){
    event.preventDefault();
    var blogPost = {
      title : this.refs.title.value,
      post : this.refs.blog.value
    }
    this.props.addBlog(blogPost)
    console.log(blogPost)
    event.preventDefault();
    this.refs.title.value = "";
    this.refs.blog.value = "";

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
              <textarea className="textareaBlog" id="myTextarea" ref="blog" placeholder="  Blog Post" rows="4" cols="50">
              </textarea>
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



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
