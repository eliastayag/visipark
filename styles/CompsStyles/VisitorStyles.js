import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';

var styles = StyleSheet.create({
    
    Bottom:{
        paddingTop: 15,
        alignItems: "center",
        justifyContent: "center",
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

    Box:{
        marginTop:10,
        alignItems: "center",
        justifyContent: "center",
        height: 180,
        borderRadius: 23,
        borderStyle: "dashed",
        borderColor: "#CAB2E8",
        borderWidth: 3.1,
    },

    Box2:{
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        height: 180,
        borderRadius: 23,
        borderStyle: "dashed",
        borderColor: "#CAB2E8",
        borderWidth: 3.1,
    },

    activeBox:{
        alignItems: "center",
        justifyContent: "center",
        height: 180,
        borderRadius: 23,
        backgroundColor: "#fff",
        borderColor: "#CAB2E8",
        borderWidth: .2,
    },

    activeBox2:{

        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height: 180,
        borderRadius: 23,
        borderColor: "#CAB2E8",
        borderWidth: .2,
        marginTop: 20,
    },

    Img:{
        width: 60,
        height: "55%",
        justifyContent: "center",
        alignItems: "center"
        
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
        right: "9.5%",
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        color: Colors.Purple,
        letterSpacing: 1
    },

    visitorName: {
        position: "absolute",
        top: "14%",
        left: "10%",
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        color: Colors.Black,
        letterSpacing: 1,
        width: 180,
        
    },

    leftText:{
        fontFamily:'OpenSans-Regular',
        fontSize:16,
        color: Colors.Darkgrey,
        letterSpacing: 0.3,
        lineHeight: 23,
        position: "absolute",
        top: "29%",
        right: "10%",
    },

    plateText:{
        fontFamily:'OpenSans-Regular',
        fontSize:16,
        color: Colors.Darkgrey,
        letterSpacing: 0.3,
        lineHeight: 23,
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
        borderColor: 'lightgrey',
        borderRadius: 23,
    }
})

export default styles;

