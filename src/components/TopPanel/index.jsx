import style from './style.module.css'
import { Button } from '../Button'

export const TopPanel = (props) => {

    return (

        <div className={style.topPanel}>

            {props.showBack &&
                <div onClick={props.onBackClick}>
                    <Button>Назад</Button>
                </div>
            }
            
            {props.title &&
                <div className={style.title}>{props.title}</div>}

        </div>
    )

}