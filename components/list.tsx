import React from 'react'
import Line from './line'
import FunctionBlock from './functionBlock'
import style from '../styles/components.module.css'

interface ListProps {
    value1?: string
    value2?: string
    value3?: string
    value4?: string
    value5?: string
    value6?: string
}

const List: React.FC<{ items: ListProps[] }> = ({ items }) => {
    // Click handler function
    const handleClick = (key: string) => {
        if (window.location.href.endsWith('/cerfa')) {
            return
        }

        // Navigate to the current URL + /key
        window.location.href = `${window.location.href}/${key}`
    }

    return (
        <>
            <FunctionBlock fonc1='Add' fonc2='Delete' />
            <div className={style.list_line}>
                {items.map(item => (
                    // Wrap Line component with a div and add onClick event
                    <div
                        key={item.value1}
                        onClick={() => handleClick(item.value1 || '')}
                        style={{ cursor: 'pointer' }}
                    >
                        <Line
                            param1={item.value2 == null ? '' : item.value2}
                            param2={item.value3 == null ? '' : item.value3}
                            param3={item.value4 == null ? '' : item.value4}
                            param4={item.value5 == null ? '' : item.value5}
                            param5={item.value6 == null ? '' : item.value6}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default List
