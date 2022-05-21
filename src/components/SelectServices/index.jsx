import React, { useState, useEffect } from 'react';
import { fetchServices } from '../../api';
import style from './style.module.css'

const Service = (props) => {

    const { title } = props

    const [isSelected, setIsSelected] = useState(false)

    const handleChange = (event) => {

        const v = event.target.value

        if (event.target.checked) {
            props.onServiceSelect(v)
        } else {
            props.onServiceDiselect(v)
        }
    }

    return (
        <div className={`${style.service_item} ${isSelected ? style.service_item_selected : ''}`}>

            <label className={style.service_item_label}>

                <span className={style.service_item_title}>
                    {title}
                </span>

                <input onChange={handleChange} className={style.service_item_input} checked={props.selectedKeys.includes(title)} name="service" value={title} type="checkbox" />

            </label>

        </div>
    )

}

export const SelectServices = (props) => {

    const [isServicesLoading, setIsServicesLoading] = useState(false)

    const [services, setServices] = useState([])

    useEffect(() => {

        setIsServicesLoading(true)

        fetchServices()
            .then(resp => setServices(resp))
            .finally(() => setIsServicesLoading(false))

    }, [])

    console.log()

    return (

        <div {...props} className={style.services} >

            {
                isServicesLoading ?
                    "...Loading"
                    :
                    services.map(service => <Service {...props} key={service} title={service} />)
            }

        </div>

    )

}