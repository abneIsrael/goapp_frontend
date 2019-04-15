import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
    /**
     * state é apenas uma variavel/objeto que esta definida na classe Component
     * toda vez que algum valor do state é alterado, nosso component que esta utilizando-o
     * renderiza na tela novamente, e ja vem com essa informacao alterada.
     * Isso é chamado de ON WAY DATA BIND
     */
    state = {
        username: '',
    };
    
    /**
     * Funcao estilo Arrow Function.
     * Sempre que precisar-mos criar uma nova função,
     * que nao faz parte do React, 
     * ela deve ser neste formato, para que nao
     * fique fora do escopo da nossa classe, o this.
     */

    handleSubmit = (e) => {
        e.preventDefault(); //Evita que o form envie um POST para o servidor Automaticamente, pois queremos controlar o que fazer quando o form for submitado

        const { username } = this.state; //desestruturacao do ES6

        if(!username.length) {
            //retorna null, caso o username esteja vazio, e impede que seja redirecionado sem o username
            return;
        }
        else {
            //caso possua username, acessa o storage do navegador e armazena o valor do user name
            localStorage.setItem('@GoTwitter::username', username); //setItem(indentificador, valor)

            this.props.history.push('/timeline'); //passa o endereco ao qual desejamos que o usuario seja redirecionado
        }
    };

    handleInputChange = (e) => {
        this.setState({username: e.target.value}); // Obtem o conteudo do imput. //setState é usado para alterar o conteudo do state
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.username}
                        onChange={this.handleInputChange} 
                        placeholder="Nome de Usuário" 
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}