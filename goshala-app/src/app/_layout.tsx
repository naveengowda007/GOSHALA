import {  Redirect, Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  // useEffect(()=>{
  //   setTimeout(() => {
  //     SplashScreen.hideAsync();
  //   }, 2000);
  // },[])
  return(
    <>
    <Stack screenOptions={{headerShown:false}}/>
    <Redirect href={'/(auth)'}/>
    </>
  );
}
