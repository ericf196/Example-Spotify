import React, { Component } from 'react'
import SongItem from './SongItem'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkSignIn, search } from "../../actions";
import Spinner from "react-spinkit";

import './index.css'
import 'materialize-css/dist/css/materialize.min.css'

class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            song: ''
        }

        this.getResultsCard = this.getResultsCard.bind(this)
        this.getTokenPath = this.getTokenPath.bind(this)

    }

    getTokenPath(){
        let path = window.location.href
        return path.substring( path.indexOf("#"), path.length );
    }

    componentWillMount() {
        this.props.checkSignIn()
    }

    getResultsCard() {
        const { songs } = this.props

        if (songs.length > 0) {
            return (
                <div className="card">
                    <div className="card-content" >
                        {
                            songs.map((currentValue, index) => {
                                //console.log(currentValue)
                                return (
                                    <SongItem 
                                    key={index}
                                    songId={currentValue.id}
                                    albumPhoto={currentValue.album.images[0].url}
                                    albumName={currentValue.album.name}
                                    songName={currentValue.name}
                                    tokenPath={this.getTokenPath()}
                                    artistSong={currentValue.artists[0].name}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            )
        }

    }

    render() {
        const { song } = this.state
        const { songs } = this.props

        if(songs.type ==="IS_FETCHING"){ 
            return <Spinner name="double-bounce" />
        }
        
        return (
            <div className="Index">
                <div className="card">
                    <div className="card-content">
                        <div className="Index-searchBox">
                            <input
                                type="text"
                                className="Index-searchBox-input"
                                placeholder="Cancion"
                                onChange={(e) => { this.setState({ song: e.target.value }) }}
                                value={song}
                            />

                            <a className="waves-effect waves-light btn green" onClick={() => this.props.search(song)}>
                                <i className="fa fa-search-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {this.getResultsCard()}

            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        routes: state.routes,
        songs: state.player,
    }
}

function mapsDispatchToProps(dispatch) {
    return bindActionCreators({
        checkSignIn,
        search
    }, dispatch)
}

export default connect(mapStateToProps, mapsDispatchToProps)(Index); 