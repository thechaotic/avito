import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';




class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      images : [],
      pictureId: 0,
      bigImages: [],
      show: false,
      info: [],
      
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGetIdImage = this.handleGetIdImage.bind(this);
    
  }
  handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
  }
  handleGetIdImage(e){
    
    
    fetch('https://boiling-refuge-66454.herokuapp.com/images/'+e.target.id)
    .then(result => result.json())
    .then(data => {
        this.setState({ bigImages: data,
                        info: data.comments[0],
                        })
        // console.log(this.state.bigImages)
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
    
    console.log(this.state.info)
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
                  <p></p>
                          <p>{this.state.info.text}</p>
                        </div>
                          <div className="col-md-8 col-lg-8  coment">
                            <input type="text" className="col-md-12 col-lg-12 mt-4 "/>
                            <input type="text" className="col-md-12 col-lg-12 mt-4 "/>
                            <button className="col-md-12 col-lg-12 mt-4 ">Оставить комментарий</button>
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
