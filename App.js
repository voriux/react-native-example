import React from "react";
import { Button, Image, StyleSheet, FlatList, TouchableOpacity, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    fetchData() {
        return fetch('https://api.github.com/users/voriux/repos')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('Response received');
            this.setState({
              isLoading: false,
              dataSource: responseJson,
            }, function(){

            });

          })
          .catch((error) =>{
            console.error(error);
          });
    }

  render() {

    if(this.state.isLoading){
        return(
            <View style={styles.container}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.fetchData();
                  }} >
                  <Text style={styles.buttonText}>Get Data</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.fetchData();
          }} >
          <Text style={styles.buttonText}>Refresh Data</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.dataSource}
          style={styles.flatList}
          renderItem={({item}) => <View style={styles.flatListItemContainer}><Text style={styles.flatListText}>{item.full_name}</Text></View>}
          keyExtractor={({id}, index) => id}
        />

      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: "center"
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0000FF',
        padding: 10,
        margin: 10
    },
    buttonText: {
        color: '#FFFFFF'
    },
    flatList: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#FBFBFB'
    },
    flatListItemContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#FBFBFB'
    },
    flatListText: {
        padding: 10,
    },
    flatListImage: {
        width: '100%',
        height: 200
    }
})

export default createAppContainer(AppNavigator);
