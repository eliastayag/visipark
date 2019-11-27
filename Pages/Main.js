import React,{useState,useEffect} from 'react';
import {View, Text, SafeAreaView,AsyncStorage} from 'react-native';
import styles from '../styles/PagesStyles/MainStyles';
import Tenant from '../Pages/Tenant';
import Login from '../Pages/Login';
import Popup from '../comps/Popup';
import Manager from '../Pages/Manager';
import Colors from '../styles/Colors';

var timer = null;
function Main(props){
// --------------- Communicate with DB ----------------
    // getData Function
    const [dbUnits, setDbUnits] = useState([]);
    const [dbVisitors, setDbVisitors] = useState([]);
    const [dbReports, setDbReports] = useState([]);
    var dbGetData = async()=>{
        var resp = await fetch('http://localhost:8888/visipark/getData.php');
        var data = await resp.json();
        setDbUnits(data.data.units);
        setDbVisitors(data.data.visitors);
        setDbReports(data.data.reports);
    }

    // Auto Remove expired visitors
    var dbAutoRemove = async()=>{
        var resp = await fetch('http://localhost:8888/visipark/autoRemove.php');
        // console.log('timer');
    }

     // Get Current Visitor Function
     const dbGetCurrentVisitors = async(unit)=>{
        var visitor = {
            data: {
                unit_num: unit
            }
        }
        var data = await fetch('http://localhost:8888/visipark/getCurrentVisitors.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(visitor)
        })
        let visitordata = await data.text();
        console.log("Data received from server for showing current visitors of a unit",JSON.parse(visitordata)); 

        // set current visitors
        // console.log('parsed',JSON.parse(visitordata));
        var currentVisitors = JSON.parse(visitordata);
        
        // set visitor1 and visitor2 with current visitors info
        if (currentVisitors.length == 1){
            // console.log('there is 1 current visitor');
            setName1(currentVisitors[0].name);
            setPlate1(currentVisitors[0].plate);
            setDur1(currentVisitors[0].time_left);
            setReg1(currentVisitors[0].regtime);
            setId1(currentVisitors[0].id);
            setCard1(true);
        }
        if (currentVisitors.length == 2){
            // console.log('there are 2 current visitors');
            setName1(currentVisitors[0].name);
            setPlate1(currentVisitors[0].plate);
            setDur1(currentVisitors[0].time_left);
            setReg1(currentVisitors[0].regtime);
            setId1(currentVisitors[0].id);
            setCard1(true);

            setName2(currentVisitors[1].name);
            setPlate2(currentVisitors[1].plate);
            setDur2(currentVisitors[1].time_left);
            setReg2(currentVisitors[1].regtime);
            setId2(currentVisitors[1].id);
            setCard2(true);
        }
    }
   
    // Remove visitor function 
    const dbRemoveVisitor = async()=>{
        var visitor = {
            // the following is an exmaple of what to put in the obj "data" to send to the server for removing a visitor 
            data: {
                // id: 5

                // here add your own data, make sure use the same property name and same data type for value 
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
        await dbGetData();
    }

    // Extend visitor function 
    const dbExtendVisitor = async()=>{
        var visitor = {
            // the following is an exmaple of what to put in the obj "data" to send to the server for extending a visitor 
            data: {
                // id: 8,
                // extendhour: "3:00:00"

                // here add your own data, make sure use the same property name and same data type for value 
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
        await dbGetData();
    }

    // Get History function 
    const [PinnedVisitors, setPinnedVisitors] = useState([]);
    const [UnpinnedVisitors, setUnpinnedVisitors] = useState([]);
    const dbGetHistory = async(unit)=>{
        var visitor = { 
            data: {
                unit_num: unit
            }
        }
        var data = await fetch('http://localhost:8888/visipark/getHistory.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(visitor)
        })
        let visitordata = await data.text();
        console.log("Data received from server for History page",JSON.parse(visitordata)); 
        console.log('pinned',JSON.parse(visitordata).pinned);
        console.log('Unpinned',JSON.parse(visitordata).notpinned);
        // set Pinned Visitors
        setPinnedVisitors(JSON.parse(visitordata).pinned);
        setUnpinnedVisitors(JSON.parse(visitordata).notpinned);
    }

    // Pin Visitor function 
    const dbPinVisitor = async(unit,id)=>{
        var visitor = {
            // the following is an exmaple of what to put in the obj "data" to send to the server for pinning a visitor in History page 
            data: {
                unit_num: unit,
                id: id
                // here add your own data, make sure use the same property name and same data type for value 
            }
        }
        var data = await fetch('http://localhost:8888/visipark/pinVisitor.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(visitor)
        })
        let visitordata = await data.text();
        console.log("Data sent to server to pin a visitor",JSON.parse(visitordata)); 
        await dbGetHistory(unit);
        // await dbGetData();
    }

    // Unpin Visitor function 
    const dbUnpinVisitor = async(unit,id)=>{
        var visitor = {
            data: {
                unit_num: unit,
                id: id
            }
        }
        var data = await fetch('http://localhost:8888/visipark/unpinVisitor.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(visitor)
        })
        let visitordata = await data.text();
        console.log("Data sent to server to Unpin a visitor",JSON.parse(visitordata)); 
        await dbGetHistory(unit);
        // await dbGetData();
    }

    // get spots left function 
    const [spots,setSpots] = useState();
    var dbGetSpots = async()=>{
    var resp = await fetch('http://localhost:8888/visipark/getSpots.php');
    var data = await resp.json();
    setSpots(data);
}

// ------------------- Pop up ----------------------
    // Function for Popup
    // Call showPop('YourPopupTitle') in your button to show the corresponding Popup.
    // Example: Your Popup title is 'Add Visitor', call showPop('AddVisitor') in your onPress.
    // !! IMPORTANT !! To close Popup, call showPop('')

    // Variable to show and hide popup
    const [pop, showPop] = useState(''); 


// ----------------- Unit and Visitors info ----------------
    // state variables for setting Tenant page content
    const [cont, setCont] = useState('Visitors');
    // state variables for visitor info
    const [card1, setCard1] = useState(false);  // card1={true} means cardtop in <Visitors /> is shown and holding a visitor's info   
    const [card2, setCard2] = useState(false);
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [plate1, setPlate1] = useState('');
    const [plate2, setPlate2] = useState('');
    const [dur1, setDur1] = useState(1); // time left in UI
    const [dur2, setDur2] = useState(1);
    const [reg1, setReg1] = useState();
    const [reg2, setReg2] = useState();
    const [id1,setId1] = useState();
    const [id2,setId2] = useState();

   // function to get unit number from local storage 
   const [unit, setUnit] = useState();
   var getUnit = async()=>{
       var localunit = await AsyncStorage.getItem('unit');
       if(localunit !== null && localunit !==''){
           // if there IS unit number stored in local storage
           // run get current visitor 
           console.log(localunit);
           await dbGetCurrentVisitors(localunit);
           await dbGetHistory(localunit);
           setUnit(localunit);
           setShowpage('Tenant');
           console.log('Logged in unit', localunit);
         } else {
            // if there ISN'T unit number stored in local storage
            setShowpage('Login');
            console.log('Unit has not logged in');
         }
     }
    
// ------------------ Pages ---------------------
    // state variable to show and hide pages and variables hold pages. 
    const [showpage, setShowpage] = useState('');   
    var mpopup = null;
    var page = null;
    
    // conditions to show and hide pages
    if(showpage == 'Login'){
        page = <Login 
                // show Login, Tenant or Manager page
                showpage={showpage}    
                setShowpage={setShowpage} 
                // unit info
                unit = {unit}
                setUnit = {setUnit}
                />;
    }
    if(showpage == 'Tenant'){
        props.setSafebg("#fff");
        page = <Tenant 
                // pop up
                 pop = {pop} 
                 showPop = {showPop}
                // content 
                cont = {cont}
                setCont = {setCont}
                 // cards
                 card1 = {card1}
                 setCard1 = {setCard1}
                 card2 = {card2}
                 setCard2 = {setCard2}
                 // unit info
                 unit = {unit}
                 // visitors info
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
                 reg1 = {reg1}
                 reg2 = {reg2}
                 id1 = {id1}
                 id2 = {id2}
                 // spots
                 spots = {spots}
                 // async function 
                 getUnit = {getUnit}
                 // History Page
                 UnpinnedVisitors = {UnpinnedVisitors}
                 PinnedVisitors = {PinnedVisitors}
                 dbPinVisitor={dbPinVisitor}
                 dbUnpinVisitor={dbUnpinVisitor}
                />;
    }
    if(showpage == 'Manager'){
        page = <Manager 
                 pop = {pop} 
                 showPop = {showPop}
                />;
    }

     // Conditions to show Popup
     if (pop == ''){
        mpopup = null;
     } else {
         mpopup = <Popup 
                     // popup
                     pop = {pop} 
                     showPop = {showPop} 
                     // show page
                     setShowpage = {setShowpage}
                     // set content on Tenant page
                     cont = {cont}
                     setCont = {setCont}
                     // cards
                     card1 = {card1}
                     setCard1 = {setCard1}
                     card2 = {card2}
                     setCard2 = {setCard2}
                     // unit
                     unit = {unit}
                     // visitors info
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
                     reg1 = {reg1}
                     reg2 = {reg2}
                     id1 = {id1}
                     id2 = {id2}
                     // functions
                     dbGetCurrentVisitors = {dbGetCurrentVisitors}
                 />;                 
             }



// ----------- functions that run when the app loads ----------------
    
    
    

    useEffect(()=>{
        getUnit();
        dbGetSpots();
        

        // timer for auto remove

        // if(timer === null){
        //     timer = setInterval(()=>{
        //         dbAutoRemove();
        //         dbGetCurrentVisitors();
        //         dbGetHistory();
        //     },1000);
        // }
        // return ()=>{
        //     if(timer){
        //         clearInterval(timer);
        //         timer = null;
        //     }
        // }



    },[]);
    



      
    // -------------- UI ------------------
return (
    <SafeAreaView style={[styles.container, {backgroundColor: props.safebg, opacity: 1}]}>
        <View style={styles.container}>
           {mpopup} 
           {page}
        </View>
    </SafeAreaView>
    )
}

export default Main;
