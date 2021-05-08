import { Button } from "@sberdevices/plasma-ui";
import styled from 'styled-components'



const HabitCreationButton = ({onClick}) => {
  return (

        <Button text="Создать" 
        onClick={onClick} view="clear" />
      
  )
}

export default HabitCreationButton;
