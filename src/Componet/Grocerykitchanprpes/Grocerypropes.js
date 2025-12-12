import React from 'react'
import BaseUrl from '../service/BaseUrl'

const Grocerypropes = ({ data }) => {
    return (
        <>
            <div className="grid grid-cols-4 lg:grid-cols-8 w-full gap-3 px-5 font-uifontfamily text-center">
                {data.map((item, index) => (
                    <div key={index} className={index === 0 ? 'col-span-2 ' : 'col-span-1'}>
                        <img src={`${BaseUrl}/${item?.product_Image}`} alt={item.product_Name} className="w-full h-[160px] " />
                        <p>{item.product_Name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Grocerypropes