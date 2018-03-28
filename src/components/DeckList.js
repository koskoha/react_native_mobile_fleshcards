import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class DeckList extends React.Component {
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow(rowData){
    const { navigation } = this.props;
    return (<View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}} >
        <TouchableOpacity
          onPress={() => navigation.navigate('Deck',{ title: rowData.title })}
        >
          <Text>{rowData.title}</Text>
          <Text>{rowData.questions.length} cards</Text>
        </TouchableOpacity>
      </View>)
  }
  
  render() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.props.decks}
        renderRow={this._renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps(store){
  return { decks: ds.cloneWithRows(store.decks) }
}

export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
