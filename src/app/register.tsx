import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Feather, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Loading from '../components/Loading'
import CustomKeyboardView from '../components/CustomKeyboardView'
import { useAuth } from '../context/authContext'

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign Up', 'Please Fill all the fields!')
      return;
    }
    setLoading(true);
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current);
    setLoading(false);
    console.log("got result: ", response)
    if (!response.success) {
      Alert.alert('Sign Up', response.msg)
    }

  }
  return (
    <CustomKeyboardView inChat={false}>
      <StatusBar style='dark' />
      <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View className="items-center">
          <Image style={{ height: hp(20) }} resizeMode='contain' source={require("../../assets/images/tempicon.png")} />
        </View>

        <View className='gap-10'>
          <Text style={{ fontSize: hp(4) }} className='font-bold tracking-wider text-center text-neutral-800'>Sign Up</Text>
          <View className='gap-4'>
            <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'>
              <Feather name='user' size={hp(2.7)} color='gray' />
              <TextInput
                style={{ fontSize: hp(2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Username'
                placeholderTextColor={'gray'}
                onChangeText={value => usernameRef.current = value}
              />
            </View>
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
            <View>
              {
                loading ? (
                  <View className='flex-row justify-center'>
                    <Loading size={hp(6.5)} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleRegister} style={{ height: hp(6.5), backgroundColor: "#006D7cff" }} className='rounded-xl justify-center items-center'>
                    <Text style={{ fontSize: hp(2.7) }} className='text-white font-bold tracking-wider'>
                      Sign Up
                    </Text>
                  </TouchableOpacity>)
              }
            </View>

            <View className='flex-row justify-center'>
              <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Already have an account? </Text>
              <Pressable onPress={() => router.push('/logIn')}>
                <Text style={{ fontSize: hp(1.8), color: "#006D7cff" }} className='font-semibold'>Sign In</Text>
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.7) }} className='font-semibold text-neutral-300'>N/A: This app was created as a solution to FarmSmarter test question. The logo dosn't depict any organisation</Text>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}