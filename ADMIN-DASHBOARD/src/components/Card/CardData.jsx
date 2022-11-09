import React from 'react'
import "./Card.scss"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
const CardData = ({
  heading,
  value,
  view,
  parentage
}) => {
  // let newvalue = value;
  
  let icon ;
  switch(heading) {
    case "Users":
      icon = <PersonOutlineIcon style={{
        color: "crimson",
        backgroundColor: "rgba(255, 0, 0,0.2)",
        borderRadius: "5px",
        padding: "4px",
      }}/>;
      break;
    case "Product":
      icon = <ProductionQuantityLimitsIcon 
      style={{
        color: "deeppink",
        backgroundColor: "rgb(212 0 176 / 15%);",
        borderRadius: "5px",
        padding: "4px",

      }}
      />
      break;
    case "Orders":
      icon = <ShoppingBagIcon 
      style={{
        color: "green",
        padding: "4px",
      backgroundColor: "rgba(0, 128, 0,0.2)",
      borderRadius: "5px",

      }}/>
      break;
    case "Earning":
     icon = <AccountBalanceIcon
     style={{
      color: "purple",
      padding: "4px",
      backgroundColor: "rgba(128, 0, 128,0.2)",
      borderRadius: "5px",

    }}/>
      break;
    default:
     break;
  }
  return (
    <div className='CardData'>
        <div className='left'>
          <span className='CardData-heading'>{heading}</span>
          <span className='CardData-value'>{value}</span>
          <span className='CardData-view'>{view}</span>
        </div>
        <div className='right'>
          <div className='CardData-parentage positive '>
          <KeyboardControlKeyIcon/>
          <span>{parentage}</span>
          </div>
          <div className='CardData-icon'>

          {icon}
          </div>
        
        </div>
        
    </div>
  )
}

export default CardData