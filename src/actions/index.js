import axios from 'axios'
import { TrackHandler, Client } from "spotify-sdk";

let client = Client.instance;

client.settings = {
    clientId: '5181b78199184a4990eb859ffecd8e04',
    secretId: 'e3154757199c477182289a56b6081df1',
    scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
    redirect_uri: 'http://localhost:3000/'
}

export const checkSignIn = () => {
    return (dispatch, getState) => {
        if (sessionStorage.token) {
            client.token = sessionStorage.token
        } else if (window.location.hash.split('&')[0].split('=')[1]) {
            sessionStorage.token = window.location.hash.split('&')[0].split('=')[1]
            client.token = sessionStorage.token
        } else {
            client.login()
                .then(url => {
                    window.location = url
                })
        }
    }
}

const startFetch = () => { return { type: "IS_FETCHING", isFetching: true } }
const errorFetch = (err) => { return { type: "ERROR_FETCH", isFetching: false, err } }
const completeFetch = (data) => { return { type: "COMPLETE_FETCH", isFetching: false, payload: data } }

export const search = (trackName) => { //trackName is text within input
    return (dispatch, getState) => {
        dispatch(startFetch())
        let track = new TrackHandler()
        track.search(trackName, { limit: 5 })
        .then( trackCollection => {
            console.log(trackCollection)     
            dispatch(completeFetch(trackCollection))
        }).catch(err =>{
            dispatch(errorFetch(err))
        })
    }
}

const completeSong= (data)=> {return{ type:"COMPLETE_SONG", success:true, payload: data }}

export const playTrack = (songId) => {
    return (dispatch, getState) => {
        dispatch(startFetch())
        axios.get('https://api.spotify.com/v1/tracks/' . concat(songId), {headers:{"Authorization": "Bearer " + client.token} } )
        .then(response =>{
            dispatch(completeSong(response.data))
        })
        .catch(err => {
            console.log(err)
        })

    }
}