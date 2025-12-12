import React from 'react'
import BaseUrl from '../service/BaseUrl'

const PuffPropes = ({ data }) => {
    return (
        <>
            <div className='grid grid-cols-4 lg:grid-cols-8 font-uifontfamily text-center gap-3 px-3 '>
                {data.map((item, index) => (
                    <div key={index}>
                        <img src={`${BaseUrl}/${item?.product_Image}`} className='shadow-md' />
                        <p>{item.product_Name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PuffPropes