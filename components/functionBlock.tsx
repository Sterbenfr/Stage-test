import style from '../styles/components.module.css'

interface FunctionBlockProps {
    fonc1: string
    fonc2?: string
}

const FunctionBlock: React.FC<FunctionBlockProps> = ({ fonc1, fonc2 }) => {
    return (
        <div className={style.functionBlock}>
            <button className={style.btnFunctionBlockADD}>{fonc1}</button>

            <button className={style.btnFunctionBlockDEL}>{fonc2}</button>
        </div>
    )
}

export default FunctionBlock
