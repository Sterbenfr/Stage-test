import style from '../styles/components.module.css'

interface FunctionBlockProps {
    fonc1?: React.MouseEventHandler<HTMLButtonElement>
    fonc2?: React.MouseEventHandler<HTMLButtonElement>
}

const FunctionBlock: React.FC<FunctionBlockProps> = ({ fonc1 , fonc2 }) => {
    return (
        <div className={style.functionBlock}>
            <button className={style.btnFunctionBlockADD} onClick={fonc1}>Add</button>
            <button className={style.btnFunctionBlockDEL} onClick={fonc2}>Delete</button>
        </div>
    )
}

export default FunctionBlock
