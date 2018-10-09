import React from 'react'
import pf from 'petfinder-client'
import Pet from './Pet'

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
})

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pets: [],
    }
  }
  componentDidMount() {
    petfinder.pet
      .find({ output: 'full', location: 'Seattle, WA' })
      .then(data => {
        let pets
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet
          } else {
            pets = [data.petfinder.pets.pet]
          }
        } else {
          pets = []
        }

        //why don't use here something like
        // pets = [...data.petfinder.pets.pet]
        // instead of all this if/else construction

        this.setState({ pets })
      })
  }
  // handleTitleClick() {
  //   alert("you clicked the title");
  // }
  render() {
    // return React.createElement("div", {}, [
    //   React.createElement(
    //     "h1",
    //     { onClick: this.handleTitleClick },
    //     "Adopt Me!"
    //   ),
    //   React.createElement(Pet, {
    //     name: "Luna",
    //     animal: "dog",
    //     breed: "Havanese"
    //   }),
    //   React.createElement(Pet, {
    //     name: "Pepper",
    //     animal: "dog",
    //     breed: "Cockateil"
    //   }),
    //   React.createElement(Pet, {
    //     name: "Doink",
    //     animal: "cat",
    //     breed: "Mixed"
    //   })
    // ]);
    return (
      /*<Pet name="Luna" animal="dog" breed="Havanese" />
        <Pet name="Pepper" animal="bird" breed="Cockateil" />
    <Pet name="Doink" animal="cat" breed="Mixed" />*/
      /*
        //a freaky way to see data structure that is returned on our state
          <pre>
          <code>{JSON.stringify(this.state, null, 2)}</code>
        </pre>
    */
      <div className="search">
        {this.state.pets.map(pet => {
          let breed
          const { animal, name, id, media, contact } = pet
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(', ')
          } else {
            breed = pet.breeds.breed
          }

          return (
            <Pet
              key={id}
              animal={animal}
              name={name}
              breed={breed}
              media={media}
              location={`${contact.city}, ${contact.state}`}
              id={id}
            />
          )
        })}
      </div>
    )
  }
}

export default Results
