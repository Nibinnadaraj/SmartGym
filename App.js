import React, { Component } from 'react';
import {
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';
import Login from './app/components/Login';
import AddMember from './app/components/AddMember';
import AddPackage from './app/components/AddPackage';
import AllMemberList from './app/components/AllMemberList';
import Dashboard from './app/components/Dashboard';
import GymProfile from './app/components/GymProfile';
import MemberDetails from './app/components/MemberDetails';
import User from './app/components/User';
import EditUser from './app/components/EditUser';
import Settings from './app/components/Settings';
import Icon from 'react-native-vector-icons/Ionicons';


export default class App extends Component{
render(){
return(
 <AppContainer/>
);


}


}
const UserStack = createStackNavigator({
    User : { 
        screen : User,
         navigationOptions: {
            header: null //Need to set header as null.
        }
    },
    EditUser : {
        screen : EditUser,
        navigationOptions: {
           header: null //Need to set header as null.
       }
    }
});

const AllMemberStack = createStackNavigator({
    AllMemberList : { 
        screen : AllMemberList,
         navigationOptions: {
            header: null //Need to set header as null.
        }
    },
    User : {
        screen : UserStack,
        navigationOptions: {
           header: null //Need to set header as null.
       }
    }
});

const DashboardStack = createStackNavigator({
    Dashboard : { 
        screen : Dashboard,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: <Icon name="md-menu"
                style = {{ paddingLeft : 10}}
                onPress ={()=> navigation.openDrawer()} 
                size={30}/>
            }
          }
    },
        AllMemberList :{
            screen : AllMemberStack
        }

});



const MainTabNavigator = createBottomTabNavigator({
    GymProfile,
    DashboardStack,
    AllMemberList

},{
    navigationOptions : ({navigation}) => {
        const {routeName} = navigation.state.routes[navigation.state.index];
        return{
            header: null,
            headerTitle:routeName
        };
    }
}
);

const MainStack = createStackNavigator({
    MainTabNavigator :MainTabNavigator,

});

const DashDrawerScreen = createDrawerNavigator(
   {

    Dashboard : {
        screen:MainStack
    },
    Settings : {
        screen : Settings
    }
   }

);
const AppSwitchNavigator = createSwitchNavigator({
    Login : { screen: Login},
    Home : { screen : DashDrawerScreen},

}); 

const AppContainer = createAppContainer(AppSwitchNavigator);