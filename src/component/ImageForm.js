import React from 'react';
import moment from 'moment'

class ImageForm extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-8  bigimage">
            <img
              className="img-fluid"
              src={this.props.bigImagesUrl}
              alt="bigimage"
            />
          </div>
          {this.props.info.map(el => (
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
              value={this.props.name}
              onChange={this.props.ChangeName}
            />

            <input
              type="text"
              className="col-md-12 col-lg-12 mt-4 rounded"
              placeholder="Ваш комментарий"
              value={this.props.comments}
              onChange={this.props.ChangeComments}
            />

            <button
              className="col-md-12 col-lg-12 mt-4 rounded mybtn btn btn-primary "
              onClick={this.props.SendComments}
            >Оставить комментарий
                                </button>
          </div>
        </div>
      </div>
    )
  }
}
export default ImageForm;