import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';




class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      images : [],
      picture: [],
      bigImages: [],
      show: false,
    }
    this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
  
  async componentDidMount(){
    const url = "https://boiling-refuge-66454.herokuapp.com/images"
    const response = await fetch(url)
    const data = await response.json()
    //  console.log(data)
    this.setState({images: data})
    // console.log(this.state.images)  
    }

  render(){   
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
                    <div className="col-md-4 my-lg-4 my-md-4 my-sm-4" key={element.id}  >
                      <img  
                        alt="preview" 
                        className="img-thumbnail" 
                        src={element.url}
                        onClick={this.handleShow}
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
