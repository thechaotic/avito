import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      images : [],
      pictureId: 0,
      bigImages: [],
      show: false,
      big: []
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGetIdImage = this.handleGetIdImage.bind(this);
    this.handleGetBigImage = this.handleGetBigImage.bind(this);
  }
  handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
  }
  handleGetIdImage(e){
    this.setState({pictureId: e.target.id})
    
    
  }
  handleGetBigImage(){
    fetch('https://boiling-refuge-66454.herokuapp.com/images/'+this.state.pictureId)
    .then(result => result.json())
    .then(data => {
        this.setState({ bigImages: data})
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
    
    // console.log(this.state.pictureId)
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
                        onClick={this.handleGetBigImage}
                       />
                    </div>
                  ))}    
                </div>   
                <Modal show={this.state.show} onHide={this.handleClose}>
					        <Modal.Header closeButton>
						        <Modal.Title>Modal heading</Modal.Title>
				      	</Modal.Header>
					        <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                  </Modal.Body>
                  <Modal.Footer>
              
              
                  </Modal.Footer>
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
