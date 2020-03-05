import React from 'react';
class ImageList extends React.Component {

  render() {
    return (
      <div className="row">
        {this.props.imagesArray.map(element => (
          <div className="col-md-4 my-lg-4 my-md-4 my-sm-4" key={element.id} onClick={this.props.Show}>
            <img
              alt="preview"
              className="img-thumbnail"
              src={element.url}
              id={element.id}
              onClick={(e) => this.props.handleGetIdImage(element.id)}
            />
          </div>
        ))}
      </div>
    )
  }
}
export default ImageList;