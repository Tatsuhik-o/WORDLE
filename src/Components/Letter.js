import React from "react";
import './Letter.css'

function Letter({letter, position}){
   let letterStyle = {}
   if(position === 'correct'){
      letterStyle = {
         backgroundColor: '#538D4E'
      }
   }
   if(position === 'misplaced'){
      letterStyle = {
         backgroundColor: '#B59F3B'
      }
   }
   if(position === 'incorrect'){
      letterStyle = {
         backgroundColor: 'transparent'
      }
   }
   return(
      <div className="allStyles" style={letterStyle}>{letter.toUpperCase()}</div>
   )
}

export default Letter