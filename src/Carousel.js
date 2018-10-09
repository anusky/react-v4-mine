import React from 'react'
class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  }

  static getDerivedStateFromProps({ media }) {
    //recive props, state
    //In this case we are getting media from props
    /* is invoked right before calling the render method, 
    both on the initial mount and on subsequent updates */
    /*   are you using the state instead of prods 
    to avoid the filter on each re-render --> YES*/
    //this is very easy to test

    let photos = []
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn')
    }
    return { photos }
  }
  handleIndexClick = event => {
    this.setState({
      //   active: event.target.dataset.index //I can access that because i have data-index on component
      active: +event.target.dataset.index //this '+' sign converts string to a Number value
    })
  }

  render() {
    const { photos, active } = this.state
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /*eslint-disable-next-line*/
            <img
              onClick={this.handleIndexClick}
              key={photo.value}
              data-index={index}
              src={photo.value}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    )
  }
}

// Carousel.getDerivedStateFromProps  I can do this

export default Carousel

// function x() {
//   //creates a new scope wherever from it is created
//   //siempre tiene un contexto "privado" e independiente de allí donde se use
// }
// const y = () => {
//   //doesn't create a new scope. It only matters whatever it is called
//   //el contexto que llega aquí es el creado por quien lo llama
// }
