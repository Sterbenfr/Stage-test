import React from 'react'
import Line from './line'
import FunctionBlock from './functionBlock'
import style from '../styles/components.module.css'

interface ListProps {
    deleteFunction?: React.MouseEventHandler<HTMLInputElement>
    value1?: string
    value2?: string
    value3?: string
    value4?: string
    value5?: string
    value6?: string
}

interface FunctionProps {
    fonc1?: React.MouseEventHandler<HTMLButtonElement>
    fonc2?: React.MouseEventHandler<HTMLButtonElement>
}

const List: React.FC<{ items: ListProps[]; functions: FunctionProps }> = ({
    items,
    functions,
}) => {
    return (
        <>
            <FunctionBlock fonc1={functions.fonc1} fonc2={functions.fonc2} />
            <div className={style.list_line}>
                {items.map(item => (
                    // Wrap Line component with a div and add onClick event
                    <div key={item.value1}>
                        <Line
                            deleteFunction={item.deleteFunction}
                            param1={item.value1 == null ? '' : item.value1}
                            param2={item.value2 == null ? '' : item.value2}
                            param3={item.value3 == null ? '' : item.value3}
                            param4={item.value4 == null ? '' : item.value4}
                            param5={item.value5 == null ? '' : item.value5}
                            param6={item.value6 == null ? '' : item.value6}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default List
