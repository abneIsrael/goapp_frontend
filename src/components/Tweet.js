import React, { Component } from 'react';

import api from '../services/api';
import like from '../like.svg'
import './Tweet.css';

export default class Tweet extends Component {
    
    handleLike = async () => {
        const { _id} = this.props.tweet;
        
        await api.post('likes/'+_id+'');
    };
    
    render() {
        const { tweet } = this.props; //desestruturacao do ES6, para facilitar o acesso as propiedades

        return (
            <li className="tweet">
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type="button" onClick={this.handleLike}>
                    <img src={like} alt="like" />
                    {tweet.likes}
                </button>
            </li>
        );
    }
}