import React from 'react'
import Line from './line'
import FunctionBlock from './functionBlock'

interface ListProps {
    value1: string
    value2: string
    value3: string
    value4: string
    value5?: string
    value6?: string
}

const List: React.FC<{ items: ListProps[] }> = ({ items }) => {
    return (
        <>
            <FunctionBlock fonc1='Add' fonc2='Delete' />
            <div>
                {items.map(item => (
                    <Line
                        key={item.value1}
                        param1={item.value2}
                        param2={item.value3}
                        param3={item.value4}
                        param4={item.value5}
                        param5={item.value6}
                    />
                ))}
            </div>
        </>
    )
}

export default List
