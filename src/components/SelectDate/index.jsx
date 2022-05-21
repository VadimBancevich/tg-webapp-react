import { useEffect, useState } from "react"
import style from './style.module.css'
import { getAvailableTimes } from '../../api'

const selectedItemStyle = { background: '#8dff8d' }

export const SelectDate = (props) => {

    const { dateTime, emplId, services, onDateSelect } = props

    return (
        <div style={{ height: 'inherit' }}>
            {/* <Calendar dateTime={dateTime} date={new Date()} /> */}
            <Calendar {...props} />
        </div>
        // <input name="date" type={"datetime-local"} />
    )

}



const Time = ({ times, selectedTime, onSelect }) => {

    // const [times, setTimse] = useState([])

    // useEffect(() => {

    //     getAvailableTimes().then(resp => setTimse(resp))

    // }, [])

    return (
        <div className={style.time_block}>
            {times.map((time, i) => {

                return <div
                    key={i}
                    onClick={() => onSelect(time)}
                    style={selectedTime == time ? selectedItemStyle : undefined}
                >
                    {time}
                </div>
            })}
        </div>
    )

}

const Days = ({ date, selectedDay, onSelect }) => {

    const temp = new Date(date)

    const curDate = new Date()

    if (date.getMonth() === curDate.getMonth()) {
        temp.setDate(curDate.getDate())
    } else {
        temp.setDate(1)
    }

    const days = []

    const curMonth = temp.getMonth();

    while (temp.getMonth() === curMonth) {

        const calendarDay = temp.getDate();

        days.push({ dayNumber: calendarDay, title: temp.toLocaleString(undefined, { weekday: "long" }) })

        temp.setDate(calendarDay + 1)

    }

    return (
        <div className={style.days_block}>

            {
                days.map(day => {

                    return <div
                        key={day.dayNumber}
                        style={day.dayNumber == selectedDay ? selectedItemStyle : undefined}
                        className="btn"
                        onClick={() => onSelect(day.dayNumber)}
                    >
                        {`${day.dayNumber} ${day.title}`}
                    </div>

                })
            }

        </div>
    )

}

const Month = ({ date, onNext, onPrev }) => {

    return (

        <div className={style.month_block}>

            <div className="btn" onClick={onPrev}>prev</div>

            <div>{date.toLocaleString(undefined, { month: "long" })}</div>

            <div className="btn" onClick={onNext}>next</div>

        </div>

    )

}

const maxFutureMonth = 1;
const maxPastMonth = 0

const Calendar = ({ selectedTimestamp, onSelect }) => {

    const selectedDate = new Date(selectedTimestamp || Date.now())
    const curDate = new Date();

    const [tempDate, setTempDate] = useState(new Date(curDate))
    const [monthShift, setMonthShift] = useState(0)
    const [times, setTimes] = useState([])

    useEffect(() => {

        getAvailableTimes().then(resp => setTimes(resp))

    }, [tempDate])

    return (
        <div className={style.calendar_block}>
            <Month
                date={tempDate}
                onNext={() => {
                    if (monthShift < maxFutureMonth) {
                        tempDate.setMonth(tempDate.getMonth() + 1)
                        setMonthShift(monthShift + 1)
                    }
                }}
                onPrev={() => {
                    if (monthShift > maxPastMonth) {
                        tempDate.setMonth(tempDate.getMonth() - 1)
                        setMonthShift(monthShift - 1)
                    }
                }}
            />
            <Days
                date={tempDate}
                selectedDay={tempDate.getDate()}
                onSelect={(dayNumber => {

                    tempDate.setDate(dayNumber)

                    setTempDate(new Date(tempDate))

                })}
            />

            <Time
                times={times}
                selectedTime={selectedDate.toLocaleTimeString('default', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                onSelect={(time) => {

                    const times = time.split(":");

                    const hours = times[0];
                    const minutes = times[1];

                    tempDate.setHours(Number.parseInt(hours))
                    tempDate.setMinutes(Number.parseInt(minutes))

                    onSelect && onSelect(tempDate.toString())
                    setTempDate(new Date(tempDate))

                }}
            />

        </div>

    )
}

