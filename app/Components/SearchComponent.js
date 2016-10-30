import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, ListView, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.json.items)
    }
  }

  render() {
    return (
     <View style={styles.container}>
       <ListView dataSource={this.state.dataSource}
                 renderRow={this.renderItem.bind(this)}
                 style={styles.list}
       />
     </View>
    );
  }

  renderItem(rowData) {
    return (
      <TouchableHighlight style={styles.row}
                          underlayColor="#16a085"
                          onPress={() => this.onPressed(rowData.selfLink)}>
        <View>
          <Text style={styles.title}
                numberOfLines={2}>
            {rowData.volumeInfo.title}
          </Text>
          <Text style={styles.author}>{rowData.volumeInfo.authors}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  onPressed(self) {
    let item = this.props.json.items.filter(prop => prop.selfLink === self)[0];

    Actions.book({item});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  list: {
    alignSelf: 'stretch'
  },
  row: {
    marginVertical: 1,
    backgroundColor: '#1abc9c',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  author: {
    color: '#fff',
    fontSize: 16,
  }
});