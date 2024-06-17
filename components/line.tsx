import style from '../styles/components.module.css'

export interface LineProps {
    param1: string
    param2: string
    param3: string
    param4?: string
    param5?: string
}

const Line: React.FC<LineProps> = ({
    param1,
    param2,
    param3,
    param4,
    param5,
}) => {
    return (
        <div className={style.body}>
            <div className={style.line}>
                <div className={style.check_box}>
                    <input className={style.check} type='checkbox'></input>
                </div>

                <div className={style.Ztext}>{param1}</div>

                <div className={style.Ztext}>{param2}</div>

                <div className={style.Ztext}>{param3}</div>

                <div className={style.Ztext}>{param4}</div>

                <div className={style.Ztext}>{param5}</div>
            </div>
        </div>
    )
}

export default Line
