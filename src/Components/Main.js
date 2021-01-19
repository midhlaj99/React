import React from "react";
import { useState } from 'react';
import styled from 'styled-components'
import Model from "./Model"
import Wrap from "./Wrapper/Wrapper"
const StyledButton = styled.button`
  color:red;
  border: 2px solid palevioletred;
  margin-top: 50vh;
  padding:10px
`;
const Main = () => {
      const[open,setOpen]=useState(false)

      const OpenModel=()=>{
        setOpen(true)
      }

      const Closemodel=()=>{
        setOpen(false)
      }
  return (
      <Wrap>
        {
          open  ?
            <Model openmode={open} click={Closemodel}>
              <h2>content of model</h2>
            </Model>
            :null
        }
        
        <StyledButton onClick={OpenModel}>Click to Open Model</StyledButton>
      </Wrap>
  );
};
export default Main;

