import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Loading from '../components/Loading'
import CustomKeyboardView from '../components/CustomKeyboardView'
import { useAuth } from '../context/authContext'

export default function LogIn() {
    const router = useRouter();
    const { login } = useAuth()
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', 'Please Fill all the fields!')
            return;
        }
        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current)
        setLoading(false);
        if (!response.success) {
            Alert.alert("Sign In", response.msg)
        }
    }
    return (
        <CustomKeyboardView inChat={false}>
            <StatusBar style='dark' />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                <View className="items-center">
                    <Image style={{ height: hp(20) }} resizeMode='contain' source={require("../../assets/images/tempicon.png")} />
                </View>

                <View className='gap-10'>
                    <Text style={{ fontSize: hp(4) }} className='font-bold tracking-wider text-center text-neutral-800'>Sign In</Text>

                    <View className='gap-4'>
                        <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'>
                            <Octicons name='mail' size={hp(2.7)} color='gray' />
                            <TextInput
                                style={{ fontSize: hp(2) }}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                                onChangeText={value => emailRef.current = value}
                            />
                        </View>
                        <View className='gap-3'>
                            <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'>
                                <Octicons name='lock' size={hp(2.7)} color='gray' />
                                <TextInput
                                    style={{ fontSize: hp(2) }}
                                    className='flex-1 font-semibold text-neutral-700'
                                    placeholder='Password'
                                    placeholderTextColor={'gray'}
                                    onChangeText={value => passwordRef.current = value}
                                    secureTextEntry
                                />
                            </View>
                            <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-right text-neutral-500'>Forgot Password?</Text>
                        </View>
                        <View>
                            {
                                loading ? (
                                    <View className='flex-row justify-center'>
                                        <Loading size={hp(6.5)} />
                                    </View>
                                ) : (
                                    <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.5), backgroundColor: "#006D7cff" }} className='rounded-xl justify-center items-center'>
                                        <Text style={{ fontSize: hp(2.7) }} className='text-white font-bold tracking-wider'>
                                            Sign In
                                        </Text>
                                    </TouchableOpacity>)
                            }
                        </View>

                        <View className='flex-row justify-center'>
                            <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Don't have an account? </Text>
                            <Pressable onPress={() => router.push('/register')}>
                                <Text style={{ fontSize: hp(1.8), color: "#006D7cff" }} className='font-semibold'>Sign Up</Text>
                            </Pressable>
                        </View>
                        <Text style={{ fontSize: hp(1.7) }} className='font-semibold text-neutral-300'>N/A: This app was created as a solution to FarmSmarter test question. The logo dosn't depict any organisation</Text>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}