import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ImageList from './component/ImageList';
import ImageForm from './component/ImageForm';
import { BrowserRouter, Route, Link, Router } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      pictureId: 0,
      bigImages: [],
      show: false,
      info: [],
      comments: [],
      bigImageId: 0,
      name: [],
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGetIdImage = this.handleGetIdImage.bind(this);
    this.handleSendComments = this.handleSendComments.bind(this);
    this.handleChangeComments = this.handleChangeComments.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChangeComments(e) {
    this.setState({
      comments: e.target.value
    })
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleSendComments(e) {
    axios.post('https://boiling-refuge-66454.herokuapp.com/images/' + this.state.bigImageId + '/comments', {
      name: this.state.name,
      comment: this.state.comments
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response)
      })

  }

  handleGetIdImage(element) {
    fetch('https://boiling-refuge-66454.herokuapp.com/images/' + element)
      .then(result => result.json())
      .then(data => {
        this.setState({
          bigImages: data,
          info: data.comments,
          bigImageId: element
        })
      })
  }

  async componentDidMount() {
    const url = "https://boiling-refuge-66454.herokuapp.com/images"
    const response = await fetch(url)
    const data = await response.json()
    //  console.log(data)
    this.setState({
      images: data,
    })
  }

  render() {
    // console.log(this.state.comments)
    return (
      
      <div className="container">
        {/* <BrowserRouter>
        <Route path="/" render={()=><ImageList
                    imagesArray={this.state.images}
                    handleGetIdImage={this.handleGetIdImage}
                    Show={this.handleShow}
                  />} /> */}
        
        <header>
          <div className="text-center">
            <h1> test app </h1>
          </div>
        </header>
        <section>
          <div className="row">
            <main className="col-md-12 col-lg-12 ">

              {
                this.state.show ? null :
                  <ImageList
                    imagesArray={this.state.images}
                    handleGetIdImage={this.handleGetIdImage}
                    Show={this.handleShow}
                  />
              }

              {
                this.state.show ?
                  <ImageForm
                    show={this.state.show}
                    offHide={this.handleShow}
                    bigImagesUrl={this.state.bigImages.url}
                    info={this.state.info}
                    name={this.state.name}
                    comments={this.state.comments}
                    ChangeComments={this.handleChangeComments}
                    ChangeName={this.handleChangeName}
                    SendComments={this.handleSendComments}
                  />
                  : null
              }

            </main>
          </div>
        </section>
        <footer className='footer mt-auto py-6 bg-white text-dark text-center'>
          <div className='container'>
            <hr />
            <p>© 2019-2020</p>
          </div>
        </footer>
        {/* </BrowserRouter> */}
      </div>
      
    )
  }
}

export default App;
