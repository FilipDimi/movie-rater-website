import React from 'react';
var FontAwesomeStar = require('react-fontawesome');

function MovieList(props) {

    const movieClicked = movie => (evt) => {
        props.movieClicked(movie);
    }

    const removeCLicked = movie => (evt) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}`
            }
          }).then( resp => props.movieDeleted(movie))
          .catch( error => console.log(error))
    }

    const editClicked = movie => evt => {
        props.editClicked(movie);
    }

    const newMovie = () => {
        props.newMovie();
    }

    return (
        <div>
        { props.movies.map( movie => {
            return (
                <div key={movie.id} className="movie-item">
                    <h3  onClick={movieClicked(movie)}>
                        {movie.title}
                    </h3>
                    <FontAwesomeStar name="edit" className="editPointer" onClick={editClicked(movie)}/>
                    <FontAwesomeStar name="trash" className="deletePointer" onClick={removeCLicked(movie)}/>
                </div>
            )
        })}
        <button onClick={newMovie}>Add New</button>
        </div>
    )
}

export default MovieList;