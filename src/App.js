import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      images : [],
      pictureId: 0,
      bigImages: [],
      show: false,
      info: [],
      date: 0,
      comments: ''
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGetIdImage = this.handleGetIdImage.bind(this);
    this.handleSendComments = this.handleSendComments.bind(this);
    this.handleChangeComments = this.handleChangeComments.bind(this);
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
  handleSendComments(){
    console.log(this.state.comments)
  }

  handleGetIdImage(e){
    
    
    fetch('https://boiling-refuge-66454.herokuapp.com/images/'+e.target.id)
    .then(result => result.json())
    .then(data => {
        this.setState({ bigImages: data,
                        info: data.comments[0],
                        date: moment(data.comments[0].date).format("DD.MM.YYYY")
                        })
        console.log(this.state.bigImages)
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
    
    // console.log(this.state.comments)
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
                        onClick={this.handleGetIdImage}
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
                          >
                          </img> 
                        </div>
                          <div className="col-md-4 col-lg-4 coment">
                            <p className="date"> {this.state.date} </p>
                            <p className="comments">{this.state.info.text}</p>
                          </div>
                            <div className="col-md-8 col-lg-8  coment">
                              <input 
                                type="text" 
                                className="col-md-12 col-lg-12 mt-4 rounded " 
                                placeholder="Ваше имя" 
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
