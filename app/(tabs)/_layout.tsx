import { View, Text, useColorScheme, Platform } from 'react-native' // Agregué Platform
import { Calculator, History } from 'lucide-react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Colors } from '@/constants/Colors'

const _layout = () => {
  const colorScheme = useColorScheme()
  const theme = colorScheme ?? 'light'

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarInactiveTintColor: Colors[theme].tabIconDefault, 
        headerShown: false,
        tabBarShowLabel: true,
        
        // ESTILO FLOTANTE
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
          position: 'absolute', 
          bottom: 20,
          left: 20,  
          right: 20,  
          height: 70, 
          borderRadius: 25, 
          borderTopWidth: 0,
          
          elevation: 5, 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 5,
        },
        
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 5,
        }
      }}
    >
      <Tabs.Screen 
        name='index'
        options={{
          title: "Calculadora",
          tabBarIcon: ({color, size}) => (
            <Calculator size={size || 24} color={color}/>
          )
        }}
      />
      <Tabs.Screen 
        name='history'
        options={{
          title: "Historial",
          tabBarIcon: ({color, size}) => (
            <History size={size || 24} color={color}/>
          )
        }}
      /> 
    </Tabs>
  )
}

export default _layout