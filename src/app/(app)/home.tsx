import { View, Text, Button, Pressable, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading'
import { StatusBar } from 'expo-status-bar';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../../firebaseConfig';


export default function Home() {
    const { logout, user } = useAuth();
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        if (user?.uid)
            getUsers();
    }, [])

    const getUsers = async () => {
        console.log("got to get users")
        const q = query(usersRef, where("userId", '!=', user?.uid));
        const querySnapshot = await getDocs(q);
        let data: any[] = []
        querySnapshot.forEach(doc => {
            data.push({ ...doc.data() })
        })
        setUsers(data)
    }

    return (
        <ImageBackground
            style={{ flex: 1, width: '100%', height: '100%' }}
            source={require("../../../assets/images/background.png")}>
            <View style={{ backgroundColor: "#ffffffe8" }} className='flex-1 bg-white'>
                <StatusBar style='light' />
                {
                    users.length > 0 ? (
                        <ChatList currentUser={user} users={users} />
                    ) : (
                        <View className='flex items-center' style={{ top: hp(30) }}>
                            <ActivityIndicator size="large" />
                            {/* <Loading size={hp(10)} /> */}
                        </View>
                    )
                }
            </View >
        </ImageBackground>
    )
}