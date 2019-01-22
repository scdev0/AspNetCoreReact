import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './AuthService';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';

class App extends Component {
	constructor() {
		super();
		this.authService = new AuthService();
	}

	renderHome() {
		let resultComponent = <Home auth={this.authService} />;

		if (!this.authService.isAuthenticated()) {
			this.authService.login();
			resultComponent = (
				<div>
					<p>Redirecting to the authentication service...</p>
				</div>
			);
		}

		return resultComponent;
	}

	startSession(history) {
		this.authService.handleAuthentication(history);
		return (
			<div>
				<p>Starting session...</p>
			</div>
		);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>My Bookstore</p>
				</header>
				<Switch>
					<Route exact path="/" render={() => this.renderHome()} />
					<Route
						path="/startSession"
						render={({ history }) => this.startSession(history)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
