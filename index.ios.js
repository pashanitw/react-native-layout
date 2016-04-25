/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ListView
} from 'react-native';

var MOCKED_MOVIES_DATA = [
    {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class awesomepro extends Component {
    constructor(props){
        super(props);
        this.state={
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2)=>row1!==row2
            }),
            isLoaded:false
        }
    }
    _renderLoading(){
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    _renderMovie(movie){
        return  <View style={styles.container}>
            <Image source={{uri:movie.posters.thumbnail}}
                   style={styles.thumbnail}/>
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.year}>{movie.year}</Text>
            </View>
        </View>
    }
    _renderListView(){
        return <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this._renderMovie}
                  style={styles.listView}></ListView>
    }
    render() {
        return this.state.isLoaded?this._renderListView():this._renderLoading()
    }
    _fetchData(){
        fetch(REQUEST_URL)
            .then(response=>response.json())
            .then((data)=>{
                this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(data.movies),
                        isLoaded:true

                })
                console.log("data is",data)
            })
            .done()
    }
    componentDidMount(){
        this._fetchData()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth:2,
        borderColor:"#000"
    },
    rightContainer:{
      flex:1
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('awesomepro', () => awesomepro);
