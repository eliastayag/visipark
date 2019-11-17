
import React,{useState,useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/PagesStyles/MainStyles';
import Tenant from '../Pages/Tenant';
import Login from '../Pages/Login';
import Popup from '../comps/Popup';
import Manager from '../Pages/Manager';
import axios from 'axios';
import Axios from 'axios';




function Main(props){
// --- Communicate with DB ----
    const [dbUnits, setDbUnits] = useState([]);
    const [dbVisitors, setDbVisitors] = useState([]);
    const [dbReports, setDbReports] = useState([]);
    
    // getData Function
    var getData = async()=>{
        var resp = await fetch('http://localhost:8888/visipark/visipark.php');
        var data = await resp.json();
        setDbUnits(data.data.units);
        setDbVisitors(data.data.visitors);
        setDbReports(data.data.reports);
        console.log('units',dbUnits);
        console.log('visitors',dbVisitors);
        console.log('reports',dbReports);
    }

    // postData Function
    const addVisitor = async()=>{
        var visitor = {
            table:"visitors",
            data: {
                unit_num: 101,
                name: "Visitor Name",
                plate: "vis plt"
            }
        }
        var data = await axios.post("http://localhost:8888/visipark/visipark.php", visitor);
        console.log("create", data);
        }
    


    // ---- Run getData when it loads
    useEffect(()=>{
        addVisitor();
       getData();
    },[]);

// ---- Pop up ---
    // Function for Popup
    // Call showPop('YourPopupTitle') in your button to show the corresponding Popup.
    // Example: Your Popup title is 'Add Visitor', call showPop('AddVisitor') in your onPress.
    // !! IMPORTANT !! To close Popup, call showPop('').

    const [pop, showPop] = useState(''); 
    const [showpage, setShowpage] = useState('Login');
    
    //visitor info
    const [visiName, setVisiName] = useState('');
    const [visiPlate, setVisiPlate] = useState('');
    const [visiDur, setVisiDur] = useState(0);

    var mpopup = null;
    var page = null;

    //--------- Kathleen ----------
    // I added them here, and pass them in popup and in Tenant
    // functions to set visitor cards
    const [card1, setCard1] = useState(false);
    const [card2, setCard2] = useState(false);
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [plate1, setPlate1] = useState('');
    const [plate2, setPlate2] = useState('');
    const [dur1, setDur1] = useState(1);
    const [dur2, setDur2] = useState(1);
    //room number
    const [room, setroom] = useState(0);
    
    // Conditions to show {page}
    if(showpage == 'Login'){
        page = <Login 
                showpage={showpage} 
                setShowpage={setShowpage} 
                //room number
                room={room}
                setroom={setroom}
                />;
        props.setSafebg(false);
    }
    if(showpage == 'Tenant'){
        page = <Tenant 
                 pop = {pop} 
                 showPop = {showPop}
                 card1 = {card1}
                 setCard1 = {setCard1}
                 card2 = {card2}
                 setCard2 = {setCard2}
                 name1 = {name1}
                 setName1 ={setName1}
                 name2 = {name2}
                 setName2 ={setName2}
                 plate1 = {plate1}
                 setPlate1 ={setPlate1}
                 plate2 = {plate2}
                 setPlate2 ={setPlate2}
                 dur1 = {dur1}
                 setDur1 ={setDur1}
                 dur2 = {dur2}
                 setDur2 ={setDur2}
                 //room number
                room={room}
                setroom={setroom}
                />;
        props.setSafebg(true);
    }
    if(showpage == 'Manager'){
        page = <Manager 
                 pop = {pop} 
                 showPop = {showPop}
                 visiName = {visiName}
                 setVisiName = {setVisiName}
                 visiPlate ={visiPlate} 
                 setVisiPlate = {setVisiPlate}
                 visiDur = {visiDur} 
                 setVisiDur = {setVisiDur}
                />;
        props.setSafebg(true);
    }


    // Conditions to show Popup
    if (pop == ''){
       mpopup = null;
    } else {
        mpopup = <Popup 
                    pop = {pop} 
                    showPop = {showPop} 

//                    visiName = {visiName}
//                     setVisiName = {setVisiName}
//                     visiPlate ={visiPlate} 
//                     setVisiPlate = {setVisiPlate}
//                     visiDur = {visiDur} 
//                     setVisiDur = {setVisiDur}

                    card1 = {card1}
                    setCard1 = {setCard1}
                    card2 = {card2}
                    setCard2 = {setCard2}
                    name1 = {name1}
                    setName1 ={setName1}
                    name2 = {name2}
                    setName2 ={setName2}
                    plate1 = {plate1}
                    setPlate1 ={setPlate1}
                    plate2 = {plate2}
                    setPlate2 ={setPlate2}
                    dur1 = {dur1}
                    setDur1 ={setDur1}
                    dur2 = {dur2}
                    setDur2 ={setDur2}

                />;
                
            }
    



    // UI
return (
        <View style={styles.container}>
           {mpopup} 
           {page}
        </View>
    )
}

export default Main;
