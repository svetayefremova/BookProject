/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import HomeComponent from './app/Components/HomeComponent.js';
import SearchComponent from './app/Components/SearchComponent.js';
import BookComponent from './app/Components/BookComponent.js';

export default class BookProject extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="home" component={HomeComponent} initial={true}/>
        <Scene key="search" component={SearchComponent} title="Bookcase"/>
        <Scene key="book" component={BookComponent} title="Book"/>
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('BookProject', () => BookProject);