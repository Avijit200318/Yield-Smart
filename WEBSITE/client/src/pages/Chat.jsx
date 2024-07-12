import React, { useEffect, useRef, useState } from 'react'
import { VscSend } from "react-icons/vsc";
import { MdOutlineAttachFile } from "react-icons/md";

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { addDoc, collection, getFirestore, serverTimestamp, doc, updateDoc, arrayUnion, getDoc, setDoc, query, orderBy } from "firebase/firestore";

import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { useDispatch } from 'react-redux';
import { conversationIdFailure, conversationIdSuccess } from '../redux/conversationId/conversationSlice';
import LoadingGif from "../../public/images/loading2.gif";
import ShowMessage from '../components/ShowMessage';

export default function Chat() {

    const [inputMessage, setInputMessage] = useState('');
    const [chatData, setChatData] = useState({
        input: '',
        image: '',
        output: ''
    });
    const fileRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageUpload, setImageUpload] = useState(0);
    const [imageUploadError, setImageUploadError] = useState(null);
    // console.log(imageUrl);
    const { currentUser } = useSelector((state) => state.user);
    const { currentConversationId } = useSelector((state) => state.conversation)
    const [conversationId, setConversationId] = useState(currentConversationId);
    const [conversationData, setConversationData] = useState(null);
    const [messageLoading, setMessageLoading] = useState(false);
    const [allChat, setAllChat] = useState(null);
    console.log("allChat: ", allChat);
    // console.log("conversationid: ", conversationId);
    // console.log("currentConversation: ", currentConversationId);

    const divRef = useRef(null);
    const dispatch = useDispatch();
    const db = getFirestore(app);

    useEffect(() => {
        if (imageFile) {
            handleImageUpload(imageFile);
        }
    }, [imageFile]);

    const handleImageUpload = async (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUpload(Math.round(progress));
        },
            (error) => {
                setImageUploadError(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImageUrl(downloadUrl);
                });
            },
        );
    };

    const handleSend = async () => {
        if (!currentUser) return;

        try {
            setMessageLoading(true);
            dispatch(conversationIdSuccess(conversationId));
            const userDocRef = doc(db, 'users', currentUser._id);
            const userDoc = await getDoc(userDocRef);

            const textMessage = {
                input: inputMessage,
                output: '',
                file: imageUrl,
            };

            if (userDoc.exists()) {
                const userData = userDoc.data();
                let conversationDocRef;

                if (userData.conversations && userData.conversations.includes(conversationId)) {
                    conversationDocRef = doc(db, 'conversations', conversationId);
                    await updateDoc(conversationDocRef, {
                        texts: arrayUnion(textMessage),
                    });
                } else {
                    conversationDocRef = doc(db, 'conversations', conversationId);
                    await setDoc(conversationDocRef, {
                        conversation_name: "default_conversation",
                        texts: [textMessage],
                        timestamp: serverTimestamp(),
                    });

                    await updateDoc(userDocRef, {
                        conversations: arrayUnion(conversationId),
                    });
                }
            } else {
                const conversationDocRef = doc(db, 'conversations', conversationId);
                await setDoc(conversationDocRef, {
                    conversation_name: "default_conversation",
                    texts: [textMessage],
                    timestamp: serverTimestamp(),
                });

                await setDoc(userDocRef, {
                    name: currentUser.username,
                    uid: currentUser._id,
                    conversations: [conversationId],
                    timestamp: serverTimestamp(),
                });
            }

            setInputMessage('');
            setImageFile(null);
            setMessageLoading(false);
            console.log("done");
        } catch (error) {
            console.log(error);
            setMessageLoading(false);
            dispatch(conversationIdFailure(error));
        }
    };

    useEffect(() => {
        const handleConversationId = () => {
            if (conversationId === null) {
                try {
                    const uniqId = uuidv4();
                    console.log("id is given");
                    setConversationId(uniqId);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        handleConversationId();
    }, []);

    useEffect(() => {
        const fetchPrevConversation = async () => {
            if (!currentUser) return;
            try {
                const userDocRef = doc(db, 'users', currentUser._id);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (!conversationData || conversationData.length !== userData.conversations.length) {
                        const reversedConversations = userData.conversations.slice().reverse();
                        setConversationData(reversedConversations);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchPrevConversation();
    }, [handleSend]);

    const handleChangeConversationId = (Id) => {
        try {
            dispatch(conversationIdSuccess(Id));
            setConversationId(Id);
        } catch (error) {
            console.log(error);
            dispatch(conversationIdFailure(error));
        }
    };

    const createNewChat = () => {
        try {
            const uniqId = uuidv4();
            console.log("chat id is given");
            setConversationId(uniqId);
            dispatch(conversationIdSuccess(uniqId));
        } catch (error) {
            console.log(error);
            dispatch(conversationIdFailure(error));
        }
    }

    useEffect(() => {
        const fetchConversationMessage = async () => {
            if (!currentConversationId) return;
            try {
                const messageDocRef = doc(db, 'conversations', conversationId);
                const messageDoc = await getDoc(messageDocRef);
                if (messageDoc.exists()) {
                    const messageData = messageDoc.data();
                    setAllChat(messageData.texts);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchConversationMessage();
    }, [conversationId]);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [allChat]);

    return (
        <div className='w-full h-[91vh]'>
            <div className="flex w-full h-[91vh]">
                <div className="sideLeft w-[15%] h-full py-3 flex items-center flex-col overflow-y-auto border-r-4 border-gray-300">
                    <button onClick={createNewChat} className="px-4 py-2 bg-blue-500 text-white rounded-md w-[90%] h-10">New Chat</button>
                    <div className="w-full flex flex-col items-center gap-3 my-4 scrollbar-custom">
                        <h3 className="w-[90%] px-1 font-semibold mt-2 text-gray-600 text-sm">All Chats</h3>
                        {(conversationData && !conversationData.includes(conversationId)) &&
                            <div className="w-[90%] h-10 border bg-white rounded-lg overflow-hidden">
                                <button onClick={() => handleChangeConversationId(conversationId)} className={`truncate px-4 py-2 w-full transition-all duration-300 bg-blue-100`}>{conversationId}</button>
                            </div>}
                        {conversationData && (
                            conversationData.map((ele) => (
                                <div key={ele} className="w-[90%] h-10 border bg-white rounded-lg overflow-hidden">
                                    <button onClick={() => handleChangeConversationId(ele)} className={`truncate px-4 py-2 w-full transition-all duration-300 hover:bg-blue-100 ${ele === conversationId ? 'bg-blue-100' : ''}`}>{ele}</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="sideRight w-[85%] h-full">
                    <div ref={divRef} className="body w-full h-[85%] px-28 py-4 overflow-y-auto scrollbar-custom">
                        {allChat && allChat.map((chat, index) =>
                            <ShowMessage key={index} data={chat} />
                        )}
                    </div>
                    <div className="footer w-full h-[15%] border-t-4 border-gray-200 flex flex-col items-center">
                        <div className="w-full h-6 overflow-hidden flex items-center">
                            {imageUploadError && (
                                <p className="text-red-600 font-semibold px-8">Image upload error(uploaded image size should be less than 2MB)</p>
                            )}
                            {(imageUpload > 0 && imageUpload < 100) && (
                                <p className="text-green-400 font-semibold px-8">{`File uploaded ${imageUpload}%`}</p>
                            )}
                            {(!imageUploadError && imageUpload === 100) && (
                                <p className="text-green-400 font-semibold px-8">File uploaded successfully</p>
                            )}
                        </div>
                        <div className="flex bg-white w-full px-6 gap-3">
                            <input ref={fileRef} onChange={(e) => setImageFile(e.target.files[0])} type="file" hidden accept='image/*' />
                            <input disabled={messageLoading} onChange={(e) => setInputMessage(e.target.value)} placeholder='Ask some thing?' className='px-4 py-2 rounded-md outline-none border border-black w-[88%]' value={inputMessage}></input>
                            <button disabled={messageLoading} onClick={() => fileRef.current.click()} className="p-3 transition-all duration-300 hover:bg-gray-300 rounded-full"><MdOutlineAttachFile className='text-2xl' /></button>
                            <button disabled={messageLoading || inputMessage == ''} onClick={handleSend} className="px-4 w-16 py-2 rounded-md bg-blue-500 text-white flex justify-center items-center disabled:bg-blue-400"><VscSend className='text-2xl' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}