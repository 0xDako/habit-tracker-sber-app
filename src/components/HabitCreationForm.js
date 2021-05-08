import {
  Card,
  CardBody,
  TextField, 
  TextBox,
  CardContent,
  Button,
  Stepper
 } from '@sberdevices/plasma-ui';
 import styled from 'styled-components';
 import {
  background, // Цвет подложки
  gradient, // Градиент
} from '@sberdevices/plasma-tokens';


const CreationFormField = styled(TextField)`
  flex-grow: 1;
  margin-right: 1rem;
`

const HabitCard = styled(Card)`
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background-color: ${background};
  background-image: ${gradient};
`
const HabitCreationFormWrapper = styled.div`
  display: flex;
  margin: 2.5rem 0;

`

const StepperLabel = styled(TextBox )`
  margin-bottom: .5rem;

`

const HabitCreationForm = ({setPopupActive, setCreateHabitName, setCreateHabitCount, createHabbitAction, createHabitCount, createHabitName}) =>  {
  return (
      <HabitCard>
        <CardBody >
        <CardContent>
       
        <TextBox size="l" title='Создание привычки'/>
          <HabitCreationFormWrapper>
          <CreationFormField
            label='Название привычки'
            value={createHabitName}
            onChange = {(text)=>{setCreateHabitName(text.target.value)}}
          />   
          <div>
            <StepperLabel size="m" subTitle='Время выработки'/>
            <Stepper 
              step={1}
              value={createHabitCount}
              onChange = {(count) => {setCreateHabitCount(count)}}
            />
          </div>
          
          </HabitCreationFormWrapper>
          <Button 
            text="Создать" 
            view="primary"
            onClick = {() => {setPopupActive(false) ; createHabbitAction()}}
          />
          </CardContent>
        </CardBody>
      </HabitCard>
    
  )
}

export default HabitCreationForm;
