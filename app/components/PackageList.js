import React, { Component } from 'react';
import {
  StyleSheet, 
    Text, 
    View,
    FlatList,
    ActivityIndicator,
    Alert,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {SearchBar, ListItem} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class PackageList extends Component{

  constructor(props){
      super (props);

      this.state = {
        isLoading : true,
        search :'',
      };

      this.arrayHolder = [];

  }


  deleteItem(id){

    return fetch('http://192.168.43.104/phpserver/index.php?purpose=deletepackage&&id='+id)
    .then(response => response.json())
    .then(responseJson => {
     alert(responseJson);
    })
    .catch(error => {
      console.error(error);

    });
    
  }

 

  userListFunction(id){

    const urlAddress = 'http://192.168.43.104/phpserver/index.php?purpose=viewpackage&&gymid=';

    if(id == undefined){
      alert("this is undefined");
  
    }
  
      return fetch(urlAddress+id)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        isLoading :false,
        dataSource : responseJson['userlist'],
      },
      function(){
        this.arrayHolder = responseJson['userlist'];
      }
      );
    })
    .catch(error => {
      console.error(error);

    });
    
  }

  updateSearch = search => {
    this.searchFilterFunction(search);
    this.setState({search : search});
  };

clear = () => {
  this.setState({search : ''});
};
searchFilterFunction(text){
  
  
  const newData = this.arrayHolder.filter(function(item) {
    const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  
  this.setState({
    dataSource: newData,
    search:'',
  }); 
}



renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
      }}
    />
  );
};

renderHeader = () => {
  const { search } = this.state;
  return (

    <SearchBar 
        searchIcon = {<Icon name ='md-search' size={30}/>}
        clearIcon ={<Icon name='md-close' size = {30} />}
        onChangeText = {this.updateSearch}
        onClear = {this.clear}
        autoCorrect={false}
        lightTheme
        round
        value = {search}
        />
  );
};
render(){

  const { navigation } = this.props;
  id = '';
  id = JSON.stringify(navigation.getParam('id'));
  this.userListFunction(id);

  

  if(this.state.isLoading){
    return(
      <View style={styles.activeIndicator}>
        <ActivityIndicator
        size ="large"
        color="#00ff00"
        />
      </View>
    );
  } 

  return(

    <View style={{ flex: 1 }}>
      <FlatList          
    data={this.state.dataSource}          
    renderItem={({ item }) => ( 
      <ListItem                           
        title={item.package_name}  
        subtitle={item.amount}       
        rightIcon ={<TouchableOpacity
        onPress = {() => { 

          Alert.alert(
            'Delete Package',
            'Are You Sure To Delete : ' + item.package_name,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Okay', onPress: () => this.deleteItem(item.id)},
            ],
            {cancelable: false},
          );
          


         }}
        >
          <Icon name = 'ios-trash' size={30} />
        </TouchableOpacity>}                
        containerStyle={{ borderBottomWidth: 0 }} 
      />          
    )}          
    keyExtractor={item => item.id}  
    ItemSeparatorComponent={this.renderSeparator} 
    ListHeaderComponent={this.renderHeader}                             
  /> 
    </View>


  
  
   
  
  );
}

}

const styles = StyleSheet.create({

    container:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c2526',
        paddingLeft: 40,
        paddingRight: 40,
        paddingVertical: 20,
    },
    activeIndicator:{
      alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c2526',
        height : '100%',
        paddingLeft: 40,
        paddingRight: 40,
        paddingVertical: 20,

    },
    textStyle: {
      padding: 10,
    },



});