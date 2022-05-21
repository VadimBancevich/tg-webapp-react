import React, { useState, useEffect } from 'react'
import { fetchEmployees } from '../../api'
import style from './style.module.css'

const Employee = ({ employee, onEmplSelect,selectedEmpl }) => {

    return (
        <div className={`btn ${style.employee_item}`}>
            <label className={style.employee_item_label}>
                <span>{`${employee.firstName} ${employee.lastName || ''}`}</span>
                <input onChange={(e)=>onEmplSelect(employee)} name='employeeId' value={employee.id} type={"radio"}  checked={selectedEmpl == employee.id}/>
            </label>
        </div>
    )
}

export const SelectEmployee = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [empls, setEmpls] = useState([])

    useEffect(() => {

        setIsLoading(true)

        fetchEmployees()
            .then(resp => setEmpls(resp))
            .finally(() => setIsLoading(false))

    }, [])

    return (
        <div className={style.employees}>
            {
                isLoading ?
                    "Loading..."
                    :
                    <div >{
                        empls.map(empl => <Employee {...props} key={empl.id} employee={empl}/>)
                    }</div>
            }
        </div>
    )
}