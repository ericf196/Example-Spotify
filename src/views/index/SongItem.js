import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.css'


class SongItem extends Component {
    render() {
        const { songName, tokenPath, albumPhoto, artistSong, songId } =this.props

        return (
            <div className="SongItem">
                <Link to={"player/" + songId + tokenPath}>
                    <div className="SongItem-photo">
                        <img src={albumPhoto} />
                    </div>
                    <div className="SongItem-info">
                        <h2>{songName}</h2>
                        <h3>{artistSong}</h3>
                    </div>
                </Link>
            </div>
        )
    }
}

SongItem.prototype = {
    songId: PropTypes.string,
    tokenPath: PropTypes.string,
    albumPhoto: PropTypes.string,
    albumName: PropTypes.string,
    songName: PropTypes.string,
    artistSong: PropTypes.string,
}

export default SongItem;
