import Navbar from './Navbar'
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import {baseurl} from "../Baseurl/baseurl";
function Dashboard() {
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
    const access = localStorage.getItem('access_token');

    // const [count, setCount] = useState();
    // async function getCount() {
    //     const response = await axios.get(`${baseurl}countServiceFollowUp`,{
    //         headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
    //     });
    //     setCount(response.data);
    // }


    useEffect(() => {
        if(access === "0"){
            navigate('/profile');
        }
    })

    const [count, setCount] = useState(null);
    const [filter, setFilter] = useState({ filterType: "month" });
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilter({
        ...filter,
        [name]: value
    });
}
    async function filterCount() {
        const response = await axios.post(`${baseurl}filter_countServiceFollowUp`, filter,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        });
        setCount(response.data);

    }

    async function getCount() {
        const response = await axios.get(`${baseurl}show_filterServiceFollowUp`,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        });
        setCount(response.data);
    }
    useEffect(() => {
        if(role==="2")
            filterCount();
        if(role==="0")
            getCount();
    }, []);
    useEffect(() => {
        if (count) {
            const newChartData = processChartData(count, filter.filterType);
            setChartData(newChartData);
        }
    }, [count]);
    const processChartData = (count, filterType) => {
        const labels = [];
        const dataSets = [];

        if (filterType === "month") {
            labels.push(...Array.from({ length: 31 }, (_, i) => `اليوم${i + 1}`));
        } else {
            labels.push(...Array.from({ length: 12 }, (_, i) => `الشهر ${i + 1}`));
        }

        // Use a default empty array in case count.statuses is undefined or null
        (count?.statuses || []).forEach((status, index) => {
            const data = new Array(labels.length).fill(0); // Initialize data array with zeros

            (status.labels || []).forEach((label, i) => {
                let key;

                if (filterType === "month") {
                    // Handle day data
                    const day = parseInt(label.split('-')[2], 10);
                    key = day ? day - 1 : 0; // Days are 1-31, so subtract 1 to match array index
                } else {
                    // Handle month data
                    const month = parseInt(label, 10);
                    key = month ? month - 1 : 0; // Months are 1-12, so subtract 1 to match array index
                }

                // Ensure the key is within bounds
                if (key >= 0 && key < labels.length) {
                    data[key] += status.count[i]; // Aggregate data
                }
            });
            let backgroundColor, borderColor;
            switch (status.description) {
                case "في الانتظار":
                    backgroundColor = 'rgba(234,179,8,0.4)';
                    borderColor = 'rgb(234,179,8)';
                    break;
                case "تحت المراجعة":
                    backgroundColor = 'rgba(168,85,247,0.4)';
                    borderColor = 'rgb(168,85,247)';
                    break;
                case "قيد التنفيذ":
                    backgroundColor = 'rgba(249,115,22,0.4)';
                    borderColor = 'rgb(249,115,22)';
                    break;
                case "مكتمل":
                    backgroundColor = 'rgba(34,197,94,0.4)';
                    borderColor = 'rgb(34,197,94)';
                    break;
                case "مرفوض":
                    backgroundColor = 'rgba(239,68,68,0.4)';
                    borderColor = 'rgb(239,68,68)';
                    break;
                default:
                    backgroundColor = `rgba(${index * 50},${index * 50},${200 - index * 50},0.4)`;
                    borderColor = `rgb(${index * 50},${index * 50},${200 - index * 50})`;
            }

            dataSets.push({
                label: status.description,
                data,
                backgroundColor,
                borderColor,
                fill: false,
                lineTension: 0.1,

            });
        });

        return { labels, datasets: dataSets };
    };

    //const data = processChartData(count, filter.filterType);
    const data = {
        labels: count.map(item => item.office_name), // Labels for each office
        datasets: [
            {
                label: 'Total Requests', // Label for the dataset
                data: count.map(item => item.total_requests), // Data for each office's total requests
                backgroundColor: count.map((_, index) => `rgba(${index * 50}, ${150 - index * 30}, ${200 - index * 20}, 0.5)`), // Background color for each bar
                borderColor: count.map((_, index) => `rgba(${index * 50}, ${150 - index * 30}, ${200 - index * 20}, 1)`), // Border color for each bar
                borderWidth: 1, // Width of the border around each bar
            },
            {
                label: 'Total Requests2', // Label for the dataset
                data: [2], // Data for each office's total requests
                backgroundColor: count.map((_, index) => `rgba(${index * 50}, ${150 - index * 30}, ${200 - index * 20}, 0.5)`), // Background color for each bar
                borderColor: count.map((_, index) => `rgba(${index * 50}, ${150 - index * 30}, ${200 - index * 20}, 1)`), // Border color for each bar
                borderWidth: 1, // Width of the border around each bar
            },
        ]
    };




    console.log(data)
    return (
    <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between mt-20 w-[calc(100%-16rem)]">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12 ">

                        {role==="2"&&<div className="px-3 py-4 flex justify-center items-center text-center gap-3 w-11/13"
                              dir={"rtl"}>
                            <div
                                className={"w-1/5 bg-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md"}>
                                <p>الإجمالي</p>
                                <span>{count?.total || 0}</span>
                            </div>
                            <div
                                className={"w-1/5 bg-yellow-500 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-md"}>
                                <p>في الإنتظار</p>
                                <span>
                                    {Array.isArray(count?.statuses[0]?.count)
                                        ? count?.statuses[0]?.count.reduce((sum, value) => sum + value, 0)
                                        : count?.statuses[0]?.count || 0}
                                </span>
                            </div>
                            <div
                                className="w-1/5 bg-purple-500 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-md">
                                <p>قيد المراجعة</p>
                                <span>
                                    {Array.isArray(count?.statuses[1]?.count)
                                        ? count?.statuses[1]?.count.reduce((sum, value) => sum + value, 0)
                                        : count?.statuses[1]?.count || 0}
                                </span>
                            </div>
                            <div
                                className={"w-1/5 bg-orange-500 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-md"}>
                                <p>قيد التنفيذ</p>
                                <span>
                                    {Array.isArray(count?.statuses[2]?.count)
                                        ? count?.statuses[2]?.count.reduce((sum, value) => sum + value, 0)
                                        : count?.statuses[2]?.count || 0}
                                </span>
                            </div>
                            <div
                                className={"w-1/5 bg-green-500 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md"}>
                                <p>مكتمل</p>
                                <span>
                                    {Array.isArray(count?.statuses[3]?.count)
                                        ? count?.statuses[3]?.count.reduce((sum, value) => sum + value, 0)
                                        : count?.statuses[3]?.count || 0}
                                </span>
                            </div>
                            <div
                                className={"w-1/5 bg-red-500 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-md"}>
                                <p>رفض</p>
                                <span>
                                    {Array.isArray(count?.statuses[4]?.count)
                                        ? count?.statuses[4]?.count.reduce((sum, value) => sum + value, 0)
                                        : count?.statuses[4]?.count || 0}
                                </span>
                            </div>
                        </div>}

                        <div className="px-3 py-4 flex justify-center items-center">
                            {role==="2"&&<div className={"w-10/12 mx-auto mt-6 grid gap-3"}>
                                <div className={"w-full justify-end flex gap-3"}>
                                    <button onClick={filterCount}
                                            className="w-1/6 bg-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md px-3 py-2">فلتر
                                    </button>
                                    <select
                                        onChange={handleFilterChange}
                                        value={filter.filterType}
                                        name="filterType"
                                        id="filterType"
                                        className="w-1/4 border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="year">عام حالي</option>
                                        <option value="month">شهر حالي</option>
                                    </select>
                                </div>
                                <Line data={chartData}/>
                            </div>}
                            <Bar data={data}/>
                        </div>
                    </div>
                </div><ToastContainer position="top-left" />
            </div>
        </div>
        </>
    );
}
export default Dashboard