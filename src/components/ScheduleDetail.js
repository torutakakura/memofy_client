import React, { useState, useEffect } from 'react'

import { Button, Modal } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom"
import { linkButtonStyle,
         circleButtonStyle } from '../settings/style'
import { GetSchedule, DeleteSchedule } from '../api/ScheduleAPI'

const ScheduleDetail = props => {

    const history = useHistory();
    const [showDeleteModal, setShow] = useState(false);
    const [schedule, setSchedule] = useState({})

    useEffect(() =>{
        GetSchedule(props.location.state).then(data => {
          setSchedule(data)      
        })
      }, [])

    const ScheduleTitle = () => (
        <tr style={{ borderBottom: "solid 1px #ccc"}}>
            <th style={{paddingTop: '30px'}}>タイトル:</th>
            <td style={{paddingTop: '30px', paddingLeft: "30px"}}>{schedule.title}</td>
        </tr>
    )

    const ScheduleNotificationDate = () => (
        <tr style={{borderBottom: "solid 1px #ccc"}}>
            <th style={{paddingTop: '30px'}}>予定日:</th>
            <td style={{paddingTop: '30px', paddingLeft: "30px"}}>{schedule.notification_date}</td>
        </tr>
    )

    const ScheduleNotificationTime = () => (
        <tr style={{borderBottom: "solid 1px #ccc"}}>
            <th style={{paddingTop: '30px'}}>時間:</th>
            <td style={{paddingTop: '30px', paddingLeft: "30px"}}>{schedule.notification_time}</td>
        </tr>
    )

    const ScheduleNotificationTiming = () => (
        <tr style={{borderBottom: "solid 1px #ccc"}}>
            <th style={{paddingTop: '30px'}}>通知設定日:</th>
            <td style={{paddingTop: '30px', paddingLeft: "30px"}}>{schedule.notification_timing}</td>
        </tr>
    )

    const ScheduleMemo = () => (
        <tr style={{borderBottom: "solid 1px #ccc"}}>
            <th style={{paddingTop: '30px'}}>メモ:</th>
            <td style={{paddingTop: '30px', paddingLeft: "30px"}}>{schedule.memo}</td>
        </tr>
    )

    const EditAndDelteArea = () => {
        const deleteScheduleDetail = () => {
            DeleteSchedule(schedule.id).then(() => {
                console.log('OK')
                history.push('/')
            })
        }

        return (
            <>
                <div style={{textAlign: "center", width: "100%", marginTop: "20px"}}>
                    <div className="inline-block" style={{display: "flex", paddingTop: "30px", justifyContent: "space-evenly"}}>
                        <Button variant="warning">編集</Button>
                        <Button variant="danger" onClick={() => setShow(true)}>削除</Button>
                    </div>
                </div>
                <Modal show={showDeleteModal} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>予定削除</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>削除してもよろしいですか？</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            閉じる
                        </Button>
                        <Button variant="danger" onClick={deleteScheduleDetail}>
                            削除する
                        </Button>
                    </Modal.Footer>
              </Modal>                
            </>
        )
    }
    
    return (
        <>
        <div className="container">
            <h5 style={{textAlign: "center", marginTop: "10px"}}>{schedule.notification_date}</h5>
            <table align="center" style={{margin: "10px auto"}}>
                <tbody>
                    <ScheduleTitle />
                    <ScheduleNotificationDate />
                    <ScheduleNotificationTime />
                    <ScheduleNotificationTiming />
                    <ScheduleMemo />
                </tbody>
            </table>
            <EditAndDelteArea />
            <div style={linkButtonStyle}>
                <Link className="btn btn-light rounded-circle p-0" style={circleButtonStyle} to="/">
                    <img src={`${process.env.PUBLIC_URL}/assets/imgs/calendar.png`} width="25px" height="25px" />
                </Link>
            </div>            
        </div>        
        </>
    )
}

export default ScheduleDetail
