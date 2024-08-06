import Navbar from "../Navbar";
import React, {useEffect, useState,useRef} from "react";
import AddIcon from '@mui/icons-material/Add';
import NewMessage from "../../component/NewMessage";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import {baseurl} from "../../Baseurl/baseurl";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Chats() {
    const role = localStorage.getItem('role');
    const access = localStorage.getItem('access_token');
    const [chats, setChats] = useState([]);
    const [howSend, setHowSend] = useState('');
    async function getChats() {
        const res =  await axios.get(baseurl + 'showchat', {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        });
        setChats(res.data[0])
        setHowSend(res.data['send'])
    }

    const [selectedChatId, setSelectedChatId] = useState(null); // Track selected chat ID
const [indexchat, setIndexchat] = useState(null);
    const [messages, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [updateCount, setUpdateCount] = useState(false);
     const  handleChatClick = async(chatId,index) => {
        setSelectedChatId(chatId); // Update selected chat ID on click
         setIndexchat(index)
        const res = await axios.get(baseurl + 'getmessages/' + chatId , {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        });
         setTitle(res.data[0].Title)
         setMessage(res.data[0].messages)

         const lastMessage = res.data[0].messages.slice(-1)[0]; // الحصول على آخر رسالة
         const lastMessageType = lastMessage.type;
         const isLastMessageFromOffice = lastMessageType === 'Office';
         const isCurrentUserOffice = role in ['0', '1', '2','3'];
         //console.log(isCurrentUserOffice)

         // تنفيذ الكود بناءً على الشروط
         if ((isLastMessageFromOffice && !isCurrentUserOffice) ||
             (!isLastMessageFromOffice && isCurrentUserOffice)) {
             await axios.put(baseurl + 'update_status2/' + chatId, {}, {
                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
             });
             setUpdateCount(!updateCount);
         }
     };

    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (access === "0") {
            navigate('/profile');
        }
        getChats();
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const [value,setvalue] = useState({message: ''});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setvalue((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    async function send_message(){
        if(value.message===''){
            return;
        }
        const  formdata=new FormData();
        formdata.append('message',value.message);
        formdata.append('ID_Chat',selectedChatId);
        await axios.post(baseurl+'sendmessage',formdata,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        })
        setvalue({message: ''});
        await handleChatClick(selectedChatId)
    }

    const [newMessage, setnewMessage] = useState(false);
    const handleadd = async () => {
        setnewMessage(true);
    };

    const handleCloseNewMessage = () => {
        setnewMessage(false);
        getChats();
    };

    const handlestop = async () => {
        await axios.put(baseurl + 'end_chat/' + selectedChatId, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        getChats();
    }

    return (
        <>
        <div className="flex h-screen">
            <div className="flex-grow bg-gray-100 h-lvh">
                <Navbar countme={updateCount}/>
                <div className="flex flex-grow flex-row-reverse text-right inset-y-14 h-auto max-h-screen md:max-w-[calc(100%-16rem)] mt-20">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4  ">
                        <div className="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 className="text-2xl text-gray-900 text-right">الاستفسارات</h1>
                            {role === "4" &&
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleadd}>اضافة <AddIcon/></button>
                            }
                        </div>
                        <div className={"px-6 py-4 flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-screen max-w-full grid grid-cols-4 "} dir={'rtl'}>
                            {chats.length === 0 ?
                                <p className=" text-center h-auto tall:h-96 col-span-1 row-span-2 bg-gray-100 border-l-2 border-gray-500 rounded-r-md overflow-y-auto">
                                لا يوجد رسائل
                                </p>:
                                <div className="flex  h-auto tall:h-96 col-span-1 row-span-2 bg-gray-100 border-l-2 border-gray-500 rounded-r-md overflow-y-auto ">
                                    <div className={' flex flex-col md:w-11/12 h-fit pr-2 pt-2 items-start scroll-p-15'} >
                                        {chats.map((chat, index) => (
                                            <>
                                            <div className=" w-full rounded-xl border-2 my-2 hover:bg-gray-300" key={index}  onClick={() => handleChatClick(chat.id,index)}>
                                                <p className="relative inline-flex p-1">{chat.user}
                                                    {role ==='4' && chat.messages.Status === 'Unread' &&  chat.messages.type === 'Office' ?
                                                         <span className="animate-ping absolute inline-flex h-2 w-2 bg-red-500 rounded-full top-0 right-0"></span>
                                                            :(role in ['0', '1', '2','3'] && chat.messages.Status === 'Unread' &&  chat.messages.type === 'Mwaten' ?
                                                            <span className="animate-ping absolute inline-flex h-2 w-2 bg-red-500 rounded-full top-0 right-0"></span>
                                                            :'')
                                                    }
                                                </p>
                                                <p className={role ==='4' && chat.messages.Status === 'Unread' &&  chat.messages.type === 'Office'?`text-gray-500 font-bold text-sm p-1 truncate `
                                                    :(role in ['0', '1', '2','3'] && chat.messages.Status === 'Unread' &&  chat.messages.type === 'Mwaten' ?`text-gray-500 font-bold text-sm p-1 truncate `
                                                        :`text-gray-500 font-thin text-sm p-1 truncate`)}>

                                                    {chat.messages.Message}</p>
                                            </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            }

                            <div className="flex col-span-3 items-center justify-center h-auto tall:h-96">
                                <div className="m-2 w-4/5  border flex flex-col rounded-t-xl h-full">
                                    <header className="w-full bg-primary-500 flex  justify-between px-2 py-1 rounded-t-lg items-center relative mb-10">
                                        <h2 className="text-sm font-semibold flex items-center absolute tall2:text-2xl tall3:text-4xl">
                                            {title}
                                        </h2>
                                    </header>
                                    <div className="flex flex-col  gap-4 p-2 select-none overflow-y-auto">

                                        {messages.length>0 ?
                                            (<>
                                                {
                                                    messages.map((message, index) => (
                                                        (howSend === message.type) ?
                                                        (<div className={`flex items-end flex-row`}  key={index}>
                                                            <p className={`mx-2 p-2 rounded-2xl bg-gray-200 leading-4 text-sm border-2 border-sky-500 basis-1/2`} >{message.Message}</p>
                                                        </div>)
                                                        :
                                                        (<div className={`flex items-end flex-row-reverse`} key={index}>
                                                            <p className={`mx-2 p-2 rounded-2xl  leading-4 text-sm bg-sky-500 basis-1/2`} >{message.Message}</p>
                                                        </div>)
                                                    ))
                                                }<div ref={messagesEndRef} />
                                            </>)
                                            :
                                            ("")
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex col-span-3 items-center justify-center h-12">
                                {chats[indexchat]  ? (chats[indexchat]?.Status !== 'Active' ? <p className="font-bold text-sm p-1 truncate">الرسالة مغلقة</p>
                                    : (messages.length > 0 ? (
                                        <div className="flex w-4/5 my-2 mx-1">
                                            <textarea id="message" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        name="message" value={value.message} onChange={handleChange} placeholder="Your message..." />
                                            <button className="flex justify-center items-center aspect-square h-9 hover:animate-pulse p-2 rounded-full cursor-pointer"
                                                onClick={send_message} type="submit" >  <SendIcon /> </button>
                                            {role !== "4" &&
                                                <button type="submit" className="flex justify-center items-center aspect-square h-9 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:animate-bounce"
                                                        onClick={() => handlestop()} > <CheckCircleOutlineIcon /> </button>
                                            }
                                        </div>
                                    ): "")
                                    ): ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { newMessage && <NewMessage setOpenModal={handleCloseNewMessage} />}
        </div>
        </>
    )
}
export default Chats