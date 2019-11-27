import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';
import Texts from '../Texts'

var styles = StyleSheet.create({
    container:{
        flex:1,
    },


    headerDesc:{
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
    },

    header: {
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20,
    },

    input:{
        height: 45,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: Colors.Lightgrey,
        borderRadius: 25,
        marginBottom: 10,
        borderColor: Colors.Purple,
        borderWidth: 2,
        marginRight: 20,
        marginLeft: 20,
    },

    subHeader:{
        flexDirection:"row",
        marginBottom: 5,
        marginTop: 15,
        justifyContent: "center",
    },

    card:{
        backgroundColor: '#fff',
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft:20,
        marginRight:20,
        marginTop: 10,
        paddingTop:10,
        paddingBottom:10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-between"
    },

    subUnit:{
        position: "absolute",
        left: 50
    },

    subActive:{
        position: "absolute",
        right: 50
    },

    ImageStyle: {
        paddingRight: 30,
        margin: 10,
        width: 28,
    },

    SectionStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth:2, 
        borderColor:Colors.Purple,
        height: 45,
        borderRadius: 25 ,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    searchBar:{
        flex:1,
        alignItems: 'flex-start',
        paddingLeft: 20

    },
    plateEmpty:{
        color: Colors.Purple
    }     
    
});

export default styles;