import React,{useState}from 'react';
import {
  View, 
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import Texts from '../../styles/Texts';
import DropShadows from '../../styles/DropShadows';
import styles from '../../styles/CompsStyles/ReportStyles';
import Fetch from '../Fetch';




function Report(props){
const [strk1, setStrk1] = useState(0);
const [strk2, setStrk2] = useState(0);
const [sub,setSub] = useState('');
const [msg, setMsg] = useState('');


var sendButton = null;



if (sub == '' || msg == ''){
sendButton = (
<TouchableOpacity
style={styles.button}
onPress = {()=>{
  props.showPop('MissingFields1');

}}
>
<Text style={[Texts.HeadS,{color:'#fff'}]}>Send</Text>
</TouchableOpacity>
)  
} else {
  sendButton = (
  <TouchableOpacity
  style={styles.button}
  onPress = {()=>{
    Fetch('createReport',{unit_num: props.unit, subject: sub, message: msg},'Report sent');
    props.showPop('ReportedSuccessfully');
    setSub('');
    setMsg('');
  }}
>
  <Text style={[Texts.HeadS,{color:'#fff'}]}>Send</Text>
</TouchableOpacity> 
  )  
} 



  return(

<ScrollView style={styles.container}>
<View style={{flex:1, marginBottom: 100}}>
  {/* Header */}
  <View style={styles.Head}>
    <Text style={Texts.SecHead}>Report</Text>
    <Text style={Texts.Body}>Send a message to building manager regarding visitor parking issues.</Text>
  </View>
      
  {/* TextInput Card */}
  <KeyboardAvoidingView behavior='position'>
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      
      <View style={[styles.card, DropShadows.shadow]}>
          <View style={styles.title}>
            <Text style={Texts.HeadL}>Your message</Text>
          </View>
          {/* Subject textInput */}
          <Text style={Texts.Body}>Subject:</Text>
          <TextInput
            value = {sub}
            onChangeText={text => setSub(text)}
            placeholder = "Subject"
            style={[styles.input,Texts.FormText,{borderWidth: strk1}]}
            onFocus = {()=>{setStrk1(2)}}
            onBlur = {()=>{setStrk1(0)}}
            clearButtonMode = 'always'
            maxLength = {50}
          />
          {/* Message textInput */}
          <Text style={Texts.Body}>Message:</Text>
          <TextInput
            value = {msg}
            onChangeText={text => setMsg(text)}
            style={[styles.input,Texts.FormText,{height:200, borderWidth:strk2, paddingTop:10, paddingBottom: 10}]}
            onFocus = {()=>{setStrk2(2)}}
            onBlur = {()=>{setStrk2(0)}}
            multiline = {true}
          />
          {/* Send Button */}
        {sendButton}
      </View>


    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
    

</View>
</ScrollView>
  )
}


export default Report;
