import React from 'react'
import style from "../Components/Card.module.css"

export default function Card() {
  return (
    <div className={style.card}>
        <img src='' alt=''/>
        <h5>Frontend Developer</h5>
        <span>11-50</span>
        <span>50,000</span>
        <span>Delhi</span>
        <button>View details</button>
    </div>
  )
}
