import React,{useState} from 'react';
import {
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Picker, 
  Image, 
  TouchableWithoutFeedback,
  Keyboard, 
  KeyboardAvoidingView
} from 'react-native';
import Texts from '../styles/Texts';
import styles from '../styles/CompsStyles/PopupStyles';
import Fetch from '../comps/Fetch';


function Popup(props){

  // variables for changing Popup content
  var title = '';
  var btnTxt = '';
  var content = null;
  var button = null;
  // Input Field 
  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [dur, setDur] = useState(1);
  // change stroke when Input is onFocuse
  const [strk1, setStrk1] = useState(0);
  const [strk2, setStrk2] = useState(0);
  
  // Conditions for deciding what to show in popup 

  // ---- Visitor Parking Policy ----
  if (props.pop == 'VisitorParkingPolicy'){
    title = 'Visitor Parking Policy';
    btnTxt = 'I Agree';
     button = (
       <TouchableOpacity 
        style = {styles.button}
        onPress = {()=>{props.showPop('');
        }}>
       <Text style={[Texts.HeadS,{color:'#fff'}]}>{btnTxt}</Text>
     </TouchableOpacity>
     )
    content = (
      <View>
        <Text style={[Texts.Body,{marginBottom:20}]}>
          1. Each apartment is allowed to have <Text style={Texts.BodyBold}>maximum 2 visitor vehicles </Text>parked in the visitor parking lot at the same time. 
        </Text>
        <Text style={[Texts.Body,{marginBottom:20}]}>
          2. Each visitor’s vehicle is allowed to park in visitor parking for a consecutive duration of <Text style={Texts.BodyBold}>24 hours.</Text></Text>
        <Text style={Texts.Body}>
          3. If visitors park over 24 hours, <Text style={Texts.BodyBold}>vehicles will be towed at owner's expense.</Text>
        </Text>
      </View>
    );
  }

  // ------- Add Visitor --------
  // generating picker item
  var addhr = [];
  for(var i=1;i<=24;i++){
    addhr.push(
    <Picker.Item key={i} label={i.toString()} value={i} />
    );
  }
  if (props.pop == 'AddVisitor'){
    title  = 'Add Visitor';
    btnTxt = 'Add';
    console.log('visitorName',props.visitorName,'visitorPlate', props.visitorPlate,'visitorId',props.visitorId,'visitorRegtime', props.visitorRegtime);
    button = (
      <TouchableOpacity 
        style={styles.button}
        onPress={()=>{
          // check if all fields are filled
          if(
            ((name == '' || plate == '') && props.visitorName == '' && props.visitorPlate == '') ||
            (name == '' && plate == '' && (props.visitorName == '' || props.visitorPlate == ''))
            ){
            // if a field is empty
            props.showPop('MissingFields');  
          } else {
            // if visitor is added organically
            if (name !== '' && plate !== '' && props.visitorName == '' && props.visitorPlate == ''){
              Fetch('addVisitor',{
              unit_num: props.unit, 
              name: name, 
              plate: plate, 
              duration: dur
              },'Added a visitor');
            }
            // if visitor is added thru 'revisit'
            if (name == '' && plate == '' && props.visitorName !== '' && props.visitorPlate !== ''){
              Fetch('addVisitor',{
              unit_num: props.unit, 
              name: props.visitorName, 
              plate: props.visitorPlate, 
              duration: dur
              },'Added a visitor');
            }
            // get Current visitor from the database
            props.getCurrentVisitors(props.unit);
            props.showPop('');
            // go back to Visitor page if on History page
            props.setCont('Visitors');
            // clear variables
            setName('');
            setPlate('');
            props.setVisitorName('');
            props.setVisitorPlate('');
            setDur(1);
            // if a second visitor was added, show that limit's reached 
            if(props.visitorNum >= 2){
                props.showPop('Max');
            }
          }
          
        }}>
        <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>      
      </TouchableOpacity>
    )   
    content = (
      <View>
        <Text style={Texts.Body}>Visitor's name:</Text>
        <TextInput 
            placeholder = "Name"
            value = {props.visitorName !==''? props.visitorName: name}
            style={[styles.input,Texts.FormText,{borderWidth: strk1}]}
            clearButtonMode = 'always'
            maxLength = {40}
            onFocus = {()=>{setStrk1(2)}}
            onBlur = {()=>{setStrk1(0)}}
            onChangeText = {(txt)=>{props.visitorName !==''? props.setVisitorName(txt):setName(txt)}}
          />
        <Text style={Texts.Body}>Visitor's plate number:</Text>
        <TextInput 
            placeholder = "Plate number"
            value = {props.visitorPlate !==''? props.visitorPlate: plate}
            style={[styles.input,Texts.FormText,{borderWidth: strk2}]}
            clearButtonMode = 'always'
            maxLength = {6}
            autoCapitalize = "characters"
            onFocus = {()=>{setStrk2(2)}}
            onBlur = {()=>{setStrk2(0)}}
            onChangeText = {(txt)=>{props.visitorPlate !==''? props.setVisitorPlate(txt):setPlate(txt)}}
          />
          <Text style={Texts.Body}>Parking duration (max 24hr):</Text>
          <View style={{flexDirection:'row',alignItems:'center', justifyContent: 'center'}}>  
            <Picker 
                style={{width: 130, marginRight: 20}}
                selectedValue = {dur}
                value={dur}
                itemStyle={{height:125}}
                onValueChange = {(val, ind)=>{
                  setDur(val);
                }}
              >
              {addhr}
            </Picker>
            <Text style={Texts.Body}>hr</Text>
          </View>
        </View>
      )
    } 

  // ------- Extend Parking ---------
  //Generating picker
  var exthr = [];
  for(var i=1;i<=(24-props.visitorRegtime);i++){
    exthr.push(
    <Picker.Item key={i} label={i.toString()} value={i} />
    );
  }
  const [extendhr, setExtendhr] = useState(1);  
  if (props.pop == 'ExtendParking'){
    title = 'Extend Parking';
    btnTxt = 'Extend';
    button = (
      <TouchableOpacity 
      style = {styles.button}
      onPress = {()=>{
        // Extend a visitor in database
        Fetch('extendVisitor',{
            id: props.visitorId, 
            extendhour: extendhr},
            'Extended a visitor');
        // get Current visitor info from the database
        props.getCurrentVisitors(props.unit);
        // Close popup
        props.showPop('');
        // clear variable
        props.setVisitorId(0);
        setExtendhr(1);
      }}>
        <Text style={[Texts.HeadS,{color:'#fff'}]}>{btnTxt}</Text>
      </TouchableOpacity>
    )
    content = (
      <View>
        <Text style={Texts.Body}>Max parking time allowed: 24hr</Text>
        <Text style={Texts.Body}>You've registered: 
        <Text style={{fontWeight:"bold"}}> {props.visitorRegtime}hr</Text>
        </Text>

        <Text style={[Texts.BodyBold,{marginTop: 20}]}>You would like to extend:</Text>
        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
          <Picker 
            style={{width: 130, marginRight: 20}}
            selectedValue = {extendhr}
            itemStyle={{height:125}}
            onValueChange = {(val,ind)=>{
              setExtendhr(val);
            }}
          >
            {exthr}
          </Picker>
          <Text style={Texts.Body}>hr</Text>
        </View>
      </View>
    );
  }

  // ---- Remove ---- 
  if (props.pop == 'Remove'){
    title = 'Remove';
    btnTxt = 'Yes';  
    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{
                // mark visitor as removed in database
                Fetch('removeVisitor',{id: props.visitorId},'Removed a visitor');
                // get Current visitors from database
                props.getCurrentVisitors(props.unit);
                // Show removed successfully
                props.showPop('RemovedSuccessfully');  
                // clear variable
                props.setVisitorName('');
                props.setVisitorId(0);        
              }}>
          <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
      </TouchableOpacity>
      )
    content = (
      <View>
        <Text style={[Texts.Body,{marginBottom: 30}]}>Are you sure you want to remove
        <Text style={{fontWeight:"bold"}}> {props.visitorName}</Text>
        ?</Text>
      </View>
    );
  }

  
  //----- Removed Successfully ---- 
    if (props.pop == 'RemovedSuccessfully'){
      title = 'Removed Successfully';
      btnTxt = 'Okay';
      button = (
        <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                  props.showPop('');
                }}>
                <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
              </TouchableOpacity>
        )
      content = (
        <View>
          <Text style={[Texts.Body,{paddingBottom: 20}]}>Your visitor has been successfully removed.</Text>
        </View>
      );
    }

  // ---- Reported Successfully ----
  if(props.pop == 'ReportedSuccessfully'){
    title = 'Reported Successfully';
    btnTxt = 'Okay';
    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{
                props.showPop('');
              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
            </TouchableOpacity>
      )
    content = (
      <View>
        <Text style={[Texts.Body,{paddingBottom: 20}]}>Thank you! You reported successfully!</Text>
      </View>
    );
  }

  // ---- Revisit Fail ----
  if(props.pop == 'Full'){
    title = "Visitor limit reached";
    btnTxt = 'Okay';
    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{
                props.showPop('');
              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
       </TouchableOpacity>
      )

    content = (
      <View>
        <Text style={[Texts.Body,{paddingBottom: 20}]}>Visitor limit (maximum 2 visitors) has already been reached. You won't be able to add another visitor until one has been removed.
        </Text>
      </View>
    );
  }


  // ----- Reached Max # of visitor ----
  if(props.pop == 'Max'){
    title = "Visitor limit reached";
    btnTxt = "Okay"
    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{
                props.showPop('');
              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
       </TouchableOpacity>
      )
    content = (
      <View>
        <Text style={[Texts.Body,{paddingBottom: 20}]}> 
        You have added 2 visitors. You won't be able to add another visitor until one has been removed.   
        </Text>
      </View>
    );
  }
    
  // ------- Missing Fields ---------
  if(props.pop == 'MissingFields'){
    title = "Missing Fields";
    btnTxt = 'Okay';
    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{
                props.showPop('');
                if (props.cont=='History'){
                  props.showPop('AddVisitor');
                }       
              }}>
          <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
      </TouchableOpacity>
      )
    content = (
      <View style={{alignItems:'center'}}>
        <Text style={[Texts.Body,{paddingBottom:10}]}>Please fill out all the fields.
        </Text>
      </View>
    );
  }



  // ------  Building Manager Reports Popup --------
  if (props.pop == 'Reports'){
    title = 'Parking Sideways!!';
    btnTxt = 'Close';
    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{

                // always turns off the second card slot (card2)
                props.showPop('');

              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
            </TouchableOpacity>
      )
    content = ( 
      <View>
  <Text style={[Texts.Body]}>Date: August 23, 2019</Text>
  <Text style={[Texts.Body,{marginBottom: 30}]}>Reported By: Unit 201</Text>
  <Text style={[Texts.BodyBold]}>Message:</Text>
  <Text style={[Texts.Body]}>omg someone is parking in the visitor parkign lot bad guy ohh noo stranger dangerrrrOMG... o__o</Text>
      </View>
    );
  }

  if (props.pop == 'UnitProfile'){
    title = 'Edit License Plate';
    btnTxt = 'Set Plate';

    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{

                // always turns off the second card slot (card2)
                props.showPop('');

              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
            </TouchableOpacity>
      )
    content = (
      <View>
  <Text style={[Texts.Body,{marginBottom: 10}]}>Tenants plate number:</Text>
  <TextInput 
          placeholder = "Plate Number"
          
          style={[styles.input,Texts.FormText,{borderWidth: strk1}]}
          clearButtonMode = 'always'
          maxLength = {6}
          onFocus = {()=>{setStrk1(2)}}
          onBlur = {()=>{setStrk1(0)}}
          onChangeText = {(txt)=>{(txt)}}
        />
  
      </View>
    );
  }

  return(
    // This is dark background
  <View style={styles.bg}>
  <View style={styles.darkbox1}></View>
  <View style={styles.darkbox2}></View>
      {/* This is popup area */}
    <KeyboardAvoidingView 
        behavior = "position"
        >
      <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style={styles.poparea}>
        {/* Close Button */}
          <TouchableOpacity 
            onPress = {()=>{
              // close popup 
              props.showPop('');
              // clear all variables
              setName('');
              setPlate('');
              setDur(1);
              setExtendhr(1);
              props.setVisitorName('');
              props.setVisitorPlate('');
              props.setVisitorRegtime(0);
              props.setVisitorId(0);
            }}
            style={[styles.closeBut,{display:(props.pop=='AddVisitor'||props.pop=='ExtendParking'||props.pop=='Remove')?'flex':'none'}]} 
          >
              <Image 
                  source={require('../img/cross.png')}
                  resizeMode = 'contain'
                  style={styles.img}
                />
          </TouchableOpacity>
          {/* Popu Title */}
          <View style={styles.title}>
              <Text style={Texts.HeadL}>{title}</Text>
          </View>
          {/* Popup Content */}
          {content}
          {/* Popup Button */}
          {button}
        </View>

        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </View>
  )

}


export default Popup;
