import { View, Text, SafeAreaView, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import FormFields from "../../components/FormFields";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

// import * as SecureStore from 'expo-secure-store';
import {resetPassword } from "../../Appwrite/forgetPassword";

import { useEmail } from "../../context/EmailContext";







const SetNewPassword = () => {
  const [loading, setLoading] = useState(false);
  const { getEmail } = useEmail(); // Get email from context  
  
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  // console.log(form.email);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleNewPassword = async () => {
    console.log("Local store Email is: ",getEmail)
    
      try{
        setLoading(true);
        const resetPass =  await resetPassword(getEmail, form.password);
        if(resetPass.success){
          console.log("Password reset successfully")
          setSuccessMsg(true);
          return;
        }
        else if(!resetPass.success){
          console.log("Error", resetPass.message); 
          
          Alert.alert("Error", resetPass.message);
        }
          
          
      }
      catch(error){
        console.log("catch error", error);

        Alert.alert("Error", resetPass.message);
      }
      finally{
        setLoading(false);
      }
      
    

  }

  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className={`w-full px-6 min-h-[75vh] items-start justify-center ${successMsg ? "hidden" : "block"} `}>
          <Text className="font-psemibold text-blue-Default text-[20px]">
            Set a new password
          </Text>
          <Text className="font-pregular text-gary-Default">
            Create a new password. Ensure it differs from previous ones for
            security
          </Text>
          <FormFields
            title="Password"
            placeholder="Enter your new password"
            secureTextEntry={true}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
          />
          {/* confirm password field */}
          <FormFields
            title="confirm password"
            placeholder="Re-enter password"
            secureTextEntry={true}
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyle="mt-7"
          />

          <CustomButton
            handlePress={handleNewPassword }
            title={loading ? (
                          <ActivityIndicator size="small" color="#fff" />)
                          : ("update password")}
            textStyles="text-center text-white text-[14px] font-psemibold "
            container="mt-7 w-full h-12 rounded-[4px] bg-[#0166FC]"
            isLoading={
              (!form.password || !form.confirmPassword || form.password !== form.confirmPassword)
                ? true
                : false
            }
          />
        </View>


        {/* successful Message */}

        <View className={` justify-center items-center min-h-[70vh]  px-8 ${successMsg ? "block" : "hidden"} `}>
          <Text className="text-center font-psemibold text-blue-Default text-2xl mb-4" >
            Successful
          </Text>
          <LottieView
            source={require("../../assets/animation/checkmarkCircle.json")} // Add your JSON file
            autoPlay
            loop={false} // Play animation only once
            style={{ width: 80, height: 80 }}
          />
          <Text className="font-pregular text-gary-Default text-[16px] text-center mt-4">
            Congratulations! Your password has
            been changed. Click continue to login
          </Text>
          <CustomButton
            handlePress={() => { router.push("/login") }}
            title="continue"
            textStyles="text-center text-white text-[14px] font-psemibold "
            container="mt-7 w-full h-12 rounded-[4px] bg-[#0166FC]"
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetNewPassword;
