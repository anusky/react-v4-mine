import React from 'react'
import pf from 'petfinder-client'
import { navigate } from '@reach/router'
import Carousel from './Carousel'

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
})

class Details extends React.Component {
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       loading: true,
  //     }
  //   }
  state = {
    loading: true
  }

  componentDidMount() {
    petfinder.pet
      .get({
        output: 'full',
        id: this.props.id
      })
      .then(data => {
        const { pet } = data.petfinder

        const { name, animal, contact, description, media } = pet
        let breed
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(', ')
        } else {
          breed = pet.breeds.breed
        }
        this.setState({
          name,
          animal,
          location: `${contact.city}, ${contact.state}`,
          description,
          media,
          breed,
          loading: false
        })
      })
      .catch(() => {
        // this.setState({ error: err })
        navigate('/')
      })
  }
  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>
    }
    const { name, animal, breed, location, description, media } = this.state
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h1>
            {animal} - {breed} - {location}
          </h1>
          <p> {description}</p>
        </div>
      </div>
    )
  }
}

export default Details
