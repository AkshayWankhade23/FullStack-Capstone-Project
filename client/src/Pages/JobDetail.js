import React from 'react'
import style from '../Pages/JobDetail.module.css'
import wallpaper from '../Assets/WallpaperDog-20567151 1.png'

export default function JobDetail() {
  return (
    <div className={style.container}>
        <div className={style.left}>
            <h2>Add job description</h2>
            <form >
                <label>Company Name </label>
                <input /> <br />
                <label>Add logo URL </label>
                <input /> <br />
                <label>Job position</label>
                <input /> <br />
                <label>Monthly salary</label>
                <input /> <br />
                <label>Job Type</label>
                <input /> <br />
                <label>Remote/office</label>
                <input /> <br />
                <label>Location</label>
                <input /> <br />
                <label>Job Description</label>
                <input /> <br />
                <label>About Company</label>
                <input /> <br />
                <label>Skills Required</label>
                <input /> <br />
                <label>Information</label>
                <input /> <br />
            </form>
        </div>
        <div className={style.right}>
            <img src={wallpaper} alt='wallpaper' />
        </div>
    </div>
  )
}
