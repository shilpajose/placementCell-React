import React, { useState } from 'react'
import DataTable from 'react-data-table-component';


function Test() {
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,
        }

    ];
    const data = [
        {
            id: 1,
            name: 'shilpa',
            age: '30'
        },
        {
            id: 2,
            name: 'asteve',
            age: '5'
        },
        {
            id: 3,
            name: 'aasteveunni',
            age: '5'
        },
        {
            id: 4,
            name: 'abstevekudukka',
            age: '5'
        },
        {
            id: 1,
            name: 'shilpa',
            age: '30'
        },
        {
            id: 2,
            name: 'asteve',
            age: '5'
        },
        {
            id: 3,
            name: 'aasteveunni',
            age: '5'
        },
        {
            id: 4,
            name: 'abstevekudukka',
            age: '5'
        },
        {
            id: 1,
            name: 'shilpa',
            age: '30'
        },
        {
            id: 2,
            name: 'asteve',
            age: '5'
        },
        {
            id: 3,
            name: 'aasteveunni',
            age: '5'
        },
        {
            id: 4,
            name: 'abstevekudukka',
            age: '5'
        },
        {
            id: 1,
            name: 'shilpa',
            age: '30'
        },
        {
            id: 2,
            name: 'asteve',
            age: '5'
        },
        {
            id: 3,
            name: 'aasteveunni',
            age: '5'
        },
        {
            id: 4,
            name: 'abstevekudukka',
            age: '5'
        },
        {
            id: 1,
            name: 'shilpa',
            age: '30'
        },
        {
            id: 2,
            name: 'asteve',
            age: '5'
        },
        {
            id: 3,
            name: 'aasteveunni',
            age: '5'
        },
        {
            id: 4,
            name: 'abstevekudukka',
            age: '5'
        },
        {
            id: 1,
            name: 'shilpa',
            age: '30'
        },
        {
            id: 2,
            name: 'asteve',
            age: '5'
        },
        {
            id: 3,
            name: 'aasteveunni',
            age: '5'
        },
        {
            id: 4,
            name: 'abstevekudukka',
            age: '5'
        },
        {
            id: 1,
            name: 'shilpa',
            age: '30'
        },
        {
            id: 2,
            name: 'asteve',
            age: '5'
        },
        {
            id: 3,
            name: 'aasteveunni',
            age: '5'
        },
        {
            id: 4,
            name: 'abstevekudukka',
            age: '5'
        },

    ];
    const [records, setRecords] = useState(data)
    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }
    return (
        <>
            <div className='container  mt-5 border shadow p-5'>
                <h1 className='text-center'>Data Table</h1>
                <div className='text-end'>
                    <input type="text" onChange={handleFilter} />
                </div>
                <DataTable

                    columns={columns}
                    data={records}
                    selectableRows
                    fixedHeader
                    pagination

                />
            </div>


        </>
    )
}

export default Test




