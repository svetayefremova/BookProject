import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, ListView, TouchableHighlight, Linking } from 'react-native';

export default class BookComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let item = this.props.item;

    let buyButton = item.saleInfo.buyLink ?
      ( <TouchableHighlight style={styles.button}
                            underlayColor="#16a085"
                            onPress={()=> this._linkPressed(item.saleInfo.buyLink)}>
        <Text style={styles.buttonText}>{'Buy'.toUpperCase()}</Text>
      </TouchableHighlight> ) : ( null );

    let downloadButton = item.accessInfo.pdf.downloadLink ?
      ( <TouchableHighlight style={styles.button}
                            underlayColor="#16a085"
                            onPress={()=> this._linkPressed(item.accessInfo.pdf.downloadLink)}>
        <Text style={styles.buttonText}>{'Download'.toUpperCase()}</Text>
      </TouchableHighlight> ) : ( null );

    let image = item.volumeInfo.imageLinks ?
      ( <Image style={styles.image}
               source={{uri: item.volumeInfo.imageLinks.thumbnail}} /> ) : ( null );

    return(
      <View style={styles.container}>
        {image}
        <Text style={styles.description}>Book title: {item.volumeInfo.title}</Text>
        <Text style={styles.description}>Authors: {item.volumeInfo.authors}</Text>
        <Text style={styles.description}>Publisher: {item.volumeInfo.publisher}</Text>
        <Text style={styles.description}>Published: {item.volumeInfo.publishedDate}</Text>
        <View style={styles.buttons}>
          {buyButton}
          {downloadButton}
        </View>
      </View>
    );
  }

  _linkPressed(url){
    Linking.openURL(url);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    marginTop: 65
  },
  description: {
    margin: 5,
    color: '#656565',
    textAlign: 'center',
    fontSize: 18
  },
  image: {
    width: 128,
    height: 169,
    margin: 40,
    alignSelf: 'center'
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    flex: 2,
    margin: 5,
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
  }
});