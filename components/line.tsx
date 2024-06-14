import style from '../styles/components.module.css'

export interface LineProps {
    param1: string
    param2: string
    param3: string
    param4: string
    param5: string
}

const Line: React.FC<LineProps> = ({
    param1,
    param2,
    param3,
    param4,
    param5,
}) => {
    return (
        <div className={style.line}>
            <div>
                <input type='checkbox'></input>
            </div>

            <div>{param1}</div>

            <div>{param2}</div>

            <div>{param3}</div>

            <div>{param4}</div>

            <div>{param5}</div>
        </div>
    )
}

export default Line
