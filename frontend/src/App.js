import React, { useState, useEffect, useRef } from "react"
import ReactDOM from 'react-dom'

import {createUser, createHabbit, getAllHabit} from "./APIHelper.js"

import HabitBox from './components/HabitBox'
import HabitCreationForm from './components/HabitCreationForm'
import HabitCreationButton from './components/HabitCreationButton'
import {HabitHeader, HabitHeaderWrapper} from './components/HabitHeader'
import { CloseButton, PopupBackdrop } from './components/PopupStyledComponent'
import { IconClose} from '@sberdevices/plasma-icons';
import {
  Header,
  Container,
  TextBox
 } from '@sberdevices/plasma-ui';



/////////Sber Assistant/////////////////////////
import {
    createSmartappDebugger,
    createAssistant,
  } from "@sberdevices/assistant-client";
///////////////////////////////////////////////


const initializeAssistant = (getState /*: any*/) => {
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        token:
          process.env.REACT_APP_TOKEN  ??
          "",
        initPhrase: `Запусти Habit-tracker`,
        getState,
      });
    }
    return createAssistant({ getState });

  };

function App() {
          
    const state = {
       notes: []
    }
    //Хук активности всплывающего окна
    const [isPopupActive, setPopupActive] = useState(false);
      
    //Хуки данных пользователя
    const [userId, setUserId] = useState("test_userId");
    const [sberId, setSberId] = useState(123);
    const [userName, setUserName] = useState(" ̶К̶и̶р̶и̶л̶л̶  Данила");
    const [userAge, setUserAge] = useState(20);
    const [userGender, setUserGender] = useState("М");

    //Хуки создания новой привычки
    const[createHabitName, setCreateHabitName] = useState("");
    const[createHabitCount, setCreateHabitCount] = useState(66);
    const[userHabits, setUserHabits]= useState([])

    //Хуки состояния текущих привычек
    const [checkboxStates, setCheckboxStates] = useState([false,true,false,false,false]);

    //Ассистент Sber
    const assistant = useRef();

    useEffect(()=>{
      assistant.current=initializeAssistant(() => getStateForAssistant());
      assistant.current.on("start", (event) => {
        console.log(`assistant.on(start)`, event);
        
      });
      assistant.current.on(
        "data",
        (event /*: any*/) => {
          if(event.type=="smart_app_data"){
            console.log("User")
            console.log(event)
            if (event.sub != undefined) {
              console.log("Sub", event.sub)
              setUserId(event.sub)
              createUser(event.sub, sberId, userName, userAge, userGender)
              var habits =  getAllHabit(event.sub)
              console.log(habits)
            }else if (event.user_id != undefined) {
              console.log("UserId", event.user_id)
              setUserId(event.user_id)
              createUser(event.userId, sberId, userName, userAge, userGender)
            }
          };
          console.log(`assistant.on(data)`, event);
          const { action } = event;

          dispatchAssistantAction(action);
        }
      );

    },[]);


    const dispatchAssistantAction = async (action) => {
      console.log("dispatchAssistantAction", action);
      if (action) {
        switch (action.type) {
          case "something":
            //something
            break;
          default:
            break;
        }
      }
    };
    
    const getStateForAssistant = () =>{
        console.log('getStateForAssistant: state:', state)
        const new_state = {
          item_selector: {
            items: state.notes.map(
              ({ id, title }, index) => ({
                number: index + 1,
                id,
                title,
              })
            ),
          },
        };
        console.log('getStateForAssistant: new_state:', new_state)
        return new_state;
      }


    //
 
      
    useEffect(() => {}, [])

    //Обратотчики рользовательской активности

    const createHabbitAction = () =>{
      createHabbit(userId, createHabitName, createHabitCount);
      setCreateHabitName('');
      setCreateHabitCount(66);
    }


            
      return (
          <React.Fragment>
            
              <HabitHeader >
                <TextBox size="l" title={`Здравствуйте, ${userName}.`}/>
                <HabitCreationButton onClick={()=> setPopupActive(!isPopupActive)}/>
              </HabitHeader >

              <HabitBox habitName={'Бросить университет'} progressValue={33} maxValue={66} habitProgress = {checkboxStates} deleteHabit = {()=>{console.log('habit delete')}}/>
              <HabitBox habitName={'Бросить университет'} progressValue={33} maxValue={66} habitProgress = {checkboxStates} deleteHabit = {()=>{console.log('habit delete')}}/>
              <HabitBox habitName={'Бросить университет'} progressValue={33} maxValue={66} habitProgress = {checkboxStates} deleteHabit = {()=>{console.log('habit delete')}}/>
              <HabitBox habitName={'Бросить университет'} progressValue={33} maxValue={66} habitProgress = {checkboxStates} deleteHabit = {()=>{console.log('habit delete')}}/>
              <HabitBox habitName={'Бросить университет'} progressValue={33} maxValue={66} habitProgress = {checkboxStates} deleteHabit = {()=>{console.log('habit delete')}}/>
            
              {isPopupActive ?
              <div>
                  <PopupBackdrop onClick={()=> setPopupActive(!isPopupActive)}/>
                  <HabitCreationForm setPopupActive = {setPopupActive}
                  setCreateHabitName={setCreateHabitName}
                  setCreateHabitCount={setCreateHabitCount}
                  createHabbitAction ={createHabbitAction}
                  createHabitCount = {createHabitCount}
                  createHabitName = {createHabitName}

                  />
                  <CloseButton onClick={()=> setPopupActive(!isPopupActive)}><IconClose/></CloseButton>
             </div>
          : null}
          </React.Fragment>
      );
    
    
}

export default App