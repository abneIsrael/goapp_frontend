import React, { Component } from 'react';

import socket from 'socket.io-client';
import api from '../services/api';
import twitterLogo from '../twitter.svg';
import './Timeline.css';

/**
 * Import Components
 */
import Tweet from '../components/Tweet';

export default class Timeline extends Component {

    state = {
        tweets: [], //Armazenara os tweets que ja existem vindos pela api
        newTweet: "", //Armazenara o conteudo do textarea para utilizarmos depois no submit
    };

    //componentDidMount : Esse evento executa automaticamente quando o componente é renderizado, exibida em tela
    async componentDidMount () {
        this.subscribeToEvents(); //inicializa o socket

        const response = await api.get('tweets'); //envia uma requisicao para obter os tweets

        this.setState({ tweets: response.data}); //Armazena os dados retornados
    };

    //encapsula numa unica funcao o nosso realtime
    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');//estabelece conexao com server

        io.on('tweet', data => {
            console.log(data)
            this.setState({ tweets: [data, ...this.state.tweets] }); //Recria o array de tweets, com o mais novo no inicio //... operador 'spraid', pega todos os valores de um objeto
        });

        io.on('like', data => {
            this.setState({ tweets : this.state.tweets.map(tweet => tweet._id === data._id ? data : tweet) })
        })
    };

    handleInputChange = (e) => {
        this.setState({newTweet: e.target.value}); // Obtem o conteudo do textarea. //setState é usado para alterar o conteudo do state
    }

    handleNewTweet = async (e) => {
        if (e.keyCode !== 13) { //keyCode, serve para ver a tecla que foi teclada para acionar o evento do onKeyDown

            return; //caso o usuario digite outra tecla alem do enter (codigo 13) quando o foco estiver no textarea, nao fara nada
        } else {
            const content = this.state.newTweet; //pega o conteudo digitado no textarea que foi armazenado no state
            const author = localStorage.getItem('@GoTwitter::username'); //obtem o author do texto, ou seja, o nome do usuario que salvamos no localStorage do navegador

            await api.post('tweets', { content, author }); //envia uma requisicao para a rota /tweets
            
            this.setState({newTweet: ''}); //zera o valor da nossa textarea, para o usuario poder inserir um novo tweet depois
        }
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="GoTwitter" />

                <form>
                    <textarea 
                        value={this.state.newTweet} 
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?"
                    />
                </form>
                
                <ul className="tweet-list">
                    { this.state.tweets.map(tweet => 
                        <Tweet key={tweet._id} tweet={tweet} />
                    ) }
                </ul>

            </div>
        );
    }
}