import React from 'react';
import Linechart from '../common/Linechart';
import { FaBiking, FaCheckCircle, FaClipboardList, FaRocket } from 'react-icons/fa';
import { HiBellAlert } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const Order = () => {
      const navigate = useNavigate()


  const alerts = [
    { time: '11:05', message: 'Order #1045 delayed by 10 mins', type: 'warning' },
    { time: '11:20', message: 'New high-value order: ₹1,250', type: 'info' },
    { time: '11:35', message: 'Payment failed for Order #1033', type: 'error' },
  ];

  const cards = [
    {
      title: 'Pending Order',
      count: '05',
      icon: <FaClipboardList className="text-green-500" size={28} />,
      bg: 'bg-green-100',
    },
    {
      title: 'In Progress',
      count: '12',
      icon: <FaRocket className="text-purple-500" size={28} />,
      bg: 'bg-purple-100',
    },
    {
      title: 'Shipping',
      count: '1026',
      icon: <FaBiking className="text-orange-500" size={28} />,
      bg: 'bg-blue-100',
    },
    {
      title: 'Completed Orders',
      count: '1026',
      icon: <FaCheckCircle className="text-blue-500" size={28} />,
      bg: 'bg-blue-100',
    },
  ];

  const OrderComes = [
    {
      CustomerName: "Anjali Mehta",
      PhoneNumber: "+91 10203 00405",
      DeliveryLocation: "Shivaji Nagar, Pune",
      Pincode: "090990",
      PaymentType: "Online",
      PaymentStatus: "Paid",
      OrderStatus: "packed",
      DeliveryBoy: "Ravi Kumar",
      PackedBy: "Sunita Joshi",
      TotalAmount: 459,
      Date: "13/06/2025 10:11",
      OrderItems: [
        { itemName: "Paneer Butter Masala", quantity: 1, price: 199 },
        { itemName: "Butter Naan", quantity: 2, price: 130 },
        { itemName: "Gulab Jamun", quantity: 1, price: 50 }
      ],
      SpecialInstructions: "Deliver hot. Call on arrival."
    },
    {
      CustomerName: "Rahul Sharma",
      PhoneNumber: "+91 98765 43210",
      DeliveryLocation: "Kothrud, Pune",
      Pincode: "411038",
      PaymentType: "Cash",
      PaymentStatus: "Pending",
      OrderStatus: "packing",
      DeliveryBoy: "Akash Singh",
      PackedBy: "Meera Patil",
      TotalAmount: 350,
      Date: "13/06/2025 10:25",
      OrderItems: [
        { itemName: "Chicken Biryani", quantity: 1, price: 250 },
        { itemName: "Raita", quantity: 1, price: 50 },
        { itemName: "Cold Drink", quantity: 1, price: 50 }
      ],
      SpecialInstructions: "Keep separate spoon."
    },
    {
      CustomerName: "Priya Desai",
      PhoneNumber: "+91 91234 56789",
      DeliveryLocation: "Baner, Pune",
      Pincode: "411045",
      PaymentType: "Online",
      PaymentStatus: "Paid",
      OrderStatus: "packed",
      DeliveryBoy: "Ravi Kumar",
      PackedBy: "Sunita Joshi",
      TotalAmount: 289,
      Date: "13/06/2025 10:40",
      OrderItems: [
        { itemName: "Veg Thali", quantity: 1, price: 199 },
        { itemName: "Lassi", quantity: 1, price: 90 }
      ],
      SpecialInstructions: "Ring bell twice."
    },
    {
      CustomerName: "Vikram Patel",
      PhoneNumber: "+91 99887 66554",
      DeliveryLocation: "Pimpri, Pune",
      Pincode: "411018",
      PaymentType: "Online",
      PaymentStatus: "Paid",
      OrderStatus: "packing",
      DeliveryBoy: "Akash Singh",
      PackedBy: "Meera Patil",
      TotalAmount: 599,
      Date: "13/06/2025 11:00",
      OrderItems: [
        { itemName: "Mutton Rogan Josh", quantity: 1, price: 399 },
        { itemName: "Naan", quantity: 2, price: 100 },
        { itemName: "Kheer", quantity: 1, price: 100 }
      ],
      SpecialInstructions: "No onion, please."
    },
    {
      CustomerName: "Sneha Kulkarni",
      PhoneNumber: "+91 90765 43210",
      DeliveryLocation: "Hadapsar, Pune",
      Pincode: "411028",
      PaymentType: "Cash",
      PaymentStatus: "Pending",
      OrderStatus: "packed",
      DeliveryBoy: "Ravi Kumar",
      PackedBy: "Sunita Joshi",
      TotalAmount: 150,
      Date: "13/06/2025 11:15",
      OrderItems: [
        { itemName: "Masala Dosa", quantity: 1, price: 100 },
        { itemName: "Filter Coffee", quantity: 1, price: 50 }
      ],
      SpecialInstructions: ""
    },
    {
      CustomerName: "Aditya Rao",
      PhoneNumber: "+91 91222 33344",
      DeliveryLocation: "Wakad, Pune",
      Pincode: "411057",
      PaymentType: "Online",
      PaymentStatus: "Paid",
      OrderStatus: "packing",
      DeliveryBoy: "Akash Singh",
      PackedBy: "Meera Patil",
      TotalAmount: 420,
      Date: "13/06/2025 11:30",
      OrderItems: [
        { itemName: "Paneer Tikka", quantity: 2, price: 200 },
        { itemName: "Mint Chutney", quantity: 1, price: 20 }
      ],
      SpecialInstructions: "Extra spicy."
    },
    {
      CustomerName: "Nisha Verma",
      PhoneNumber: "+91 92345 67890",
      DeliveryLocation: "Camp, Pune",
      Pincode: "411001",
      PaymentType: "Online",
      PaymentStatus: "Paid",
      OrderStatus: "packed",
      DeliveryBoy: "Ravi Kumar",
      PackedBy: "Sunita Joshi",
      TotalAmount: 310,
      Date: "13/06/2025 11:45",
      OrderItems: [
        { itemName: "Veg Pulao", quantity: 1, price: 150 },
        { itemName: "Paneer Pakoda", quantity: 1, price: 160 }
      ],
      SpecialInstructions: "Call on arrival."
    },
    {
      CustomerName: "Rohan Singh",
      PhoneNumber: "+91 93456 78901",
      DeliveryLocation: "Kharadi, Pune",
      Pincode: "411014",
      PaymentType: "Cash",
      PaymentStatus: "Pending",
      OrderStatus: "packing",
      DeliveryBoy: "Akash Singh",
      PackedBy: "Meera Patil",
      TotalAmount: 540,
      Date: "13/06/2025 12:00",
      OrderItems: [
        { itemName: "Butter Chicken", quantity: 1, price: 289 },
        { itemName: "Garlic Naan", quantity: 2, price: 150 },
        { itemName: "Dessert", quantity: 1, price: 101 }
      ],
      SpecialInstructions: "Keep sauce separate."
    },
    {
      CustomerName: "Geeta Rao",
      PhoneNumber: "+91 94567 89012",
      DeliveryLocation: "Magarpatta, Pune",
      Pincode: "411028",
      PaymentType: "Online",
      PaymentStatus: "Paid",
      OrderStatus: "packed",
      DeliveryBoy: "Ravi Kumar",
      PackedBy: "Sunita Joshi",
      TotalAmount: 260,
      Date: "13/06/2025 12:15",
      OrderItems: [
        { itemName: "Chole Bhature", quantity: 1, price: 180 },
        { itemName: "Raita", quantity: 1, price: 80 }
      ],
      SpecialInstructions: ""
    },
    {
      CustomerName: "Siddharth Jain",
      PhoneNumber: "+91 95678 90123",
      DeliveryLocation: "Lohegaon, Pune",
      Pincode: "411032",
      PaymentType: "Online",
      PaymentStatus: "Paid",
      OrderStatus: "packing",
      DeliveryBoy: "Akash Singh",
      PackedBy: "Meera Patil",
      TotalAmount: 375,
      Date: "13/06/2025 12:30",
      OrderItems: [
        { itemName: "Grilled Sandwich", quantity: 2, price: 150 },
        { itemName: "Cold Coffee", quantity: 1, price: 75 }
      ],
      SpecialInstructions: "No mayo."
    }
  ];

  const totalOrders = OrderComes.length;
  const avgOrderValue =
    OrderComes.reduce((sum, o) => sum + o.TotalAmount, 0) / (totalOrders || 1);

  // Data for mini chart
  const chartData = {
    labels: OrderComes.map(o => o.Date.split(' ')[0]), // use dates
    datasets: [
      {
        label: 'Orders',
        data: OrderComes.map(o => o.TotalAmount),
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.3)',
        pointRadius: 2,
        fill: true,
      },
    ]
  }
  return (
    <>
      <div className="bg-blue-950 px-5 py-5" >
        {/* <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <Linechart />
          </div>
          <div className="w-full lg:w-1/2">
            <div className=" text-white p-4 rounded-lg shadow-lg border border-gray-500">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"> <HiBellAlert color='white' /> Recent Alerts </h2>
              <ul>
                {alerts.map((alert, i) => (
                  <li key={i} className="mb-2">
                    <span className="font-mono text-sm mr-2">{alert.time}</span>
                    <span>{alert.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="w-full lg:w-1/2">
            <Linechart />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-blue-950 border border-gray-500 text-white p-5 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-500 pb-2">
                🔔 Recent Alerts
              </h2>
              <ul className="space-y-4">
                {alerts.map((alert, i) => (
                  <li
                    key={i}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-500 transition"
                  >
                    <span className="font-mono text-sm text-gray-400 w-12">
                      {alert.time}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span
                          className={`inline-block mr-2 ${alert.type === 'error'
                              ? 'text-red-400'
                              : alert.type === 'warning'
                                ? 'text-yellow-400'
                                : 'text-green-400'
                            }`}
                        >
                          ●
                        </span>
                        {alert.message}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition">
                View all alerts
              </button>
            </div>
          </div>
        </div>

        <br />

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl shadow-sm border border-gray-500 hover:bg-gray-500 hover:cursor-pointer bg-blue-950 flex justify-between items-center`}
              >
                <div>
                  <p className="text-sm font-medium text-white">{card.title}</p>
                  <p className="text-2xl font-bold text-white">{card.count}</p>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-md">
                  {card.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        <br />

        <div className="h-auto w-full border rounded-md border-gray-500 text-white overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="border-b border-gray-500">
              <tr className='text-nowrap'>
                <th className="px-4 py-2 ">Customer Name</th>
                <th className="px-4 py-2 ">Phone Number</th>
                <th className="px-4 py-2 ">Delivery Location</th>
                <th className="px-4 py-2 ">Pincode</th>
                <th className="px-4 py-2 ">PaymentType</th>
                <th className="px-4 py-2 ">PaymentStatus</th>
                <th className="px-4 py-2 ">OrderStatus</th>
                <th className="px-4 py-2 ">DeliveryBoy</th>
                <th className="px-4 py-2 ">PackedBy</th>
                <th className="px-4 py-2 ">TotalAmount</th>
                <th className="px-4 py-2 ">Date</th>
                <th className="px-4 py-2 ">OrderItems</th>
                <th className="px-4 py-2 ">SpecialInstructions</th>
              </tr>
            </thead>
            <tbody>
              {OrderComes.map((item, index) => (
                <tr key={index} className="border-b border-gray-500 text-center text-nowrap hover:bg-gray-500">

                  <td className="px-4 py-2 ">{item.CustomerName}</td>
                  <td className="px-4 py-2 ">{item.PhoneNumber}</td>
                  <td className="px-4 py-2 ">{item.DeliveryLocation}</td>
                  <td className="px-4 py-2 ">{item.Pincode}</td>
                  <td className={`px-4 py-2 ${item.PaymentType === 'Online' ? 'text-green-500' : item.PaymentType === 'Cash' ? 'text-yellow-500' : ''}`} > {item.PaymentType} </td>
                  <td className="px-4 py-2 ">{item.PaymentStatus}</td>
                  <td className="px-4 py-2 ">{item.OrderStatus}</td>
                  <td className="px-4 py-2 ">{item.DeliveryBoy}</td>
                  <td className="px-4 py-2 ">{item.PackedBy}</td>
                  <td className="px-4 py-2 ">{item.TotalAmount}</td>
                  <td className="px-4 py-2 ">{item.Date}</td>
                  <td className="px-4 py-2 ">
                    <ul style={{ margin: 0, paddingLeft: '1em' }}>
                      {item.OrderItems.map((item, i) => (
                        <li key={i} className='flex'>
                          {item.itemName} × {item.quantity} @ ₹{item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2">{item.SpecialInstructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >
    </>
  );
};

export default Order;
