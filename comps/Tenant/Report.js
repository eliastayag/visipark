import React,{Component}from 'react';
import {View, Text,TouchableOpacity,TextInput} from 'react-native';
import Texts from '../../styles/Texts';
import styles from '../../styles/ReportStyles';




function Report(){
const[Svalue,onChangesText] = React.useState('');
const[value,onChangeText] = React.useState('');
const[showPopus,setPopus] = React.useState(false);

var popus = null;
 if (showPopus === true){
   popus = (
     <View>
      <Text>Reported Succefully</Text>
      <Text>You've reported succefully!</Text>
      <Button title="Okay" onPress={()=>{ setPopus(!showPopus)}}></Button>
     </View>
   );
 }


  return(
    <View>
      {popus}
      {/* Headings */}
      <View>
        <Text style={Texts.SecHead}>Report</Text>
        <Text style={Texts.Body}>Send a message to building manager regarding visitor parking issues.</Text>
      </View>

      {/* TextInput Card */}
    <View style={styles.card}>
        <Text style={Texts.HeadL}>Your message</Text>

        {/* Subject textInput */}
        <Text style={Texts.Body}>Subject:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangesText(text)}
          value={Svalue}
        />
        {/* Message textInput */}
          <Text style={Texts.Body}>Message:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={value}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={()=>{ setPopus(!showPopus)}}
        >
          <Text style={[Texts.HeadS,{color:'#fff'}]}>Send</Text>
        </TouchableOpacity>
        
        
    </View>

    </View>
  )
}


export default Report;
