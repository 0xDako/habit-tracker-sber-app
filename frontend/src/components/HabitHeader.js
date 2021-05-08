import styled from 'styled-components'

     
export const HabitHeaderWrapper = styled.div`
    filter: blur(8px);
    -webkit-filter: blur(8px);  
`

export const HabitHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    position: sticky;
    top: 0;
    background-color: rgba(0,0,0,.6);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    `
