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
import Visitors from './Tenant/Visitors';


function Popup(props){

  // variables for changing Popup content
  var title = '';
  var content = null;
  var btnTxt = '';
  var button = null;

  const [strk1, setStrk1] = useState(0);
  const [strk2, setStrk2] = useState(0);



  let time1= props.dur1
  var Hours1 = Math.floor(time1 /60)
  var minutes1 = time1 % 60

 let time2= props.dur2
 var Hours2 = Math.floor(time2 /60)
 var minutes2 = time2 % 60


  var dbGetData = async()=>{
    var resp = await fetch('http://localhost:8888/visipark/getData.php');
    var data = await resp.json();
    setDbUnits(data.data.units);
    setDbVisitors(data.data.visitors);
    setDbReports(data.data.reports);
  }
  
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

  // ------- Card 1 Add Visitor ---------
  // Add visitor to database Function
  const dbAddVisitor = async(unit, name, plate, duration)=>{
    var visitor = {
        data: {
            unit_num: unit,
            name: name,
            plate: plate,
            duration: duration
        }
    }
    var data = await fetch('http://localhost:8888/visipark/addVisitor.php',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(visitor)
    })
    let visitordata = await data.text();
    console.log("Data that server received for adding visitor",visitordata); 
    // dbGetData();
    props.dbGetCurrentVisitors(props.unit);
}
  
  // generating picker item
  var addhr = [];
  for(var i=1;i<=24;i++){
    addhr.push(
    <Picker.Item key={i} label={i.toString()} value={i} />
    );
  }
 
  //Card slot 1 AddVisitor function
  if (props.pop == 'AddVisitor' && props.card1 == false){
    title  = 'Add Visitor';
    btnTxt = 'Add';
    
    if (props.name1 == '' || props.plate1 == ''){
    button = (
    <TouchableOpacity style={styles.button}
            onPress={()=>{
              props.showPop('MissingFields')
            }}>
            <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>      
      </TouchableOpacity>
    )
          } else {
            button = (
            <TouchableOpacity style={styles.button}
            onPress={()=>{
              //add visitor to database
              dbAddVisitor(props.unit, props.name1, props.plate1, props.dur1);
              props.setCard1(true);
              props.showPop('');
              // go back to Visitor page if on History page
              props.setCont('Visitors');
              // after adding a second visitor show limit reached 
              if(props.card1 == true && props.card2==true){
                props.showPop('Max');
              }
            }}>
            <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>      
      </TouchableOpacity>
            )
          }
    
    content = (
      <View>
        <Text style={Texts.Body}>Visitor's name:</Text>

        <TextInput 
          placeholder = "Name"
          value = {props.name1}
          style={[styles.input,Texts.FormText,{borderWidth: strk1}]}
          clearButtonMode = 'always'
          maxLength = {40}
          value={props.name1}
          onFocus = {()=>{setStrk1(2)}}
          onBlur = {()=>{setStrk1(0)}}
          onChangeText = {(txt)=>{props.setName1(txt)}}
        />

        <Text style={Texts.Body}>Visitor's plate number:</Text>

        <TextInput 
          placeholder = "Plate number"
          value = {props.plate1}
          style={[styles.input,Texts.FormText,{borderWidth: strk2}]}
          clearButtonMode = 'always'
          maxLength = {6}
          value={props.plate1}
          autoCapitalize = "characters"
          onFocus = {()=>{setStrk2(2)}}
          onBlur = {()=>{setStrk2(0)}}
          onChangeText = {(txt)=>{props.setPlate1(txt)}}
        />

        <Text style={Texts.Body}>Parking duration (max 24hr):</Text>

        <View style={{flexDirection:'row',alignItems:'center', justifyContent: 'center'}}>
          
          <Picker 
            style={{width: 130, marginRight: 20}}
            selectedValue = {props.dur1}
            value={props.dur1}
            itemStyle={{height:125}}
            onValueChange = {(val, ind)=>{
              props.setDur1(val);
            }}
          >
            {addhr}
          </Picker>
          <Text style={Texts.Body}>hr</Text>
        </View>
      </View>
    );
   } 


   // -------- Card 2 AddVisitor function --------
   if (props.pop == 'AddVisitor' && props.card1 == true){
    title = 'Add Visitor';
    btnTxt = 'Add';

    if (props.name2 == '' || props.plate2 == ''){
      button = (
      <TouchableOpacity style={styles.button}
              onPress={()=>{
                props.showPop('MissingFields')
              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
              
        </TouchableOpacity>
      )
      } else {
              button = (
              <TouchableOpacity style={styles.button}
              onPress={()=>{
                // activate card1, close popup
                dbAddVisitor(props.unit, props.name2, props.plate2, props.dur2);
                props.setCard2(true);
                props.showPop('');
                props.setCont('Visitors');
                // after adding a second visitor show limit reached 
                if(props.card1 == true && props.card2==true){
                  props.showPop('Max');
                }
              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
              
        </TouchableOpacity>
              )
            }

    content = (
      <View>
        <Text style={Texts.Body}>Visitor's name:</Text>
        <TextInput 
          placeholder = "Name"
          value = {props.name2}
          style={[styles.input,Texts.FormText,{borderWidth: strk1}]}
          clearButtonMode = 'always'
          maxLength = {40}
          onFocus = {()=>{setStrk1(2)}}
          onBlur = {()=>{setStrk1(0)}}
          onChangeText = {(txt)=>{props.setName2(txt)}}
          />
        <Text style={Texts.Body}>Visitor's plate number:</Text>
        <TextInput 
          placeholder = "Plate number"
          value = {props.plate2}
          style={[styles.input,Texts.FormText,{borderWidth: strk2}]}
          clearButtonMode = 'always'
          maxLength = {6}
          autoCapitalize = "characters"
          onFocus = {()=>{setStrk2(2)}}
          onBlur = {()=>{setStrk2(0)}}
          onChangeText = {(txt)=>{props.setPlate2(txt)}}

          />
        <Text style={Texts.Body}>Parking duration (max 24hr):</Text>

        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
          <Picker 
            style={{width: 130, marginRight: 20}}
            selectedValue = {props.dur2}
            itemStyle={{height:125}}
            onValueChange = {(val, ind)=>{
            props.setDur2(val);
            }}
          >
            {addhr}
          </Picker>
          <Text style={Texts.Body}>hr</Text>
        </View>
      </View>
    );
   } 


  //Extend Parking Card 1

    // Extend visitor function (Backend)
    const dbExtendVisitor = async(id, extendhour)=>{
      var visitor = {
          data: {
              id: id,
              extendhour: extendhour
          }
      }
      var data = await fetch('http://localhost:8888/visipark/extendVisitor.php',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body: JSON.stringify(visitor)
      })
      let visitordata = await data.text();
      console.log("Data that server received for extending visitor",visitordata); 
      props.dbGetCurrentVisitors(props.unit);
  }

  // Extend Parking Care 1
  var exthr = [];
  for(var i=1;i<=(24-props.reg1);i++){
    exthr.push(
    <Picker.Item key={i} label={i.toString()} value={i} />
    );
  }
  const [extendhr1, setExtendhr1] = useState(1);
  if (props.pop == 'ExtendParking1'){
    title = 'Extend Parking';
    btnTxt = 'Extend';

    button = (
      <TouchableOpacity 
      style = {styles.button}
      onPress = {()=>{props.showPop('');
      //props.setDur1(extendhr1+props.dur1);
      dbExtendVisitor(props.id1, extendhr1);
      }}>
      <Text style={[Texts.HeadS,{color:'#fff'}]}>{btnTxt}</Text>
    </TouchableOpacity>

    )

    content = (
      <View>
        <Text style={Texts.Body}>Max parking time allowed: 24hr</Text>
        <Text style={Texts.Body}>You've registered: 
        <Text style={{fontWeight:"bold"}}> {props.reg1}hr</Text>
        </Text>

        {/* <Text style={Texts.Body}>You've registered: {Hours1}:{minutes1}hr(s)</Text> */}

        <Text style={[Texts.BodyBold,{marginTop: 20}]}>You would like to extend:</Text>
        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
          <Picker 
            style={{width: 130, marginRight: 20}}
            selectedValue = {extendhr1}
            itemStyle={{height:125}}
            onValueChange = {(val,ind)=>{
              setExtendhr1(val);
          }}
          >
            {exthr}
          </Picker>
          <Text style={Texts.Body}>hr</Text>
        </View>
      </View>
    );
  }

  // Extend Parking Card 2
  var exthr = [];
  for(var i=1;i<=(24-props.reg2);i++){
    exthr.push(
    <Picker.Item key={i} label={i.toString()} value={i} />
    );
  }
  const [extendhr2, setExtendhr2] = useState(1);
  if (props.pop == 'ExtendParking2'){
    title = 'Extend Parking';
    btnTxt = 'Extend';

    button = (
      <TouchableOpacity 
      style = {styles.button}
      onPress = {()=>{props.showPop('');
      props.setDur2 (extendhr2+props.dur2);
      dbExtendVisitor(props.id2, extendhr2);
      }}>
      <Text style={[Texts.HeadS,{color:'#fff'}]}>{btnTxt}</Text>
    </TouchableOpacity>
    )
    
    content = (
      <View>
        <Text style={Texts.Body}>Max parking time allowed: 24hr</Text>
        <Text style={Texts.Body}>You've registered: 
        <Text style={{fontWeight:"bold"}}> {props.reg2}hr</Text>
        </Text>
        {/* <Text style={Texts.Body}>You've registered: {Hours2}:{minutes2}hr(s)</Text> */}

        <Text style={[Texts.BodyBold,{marginTop: 20}]}>You would like to extend:</Text>
        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
          <Picker 
            style={{width: 130, marginRight: 20}}
            selectedValue = {extendhr2}
            itemStyle={{height:125}}
            onValueChange = {(val,ind)=>{
              setExtendhr2(val);
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
  //if card2 is false (if theres no 2nd visitor it will remove card1 which is the first slot)

    // Remove visitor function (backend)
    const dbRemoveVisitor = async(id)=>{
      var visitor = {
        data: {
               id: id              
          }
      }
      var data = await fetch('http://localhost:8888/visipark/removeVisitor.php',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body: JSON.stringify(visitor)
      })
      let visitordata = await data.text();
      console.log("Data that server received for removing visitor",visitordata); 
  }

  // Remove card 1
  if (props.pop == 'Remove1'){
    title = 'Remove';
    btnTxt = 'Yes';
    
    button = (
      <TouchableOpacity 
              style={styles.button}
              // here are the functions called when the button is pressed. 
              onPress={()=>{
                // this is for adding ONE visitor
                // this is for closing the popup
                props.showPop('RemovedSuccessfully1');
                props.setCard1(false);
                props.setName1('');
                props.setPlate1('');
                props.setDur1(1);
                dbRemoveVisitor(props.id1);             
              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
            </TouchableOpacity>
      )
    content = (
      <View>

        <Text style={[Texts.Body,{marginBottom: 30}]}>Are you sure you want to remove
        <Text style={{fontWeight:"bold"}}> {props.name1}</Text>
        ?</Text>

      </View>
    );
  }

  //Remove card 2
  if (props.pop == 'Remove2'){
    title = 'Remove';
    btnTxt = 'Yes';

    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{

                // always turns off the second card slot (card2)
                props.showPop('RemovedSuccessfully2');
                props.setCard2(false);
                props.setName2('');
                props.setPlate2('');
                props.setDur2(1)
                dbRemoveVisitor(props.id2);
                dbGetData();
              }}>
              <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
            </TouchableOpacity>
      )
      content = (
        <View>
  
          <Text style={[Texts.Body,{marginBottom: 30}]}>Are you sure you want to remove
          <Text style={{fontWeight:"bold"}}> {props.name2}</Text>
          ?</Text>
  
        </View>
      );
    }

  //----- Removed Successfully ---- 1
  if (props.pop == 'RemovedSuccessfully1'){
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
        <Text style={[Texts.Body,{paddingBottom: 20}]}>You have removed {props.name1} successfully!</Text>
      </View>
    );
  }

  //----- Removed Successfully ---- 2
    if (props.pop == 'RemovedSuccessfully2'){
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
    
  if(props.pop == 'MissingFields'){
    title = "Missing Fields";
    btnTxt = 'Okay';
    button = (
      <TouchableOpacity 
              style={styles.button}
              onPress={()=>{
                props.showPop('');
                props.showPop('AddVisitor');
              }}>
          <Text style={[Texts.HeadS,{color: "#fff"}]}>{btnTxt}</Text>
      </TouchableOpacity>
      )

    content = (
      <View>
        <Text style={[Texts.Body,{paddingBottom: 20}]}>Please fill in both Visitor name and Visitor Plate Number.
        </Text>
      </View>
    );
  }

  if(props.pop == 'MissingFields1'){
    title = "Missing Fields";
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
        <Text style={[Texts.Body,{paddingBottom: 20}]}>Please fill in both Subject and Message fields.
        </Text>
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
            onPress = {()=>{props.showPop('')}}
            style={[styles.closeBut,{display:(props.pop=='AddVisitor'||props.pop=='ExtendParking1'||props.pop=='ExtendParking2'||props.pop=='Remove1'||props.pop=='Remove2')?'flex':'none'}]} 
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
