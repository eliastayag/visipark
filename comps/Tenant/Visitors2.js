import React, { useEffect } from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Image
}from 'react-native';
import {Colors} from '../../styles/Colors';
import Texts from '../../styles/Texts';
import DropShadows from '../../styles/DropShadows';
import styles from '../../styles/CompsStyles/VisitorStyles';



function VisitorCard({obj, index, setVisitorId, showPop, setVisitorRegtime, visitorId, setVisitorName,visitorRegtime}){
    // data from database 
    // id, plate, name, time_left, regtime

return(    
    <View style={[styles.activeBox, DropShadows.shadow]}>
        {/* Visitor Name */}
        <Text style={Texts.HeadS} numberOfLines={1}>{obj.name}</Text>
        {/* Visitor Plate */}
        <Text style={Texts.BodyLight}>{obj.plate}</Text>
        {/* Car icon */}
        <Image resizeMode='contain' source={require('../../img/car.png')} style={styles.carIcon} />
        {/* Time left */}
        <Text style={[Texts.HeadS,{color:Colors.Purple}]}>{obj.time_left}</Text>
        <Text style={Texts.BodyLight}>hr left</Text>
        {/* Extend Button (disabled when registered time reach 24hr) */}
        <TouchableOpacity 
            style={ obj.regtime < 24? styles.extendButton : styles.extendButtonGrey } 
            onPress={()=>{
                // store selected visitor's id for communicating with database
                obj.regtime < 24? 
                [setVisitorId(obj.id),setVisitorRegtime(obj.regtime),showPop('ExtendParking')]: null;      
            }}
        >
            <Text style={[Texts.HeadS,{color: obj.regtime < 24? Colors.Purple : Colors.Lightgrey}]}>Extend</Text>
        </TouchableOpacity>
        {/* Remove Button */}
        <TouchableOpacity 
            style={styles.removeButton}           
            onPress={() => {
                // store selected visitor's id for communicating with database
                setVisitorId(obj.id);
                setVisitorName(obj.name);
                showPop('Remove');
        }}>
            <Text style={[Texts.HeadS,{color:'#fff'}]}>Remove</Text>
        </TouchableOpacity>
    </View> 
)
}



function AddButton(props){
return(
    <TouchableOpacity 
        style={styles.Box2} 
        onPress={() => {
            props.showPop('AddVisitor'); 
            }}>
        <Image 
            resizeMode='contain' 
            source={require('../../img/add-visi.png')} 
            style={styles.Img}
        />
        <Text style={[Texts.BodyLight,styles.add,{color:Colors.Purple}]}>Add Visitor</Text>
  </TouchableOpacity> 
)
}



function Visitors(props){

return(
    <View style={{flex:1, marginBottom: 70}}>
      {/* ScrollView Starts here, wraps around everything */}
      <ScrollView>
      {/* Header */}
        <View style={styles.Top}>
          <Text style={Texts.SecHead}>Visitors</Text>
          <Text style={Texts.Body}>
            Add your visitors upon their arrival
            and remove them upon their departure.
          </Text>
          {/* Parking Policy */}
          <TouchableOpacity 
            onPress={() => {
                props.showPop('VisitorParkingPolicy')}}>
            <Text style={[Texts.Link]}>
              Visitor Parking Policy >>
            </Text>
          </TouchableOpacity>
        </View>
        {/* Unit Info */}
        <View style={styles.Middle}>
            {/* Unit number */}
            <Text style={Texts.HeadL}>Unit {props.unit} </Text>
            {/* Spots left */}
            <Text style={Texts.Body}>Visitor Parking: 
            <Text style={[Texts.BodyBold]}> {props.spots} </Text> 
            spots left</Text>
            {/* Visitor Cards UI*/}
            <View style={{height:"100%", paddingTop:20}}>
                {/* Visitor Cards */}
                { props.currentVisitors.map((obj,index)=>{
                        return(
                            <VisitorCard 
                                obj = {obj}
                                index = {index}
                                setVisitorId = {props.setVisitorId}
                                setVisitorRegtime = {props.setVisitorRegtime}
                                showPop = {props.showPop}
                                visitorRegtime = {props.visitorRegtime}
                                visitorId = {props.visitorId}
                                setVisitorName = {props.setVisitorName}
                            />
                        )
                    })
                }
                {/* Add Button only shows when there are less then 2 visitors */}
                { props.visitorNum < 2 ? <AddButton showPop = {props.showPop}/> : null }
            </View>

        </View>
      </ScrollView>
    </View>
)
}

export default Visitors;