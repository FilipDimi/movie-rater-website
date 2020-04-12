import React, { Component } from 'react';
var FontAwesomeStar = require('react-fontawesome');

class MovieDetails extends Component {

    state = {
        highlighted: -1
    }

    highlightedRate = high => evt => {
        this.setState({highlighted: high});
    }

    rateClicked = stars => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({stars: stars + 1})
          }).then( resp => resp.json())
          .then( res => this.getDetails())
          .catch( error => console.log(error))
    }

    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}`
            }
          }).then( resp => resp.json())
          .then( res => this.props.updateMovie(res))
          .catch( error => console.log(error))
    }

    render() {
        const mov = this.props.movie;

        return (
            <React.Fragment>
            { this.props.movie ? (
                <div>
                    <h3>{this.props.movie.title}</h3>
                    <FontAwesomeStar className={mov.average_rating > 0 ? 'orange' : ''} name="star"/>
                    <FontAwesomeStar className={mov.average_rating > 1 ? 'orange' : ''} name="star"/>
                    <FontAwesomeStar className={mov.average_rating > 2 ? 'orange' : ''} name="star"/>
                    <FontAwesomeStar className={mov.average_rating > 3 ? 'orange' : ''} name="star"/>
                    <FontAwesomeStar className={mov.average_rating > 4 ? 'orange' : ''} name="star"/>                  
                    &nbsp;({mov.num_of_ratings})
                    <p>{mov.description}</p>

                    <div className="rate-container">
                        <h2>Rate it!</h2>
                        { [...Array(5)].map(  (e, i) => {
                            return <FontAwesomeStar key={i} className={this.state.highlighted > i - 1 ? 'purple' : ''} name="star"
                                onMouseEnter={this.highlightedRate(i)} onMouseLeave={this.highlightedRate(-1)} onClick={this.rateClicked(i)}/>
                        }) }
                    </div>
                </div>
            ) : null}
            </React.Fragment>
        )
    }
}

export default MovieDetails;