import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'

import axios from 'axios';



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      images : [],
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

  handleChangeComments(e){
    this.setState({
      comments: e.target.value
    })
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }
  handleSendComments(e){
    axios.post('https://boiling-refuge-66454.herokuapp.com/images/'+this.state.bigImageId+'/comments', {	 
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

  handleGetIdImage(element){
    fetch('https://boiling-refuge-66454.herokuapp.com/images/'+element)
    .then(result => result.json())
    .then(data => {
        this.setState({ bigImages: data,
                        info: data.comments,
                        bigImageId: element
                      })
        // console.log(this.state.bigImageId)
    })
  }

  async componentDidMount(){
    const url = "https://boiling-refuge-66454.herokuapp.com/images"
    const response = await fetch(url)
    const data = await response.json()
    //  console.log(data)
    this.setState({
      images: data,  
    })
    // console.log(this.state.images); 
    }

  render(){   
    console.log(this.state.name)
    return( 
      <div className="container">
        <header>
          <div className="text-center">
            <h1> test app </h1> 
          </div>
        </header>
          <section>
            <div className="row">
              <main className="col-md-12 col-lg-12 ">
                <div className="row">
                  {this.state.images.map(element =>(
                    <div className="col-md-4 my-lg-4 my-md-4 my-sm-4" key={element.id}  onClick={this.handleShow}>
                      <img  
                        alt="preview" 
                        className="img-thumbnail" 
                        src={element.url}
                        id={element.id}
                        onClick={(e)=>this.handleGetIdImage(element.id)}
                       />
                    </div>
                  ))}    
                </div>   
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton> 
                  </Modal.Header>
                    <Modal.Body >
                      <div className="container">
                        <div className="row">  
                          <div className="col-md-8 col-lg-8  bigimage">
                            <img
                              className="img-fluid"
                              src={this.state.bigImages.url}
                              alt="bigimage"
                            />  
                          </div>
                            {this.state.info.map(el=>(
                              <div className="col-md-4 col-lg-4 coment" key={el.id}>
                                <p className="date">{moment(el.date).format("DD.MM.YYYY")}</p>
                                <p className="comments">{el.text}</p>
                              </div>
                            ))}
                              <div className="col-md-8 col-lg-8  coment">
                                <input 
                                  type="text" 
                                  className="col-md-12 col-lg-12 mt-4 rounded " 
                                  placeholder="Ваше имя" 
                                  value={this.state.name}
                                  onChange={this.handleChangeName}
                                />

                                <input 
                                  type="text" 
                                  className="col-md-12 col-lg-12 mt-4 rounded" 
                                  placeholder="Ваш комментарий" 
                                  value={this.state.comments}
                                  onChange={this.handleChangeComments}
                                />

                                <button 
                                  className="col-md-12 col-lg-12 mt-4 rounded mybtn btn btn-primary "
                                  onClick={this.handleSendComments}
                                  >Оставить комментарий
                                </button>
                              </div>
                          </div>
                        </div>
                    </Modal.Body>
				        </Modal>
              </main>
            </div>
                   
          </section>  
        <footer className='footer mt-auto py-6 bg-white text-dark text-center'>
          <div className='container'>
            <hr />
              <p>© 2018-2019</p>   
          </div>
        </footer>
      </div>
      
    )
  }
}

export default App;
