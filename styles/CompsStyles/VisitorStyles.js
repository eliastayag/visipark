import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';

var styles = StyleSheet.create({
    
    Bottom:{
        paddingTop: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    Middle:{
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
    },

    Top: {
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
    },

    scrollview:{
        flex: 1,
        backgroundColor: "#fab",
        overflow: "scroll"
    },

    addBut:{
        alignItems: "center",
        justifyContent: "center",
        height: 180,
        borderRadius: 23,
        borderStyle: "dashed",
        // borderColor: "#CAB2E8",
        borderColor:'#f542e9',
        borderWidth: 3.1,
    },

    visitorCard:{
        alignItems: "center",
        justifyContent: "center",
        height: 180,
        borderRadius: 23,
        backgroundColor: "#fff",
        borderColor: "#CAB2E8",
        borderWidth: .2,
        marginBottom: 20
    },

    Img:{
        width: 70,
        height: "55%",
        justifyContent: "center",
        alignItems: "center"
        
    },
    add:{
        // borderWidth:1,
        marginTop:-10
    },
    carIcon:{
        position: "absolute",
        top: "14%",
        right: "26%",
        width: "15%",
        height: "27%"
    },

    time: {
        position: "absolute",
        top: "13%",
        right: "9.5%"
    },

    visitorName: {
        position: "absolute",
        top: "14%",
        left: "10%",
        width: 180,
        
    },
    leftText:{
        position: "absolute",
        top: "29%",
        right: "10%",
    },

    plateText:{
        position: "absolute",
        top: "29%",
        left: "10%",
    },

    removeButton:{
        backgroundColor: Colors.Purple,
        borderRadius: 23,
        height: 45,
        //height: "30%"
        width: "38%",
        justifyContent:'center',
        alignItems:'center',
        position: "absolute",
        bottom: 20,
        right:30,
    },

    extendButton: {
        position: "absolute",
        bottom:20,
        left:30,
        height: 45,
        //height: "30%",
        width: "38%",
        borderWidth: 2,
        justifyContent:'center',
        alignItems:'center',
        borderColor: Colors.Purple,
        borderRadius: 23,
    },

    extendButtonGrey: {
        position: "absolute",
        bottom:20,
        left:30,
        height: 45,
        //height: "30%",
        width: "38%",
        borderWidth: 2,
        justifyContent:'center',
        alignItems:'center',
        borderColor:Colors.Darkgrey,
        borderRadius: 23,
    }
})

export default styles;

