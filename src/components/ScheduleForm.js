import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import { notificationTiming, notificationTime } from '../settings/settings.js';
import { titleStyle,
         linkButtonStyle,
         validateErrorStyle,
         circleButtonStyle } from '../settings/style'



const ScheduleForm = () => {

    const dispHeight = document.documentElement.clientHeight;

    let mbStyle = "mb-2"
    if (dispHeight > 580) {
        mbStyle = "mb-4"
    }

    const TitleForm = () => (
        <Form.Group className="my-3" controlId="formTitle">
            <Form.Label>タイトル</Form.Label>
            <Form.Control  {...register("title", { required: true })} type="text" placeholder="太郎くんの誕生日" />
            <span style={validateErrorStyle}> {errors.title?.type === 'required' && "タイトルは必須入力です。"}</span>
        </Form.Group>
    )

    const NotificationDateForm = () => (
        <Form.Group className={mbStyle} controlId="formNotificationDate">
            <Form.Label>予定日</Form.Label>
            <Form.Control {...register("notification_date", { required: true })} type="date" />
            <span style={validateErrorStyle}> {errors.notification_date?.type === 'required' && "予定日は必須入力です。"}</span>
        </Form.Group>
    )

    const NotificationTimeForm = () => (
        <Form.Group className={mbStyle} controlId="formNotificationTime">
            <Form.Label>時間</Form.Label>
            <select {...register("notification_time")} className="form-select">
                <option>----------</option>
                {notificationTime.map((eachTime, index) => (
                    <option key={index} defaultValue={Object.keys(eachTime)}>{eachTime[index]}</option>
                ))}
            </select>
        </Form.Group>
    )

    const NotificationTimingForm = () => {

        const [ timingModalShow, setTimingModalShow ] = useState(false)
        const [ timingVal, setTiming ] = useState('')

        const confirmTimingModal = () => {
            const checkedList = [];
            const notificationTimings = document.querySelectorAll('.notification-timings')
            for (const timning of notificationTimings) {
                if (timning.firstChild.checked) {
                    checkedList.push(timning.lastChild.innerText);
                }
            }
            setTiming(checkedList.join('・'))
            setTimingModalShow(false)
        }

        return (
            <>
            <Form.Group className={mbStyle} controlId="formNotificationTiming">
                <Form.Label>通知設定日</Form.Label>
                <Form.Control defaultValue={timingVal} type="text" placeholder="１日前" onClick={() =>setTimingModalShow(true)} />
            </Form.Group>
            <Modal show={timingModalShow} onHide={() =>setTimingModalShow(false)} centered>
                <Modal.Header>
                    <Modal.Title>通知設定日</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {notificationTiming.map((eachTiming, index) => (
                        <Form.Check 
                        {...register("notification_timing")}
                        defaultValue={Object.keys(eachTiming)}
                        className='notification-timings'
                        type="checkbox"
                        label={eachTiming[index]}
                        key={index} />
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => confirmTimingModal()}>設定する</Button>
                </Modal.Footer>
            </Modal>
        </>
        )
    }

    const MemoForm = () => {

        const [memoModalShow, setMemoModalShow] = useState(false);
        const [memoVal, setMemo] = useState("")

        const openMemoModal = () => {
            setMemo(document.querySelector('.orgMemo').value)
            setMemoModalShow(true)
        }

        const confirmMemoModal = () => {
            document.querySelector('.orgMemo').value = memoVal
            setMemoModalShow(false)
        }

        return(
            <>
                <Form.Group className={mbStyle} controlId="formMemo">
                    <Form.Label>メモ</Form.Label>
                    <Form.Control className="orgMemo" {...register("memo")} as="textarea" placeholder="メモ" onClick={() =>openMemoModal()} />
                </Form.Group>
                <Modal show={memoModalShow} onHide={() => setMemoModalShow(false)} centered>
                    <Modal.Header>
                        <Modal.Title>メモ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control defaultValue={memoVal} as="textarea" placeholder="メモ" onChange={e =>setMemo(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setMemoModalShow(false)}>閉じる</Button>
                        <Button variant="primary" onClick={() => confirmMemoModal()}>完了</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h5 style={titleStyle}>記念日作成</h5>
                <TitleForm />
                <NotificationDateForm />
                <NotificationTimeForm />
                <NotificationTimingForm />
                <MemoForm />
                <div style={titleStyle}>
                    <Button variant="warning" type="submit">登録</Button>            
                </div>
            </Form>
            <div style={linkButtonStyle}>
                <Link className="btn btn-light rounded-circle p-0" style={circleButtonStyle} to="/">
                    <img src={`${process.env.PUBLIC_URL}/assets/imgs/calendar.png`} width="25px" height="25px" />
                </Link>
            </div>            
        </div>
    )
}

export default ScheduleForm
