import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { getPhotoByKeyword } from "./Unsplash";

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      query: 'Ssandip',
      photos: [],
    }
  }

  componentDidMount() {
    // const photos = getPhotoByKeyword('man')
    this.getPhotos('man')
  }

  getPhotos = async (query) =>  {
      const photos = await getPhotoByKeyword(query)
      this.setState({photos})
  }

  render() {
    console.log(this.state.photos)
    return (
      <View style={styles.container}>
        {/* <View style={styles.wrapper}> */}
          <SearchBar placeholder="Search..." value={this.state.query} cancelText={'Cancel'} maxLength={8} onChange={(query) => {this.setState({query})}} onSubmit={value => console.log(value, 'onSubmit')}/>
          <WingBlank>
            {/* <Button onClick={this.handleClick} type='primary' style={{marginTop: 16}}>Search</Button> */}
          </WingBlank>
          {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  wrapper: {
    padding: 20,
  }
});
