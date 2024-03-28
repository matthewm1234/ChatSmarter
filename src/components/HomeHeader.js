import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserAvatar from 'react-native-user-avatar';
import { useAuth } from '../context/authContext';
import { AntDesign, Feather } from '@expo/vector-icons';

const ios = Platform.OS == 'ios';
export default function HomeHeader() {
    const { top } = useSafeAreaInsets();
    const { user, logout } = useAuth();

    const handleProfile = () => {

    }
    const handleLogout = async () => {
        await logout()
    }

    return (
        <View style={{ paddingTop: ios ? top : top + 10, backgroundColor: "#006D7cff" }} className='flex-row justify-between px-5 pb-6 rounded-b-3xl shadow'>
            <View>
                <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>Chats</Text>
            </View>
            <View className='flex-row justify-center items-center gap-5'>
                <AntDesign name='logout' size={hp(2.5)} color="#ffffff" onPress={handleLogout} />
                <UserAvatar size={hp(4.3)} bgColor='#A020F0' name={user?.username || ""} />
            </View>
        </View>
    )
}

const Divider = () => {
    return (
        <View className='p-[1px] w-full bg-neutral-200' />
    )
}