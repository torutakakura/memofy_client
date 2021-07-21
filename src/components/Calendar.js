import React, { useState, useEffect }  from 'react'
import format from 'date-fns/format'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfWeek from 'date-fns/endOfWeek'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import { Link } from "react-router-dom"

import { circleButtonStyle,
         linkButtonStyle,
         isTodayStyle,
         isNotMonthStyle} from '../settings/style.js'
import './Calendar.css';
import { GetMonthSchedules } from '../api/ScheduleAPI'


/**
 * 表示する日付を配列で取得
 * @param {date} date 対象の日付
 */
const getCalendarArray = date => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  })
  return sundays.map(sunday =>
    eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
  )
}

/**
 * カレンダー全体
 */
const Calendar = () => {

  const [schedules, setSchedules] = useState([])
  const [targetDate, setTargetDate] = useState(new Date())
  const [isSchedule, setIsSchedule] = useState(false)
  const [clikedDate, setClickedDate] = useState('')
  const weeks = ['日', '月', '火', '水', '木', '金', '土']
  const calendar = getCalendarArray(targetDate)
  let scheduleObje = {}
  let tdElement = null;

  /**
   * 予定一覧をAPIで取得
   */
  useEffect(() =>{
    
    GetMonthSchedules().then(data => {
      setSchedules(data)      
    })
  }, [targetDate])
  /**
   * カレンダーヘッダー
   */
  const CalendarHead = () => (
    <thead>
      <tr>
      <th colSpan="7" className="montharea" style={{padding: ".01rem"}}>
        <button type="button" className="btn btn-link rounded-circle p-0" style={circleButtonStyle} onClick={() => setTargetDate(current => subMonths(current, 1))}>＜</button>
          {format(targetDate, 'y年M月')}
        <button type="button" className="btn btn-link rounded-circle p-0" style={circleButtonStyle} onClick={() => setTargetDate(current => addMonths(current, 1))}>＞</button>
      </th>
    </tr>
      <tr>
        {weeks.map(week =>(
          <th>{week}</th>
        ))}
      </tr>
    </thead>
  )

  /**
   * カレンダーボディ
   */
  const CalendarBody = () => {

    /**
     * カレンダークリック時のイベント
     */
    const clickCalendar = (e) => {
      if (tdElement !== null) {
        tdElement.className = "day"
        setIsSchedule(false)
        return
      }
      e.target.className = "selected"
      tdElement = e.target
      setClickedDate(e.target.id)
      setIsSchedule(true)
    }

    /**
     * 表示する日付の予定タイトル取得
     * @param {string} displayDate 表示する日付
     */ 
    const getScheduleTitle = displayDate => {
      const titleList = []
      
      for (const schedule of schedules) {
        if (schedule.notification_date === displayDate) {
          titleList.push(schedule.title)
        } else {
          continue
        }
      }
      if (titleList.length > 0) {
        scheduleObje[displayDate] = titleList 
      }
      return titleList
    }
  
    return (
      <tbody>
      {calendar.map((weekRow, rowNum) => (
        <tr key={rowNum}>
          {weekRow.map(date => {
            const today = format(new Date(), 'y-MM-dd')
            const displayDate = format(date, 'y-MM-dd')
            const month = format(targetDate, 'M')
            const displayMonth = format(date, 'M')
            const titleList = getScheduleTitle(displayDate)
            
            if (today === displayDate) {
              return(
                <td className="day" valign="top" id={displayDate} key={getDay(date)} style={isTodayStyle} onClick={clickCalendar}>
                  {getDate(date)}<br />
                  {titleList.map(title => (
                    <>
                      {title}<br />
                    </>
                  ))}
                </td>
              )
            } else if (month !== displayMonth) {
              return <td className="day" valign="top" id={displayDate} key={getDay(date)} style={isNotMonthStyle} onClick={clickCalendar}>{getDate(date)}</td>
            } else {
              return (
                <td className="day" valign="top" id={displayDate} key={getDay(date)} onClick={clickCalendar}>
                  {getDate(date)}<br />
                  {titleList.map(title => (
                    <>
                      {title}<br />
                    </>
                  ))}
                </td>
              ) 
            }
          }
          )}
        </tr>
      ))}
    </tbody>
    )
  }

  /**
   * クリックした日付の予定を表示
   */
  const ShowSchedule = () => {
    const titles = scheduleObje[clikedDate]
    return(
      <div className="headline">
        <div className="title">
          <div className="left-content">{clikedDate}</div>
          <div className="right-content">▼</div>
        </div>
        <ul className="schedule-list">
          {titles.map(title => (
            <li className="schedule">
              <Link className='schedule-link' to={{ pathname: '/schedule/detail', state: clikedDate}}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>  
    )
  }

  return (
    <>
      <table className='calendar'>
        <CalendarHead />
        <CalendarBody />
      </table>
      {isSchedule && <ShowSchedule />}
      <div style={linkButtonStyle}>
        <Link className="btn btn-secondary rounded-circle p-0" style={circleButtonStyle} to="/schedule/create">＋</Link>
      </div>
    </>
  )
}

export default Calendar