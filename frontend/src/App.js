import React, { useState, useEffect, useRef } from "react"
import ReactDOM from 'react-dom'

import {createUser, createHabbit, getAllHabit, deleteHabbit} from "./APIHelper.js"

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
    const userId =useRef("1234555");
    const [sberId, setSberId] = useState(0);
    const [userName, setUserName] = useState("Кирилл1");
    const [userAge, setUserAge] = useState(20);
    const [userGender, setUserGender] = useState("М");

    //Хуки создания новой привычки
    const createHabitName = useRef('');
    const createHabitCount = useRef('');
    const[createHabitNameState, setCreateHabitNameState] = useState("");
    const[createHabitCountState, setCreateHabitCountState] = useState(66);
    
    const[userHabits, setUserHabits]= useState([])

    //Хуки состояния текущих привычек
    const [checkboxStates, setCheckboxStates] = useState([false,true,false,false,false]);

    //Ассистент Sber
    const assistant = useRef();

    useEffect(()=>{
      //Инициализация ассистента
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
              userId.current = event.sub
              createUser(event.sub, sberId, userName, userAge, userGender)
              getAllHabit(event.sub).then((x)=>{setUserHabits(x)});
            }else if (event.user_id != undefined) {
              console.log("UserId", event.user_id)
              userId.current = event.user_id
              createUser(event.userId, sberId, userName, userAge, userGender)
              getAllHabit(event.user_id).then((x)=>{setUserHabits(x)});
            }
          };
          console.log(`assistant.on(data)`, event);
          const { action } = event;

          dispatchAssistantAction(action);
        }
      );
      //Получение текущих привычек
      
    },[]);

    useEffect(()=>{
      getAllHabit(userId.current).then((x)=>{setUserHabits(x)});
    },[userId.current]);

    useEffect(()=>{
      createHabitName.current = createHabitNameState
    },[createHabitNameState]);

    useEffect(()=>{
      createHabitCount.current=createHabitCountState
    },[createHabitCountState])



    const dispatchAssistantAction = async (action) => {
      console.log("dispatchAssistantAction", action);
      if (action) {
        switch (action.type) {
          case "OpenCreateHabitForm":
            setPopupActive(!isPopupActive)
            //something
            break;
          case "setHabbitName":
            console.log(action.data)
            setCreateHabitNameState(action.data)
            break;
          case "setHabbitTime":
            setCreateHabitCountState(action.data)
            break;
          case "createHabit":
            setPopupActive(false)
            createHabbitAction()
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


    
    //Обратотчики рользовательской активности

    const createHabbitAction = () =>{
      console.log("UserId", userId.current);
      console.log("CreateHabit", createHabitName.current)
      console.log("Count", createHabitCount)
      createHabbit(userId.current, createHabitName.current, createHabitCount.current).then(()=>getAllHabit(userId.current).then((x)=>{setUserHabits(x)}));
      createHabitName.current = '';
      setCreateHabitCountState(66);
    }

    const deleteHabitAction = (habitId) =>{
      deleteHabbit(habitId).then(() => getAllHabit(userId.current).then((x)=>{setUserHabits(x)}))
    }

    const updateActivityActiom = (habitId, date, state) => 
    {


    }
            
      return (
          <React.Fragment>
            
              <HabitHeader >
                <TextBox size="l" title={`Здравствуйте, ${userName}.`}/>
                <HabitCreationButton onClick={()=> {setPopupActive(!isPopupActive); console.log(userId.current);}}/>
              </HabitHeader >
              {userHabits.map(({_id, Name, DateForEnd}, i) => (
                <HabitBox habitId={_id} 
                habitName={Name} 
                progressValue={33} 
                maxValue={DateForEnd} 
                habitProgress = {checkboxStates} 
                deleteHabit = {deleteHabitAction}
                updateActivity = {updateActivityActiom}/>
              ))}
            
              {isPopupActive ?
              <div>
                  <PopupBackdrop onClick={()=> setPopupActive(!isPopupActive)}/>
                  <HabitCreationForm setPopupActive = {setPopupActive}
                  setCreateHabitCountState={setCreateHabitCountState}
                  createHabitNameState={createHabitNameState}
                   setCreateHabitNameState={setCreateHabitNameState}
                  createHabitCountState = {createHabitCountState}
                  createHabitName = {createHabitName}
                  createHabbitAction={createHabbitAction}

                  />
                  <CloseButton onClick={()=> setPopupActive(!isPopupActive)}><IconClose/></CloseButton>
             </div>
          : null}
          </React.Fragment>
      );
    
    
}

export default App