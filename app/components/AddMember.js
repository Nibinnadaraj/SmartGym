import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
    Picker,
    Image,
    ScrollView,

} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
export default class AddMember extends Component{
    constructor(props){
        super(props);

        this.state = {
            name : '',
            address: '',
            email: '',
            phone: '',
            admission_date: '',
            package: '',
            gender : '',
            memberImage: null,
        }
    }

    render(){
        return(
            <View>

<ScrollView 
showsVerticalScrollIndicator={false}
contentContainerStyle={styles.container}>

                <View style={styles.memberImage}>

                <Image
                style={styles.memberImagePreview}
                source={this.state.memberImage != null ? this.state.memberImage : require('../../images/notavailable.jpeg')}
                />
                <TouchableOpacity 
                style={styles.memberImageSelect}
            onPress={ this.imageUpload}>
                <Text style={{color:'red'}}><Icon name ='ios-add-circle' size={40}/></Text>
                </TouchableOpacity>

                </View>
               
                <TextInput placeholder="Name"
                style={styles.textInput}
                onChangeText = {(name) => {this.setState({name})}}
                underlineColorAndroid='transparent'/>

                <TextInput placeholder="Address"
                                style={styles.textInput}
                                onChangeText = {(address) => {this.setState({address})}}
                                underlineColorAndroid='transparent'/>


                <TextInput placeholder="Email"
                                style={styles.textInput}
                                onChangeText = {(email) => {this.setState({email})}}
                                underlineColorAndroid='transparent'/>

                <TextInput placeholder="Phone"
                                style={styles.textInput}
                                onChangeText = {(phone) => {this.setState({phone})}}
                                underlineColorAndroid='transparent'/>

                <DatePicker
                                style={styles.date}
                                date={this.state.date}
                                mode="date"
                                placeholder="Admission Date"
                                format="YYYY-MM-DD"
                                /*minDate="2016-05-01"
                                maxDate="2016-06-01"*/
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                  dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                  },
                                  dateInput: {
                                    marginLeft: 36
                                  }
                                  // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({admission_date: date})}}
                              />       
                                
                <View style={styles.textInput}>
                    <Picker 
                    selectedValue={this.state.package} 
            onValueChange={(itemValue, itemIndex) =>
                this.setState({package: itemValue})
            }>
            <Picker.Item value='' label='Select Package'/>
            <Picker.Item label="Basic 300" value="300" />
            <Picker.Item label="Pro Cardio 600" value="600" />
            </Picker>


            <Picker 
                    selectedValue={this.state.gender} 
            onValueChange={(itemValue, itemIndex) =>
                this.setState({gender: itemValue})
            }>
            <Picker.Item value='' label='Gender'/>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            </Picker>


            </View>
            
            
                

            <TouchableOpacity
            style={styles.button}
            onPress = {this.addMember}
            >
                
                <Text>Add Member</Text></TouchableOpacity>
                </ScrollView>
                </View>

              

        );

    }
    imageUpload = () => {

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }  else {
              //const source = { uri: response.uri };
              //const source = { uri: response };
              // You can also display the image using data:
               const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                memberImage: source,
              });
            }
          });


    }



    addMember =() => {

      if(this.state.memberImage == null){
        alert('Image Could Not Be Empty.!');
      }else{
        RNFetchBlob.fetch('POST', 'http://192.168.43.104/phpserver/index.php?purpose=adduser', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, [
    // custom content type
    { name : 'memberImage', filename : this.state.name+'.jpg', type:'image/jpg', data: 'file://'+this.state.memberImage},
    // elements without property `filename` will be sent as plain text
    { name : 'name', data : this.state.name},
    { name : 'info', data : JSON.stringify({
      address: this.state.address,
        email: this.state.email,
        phone: this.state.phone,
        admission_date: this.state.admission_date,
        package:this.state.package,
        gender:this.state.gender,       
    })},
  ]).then((resp) => {
    alert(resp['data']);
  }).catch((err) => {
    // ...
  })



        /*const fileURL = this.state.memberImage.uri;
        const cleanURL = fileURL.replace("file://", "");*/
    /*  const formData = new FormData();
      let data =  {
        purpose: 'adduser',
        name: this.state.name,
        address: this.state.address,
        email: this.state.email,
        phone: this.state.phone,
        admission_date: this.state.admission_date,
        package:this.state.package,
        gender:this.state.gender,
      };
      for (let key in data) {
        formData.append(key, data[key]);
        
      }

       formData.append("photo", {
        uri:  this.state.memberImage.uri,
        name: this.state.memberImage.uri.fileName,
        type: this.state.memberImage.uri.type,
      });
      fetch("http://192.168.43.104/phpserver/index.php", {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      alert(response['data']);
    })
    .catch(error => {
      console.log("upload error", error);
      alert(error);
    });*/
};



  }

}

const options = {
  title: 'Member Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const styles = StyleSheet.create(
{

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: 40,
        paddingRight: 40,
        paddingVertical: 20,
    },
    textInput:{
        alignSelf:"stretch",
        padding:8,
        marginBottom:5,
        backgroundColor: '#9c9b98',
        borderRadius:10,
    
    },
    date:{
        alignSelf:"stretch",
        width:240,
        padding:5,
        marginBottom:10,
        backgroundColor: '#9c9b98',
        borderRadius:10,
    
    },
    button:{
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor : '#ff4545',
        padding:10,
        borderRadius:50,
       
       },
    contentContainer: {
        paddingVertical: 20
      },

      memberImage :{
        position:'relative',
            
      },
      memberImageSelect:{
        position:'absolute',
        bottom:30,
        right:0,
      },
      memberImagePreview: {
            alignSelf:"center",
            width:150,
            height :150,
            marginBottom:20,
            borderRadius:75,
      },
}
);