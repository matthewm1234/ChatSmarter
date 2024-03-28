import { View, TextInput, TouchableOpacity, Alert, Keyboard, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessagesList from '../../components/MessagesList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView'
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../util/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';


export default function ChatRoom() {
    const item = useLocalSearchParams();
    const { user } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<any[]>([]);
    const textRef = useRef('')
    const inputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        createRoomIfNotExist();
        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data()
            });
            setMessages([...allMessages]);
        })
        const KeyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )
        return () => {
            unsub();
            KeyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        updateScrollView();
    }, [messages])

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true })
        }, 100)
    }

    const createRoomIfNotExist = async () => {
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSendtMessage = async () => {
        let message = textRef.current.trim();
        if (!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, "messages");
            textRef.current = "";
            if (inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            })
            console.log("new message id: ", newDoc.id);
        } catch (err: any) {
            Alert.alert('Message', err.message)
        }
    }

    return (
        <CustomKeyboardView inChat={true}>
            <View className='flex-1 bg-white'>
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View className='h-3 border-b border-neutral-300'></View>
                <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                    <View className='flex-1'>
                        <MessagesList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
                    </View>
                    <View style={{ marginBottom: hp(1.7) }} className='pt-2'>
                        <View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'>
                            <TextInput
                                ref={inputRef}
                                placeholder='Enter your message'
                                style={{ fontSize: hp(2) }}
                                className='flex-1 mr-2'
                                onChangeText={value => textRef.current = value}
                            />
                            <TouchableOpacity onPress={handleSendtMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                                <Feather name='send' size={hp(2.7)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}