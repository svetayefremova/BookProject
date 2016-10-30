import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      searchString: '',
      isLoading: false,
      message: ''
    };
  }

  render(){
    let spinner = this.state.isLoading ? ( <ActivityIndicator size='large'/> ) : ( <View/> );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bookcase</Text>
        <Image style={styles.image}
               source={require("../Resourses/book-bookmark-icon.png")}/>
        <Text style={styles.description}>Search book to read!</Text>
        <TextInput style={styles.searchInput}
                   placeholder="Start to find..."
                   underlineColorAndroid="rgba(0,0,0,0)"
                   onChange={this.onSearchTextChanged.bind(this)}
                   value={this.state.searchString}/>
        <TouchableHighlight style={styles.button}
                            underlayColor="#16a085"
                            disabled={this.state.disabled}
                            onPress={this.onSearchButtonPressed.bind(this)}>
          <Text style={styles.buttonText}>GO!</Text>
        </TouchableHighlight>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }

  onSearchTextChanged(event) {
    this.setState({
      disabled: false,
      searchString: event.nativeEvent.text
    });
  }

  onSearchButtonPressed() {
    let url = createURL(this.state.searchString);
    this.sendRequest(url);
  }

  async sendRequest(query) {
    this.setState({ isLoading: true });

    try {
      let response = await fetch(query);
      let json = await response.json();
      this.setState({
        isLoading: false
      });
      Actions.search({json});
    } catch (error) {
      this.setState({
        isLoading: false,
        message: `Something bad happened: ${error}`
      });
    }
  }
}

function createURL(value) {
  let searchString = value;

  return 'https://www.googleapis.com/books/v1/volumes?q=' + searchString;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 0,
    marginTop: 65,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  title: {
    margin: 20,
    fontSize: 42,
    color: '#c0392b',
    fontWeight: 'bold',
    letterSpacing: 3
  },
  description: {
    margin: 5,
    color: '#656565',
    textAlign: 'center',
    fontSize: 18
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#1abc9c',
    borderRadius: 8,
    fontSize: 18,
    padding: 4,
    marginTop: 20,
    alignSelf: 'stretch'
  },
  button: {
    marginVertical: 20,
    height: 40,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    backgroundColor: '#1abc9c',
    padding: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 30
  }
});
