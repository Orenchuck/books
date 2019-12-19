import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Books } from './components/books';
import { Login } from './components/login';
import { Register } from './components/register';
import { ErrorPage } from './components/error';

ReactDOM.render((
<BrowserRouter>
    <App />
    <Switch>
    <Route exact path='/' component={Books} />
        <Route path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        {/* <Route path='/posts/:id' component={Post} /> */}
        <Route path='*' component={ErrorPage} />
    </Switch>
</BrowserRouter>
    ), document.getElementById('root'));
    serviceWorker.unregister();
