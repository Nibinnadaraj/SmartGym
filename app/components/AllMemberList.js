import React, { Component } from 'react';
import {
  StyleSheet, 
    Text, 
    View,
    FlatList,
    ActivityIndicator,
    TextInput

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {SearchBar, ListItem} from 'react-native-elements';


export default class AllMemberList extends Component{

  constructor(props){
      super (props);

      this.state = {
        isLoading : true,
        search :'',
      };

      this.arrayHolder = [];

  }

 

  componentDidMount(){

    const urlAddress = 'http://192.168.43.104/phpserver/index.php?purpose=userlist&&sort=';

    return fetch(urlAddress+'expiredin7days')
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

  userListFunction(param){

    const urlAddress = 'http://192.168.43.104/phpserver/index.php?purpose=userlist&&sort=';

    if(param == undefined){
      alert("this is undefined");
  
    } else if (param == '"fullpaid"') {
  
      return fetch(urlAddress+'fullpaid')
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
    } else if (param == '"remainder"') {
      return fetch(urlAddress+'remainder')
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
    } else if (param == '"unpaid"') {
      return fetch(urlAddress+'unpaid')
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
    }else if (param == '"total"') {
  
      return fetch(urlAddress+'all')
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
    } else if (param == '"lastmonthregister"') {
  
      return fetch(urlAddress+'lastmonthregister')
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
    } else if (param == '"expiredin7"') {
  
      return fetch(urlAddress+'expiredin7days')
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
    } else if (param == '"totalexpired"') {
  
      return fetch(urlAddress+'expired')
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
  param = '';
  param = JSON.stringify(navigation.getParam('param'));
  this.userListFunction(param);

  

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

    
        onPress = {() => {this.props.navigation.navigate('User',{
          param: item.id,
          });
        }
      }              
        roundAvatar              
        title={item.name}  
        subtitle={item.phone}                           
        avatar={{ uri: item.picture.thumbnail }}   
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