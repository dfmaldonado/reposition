import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import ThemedButton from '@/components/ThemedButton'
import { router } from 'expo-router'
import { useHistoryStore } from '@/hooks/useStore'

const details = () => {
  const {
    selectedId,
    selectedOperation,
    selectedResult,
    selectedDate
  } = useHistoryStore()

  const dateStr = selectedDate ? selectedDate.slice(0, 10) : 'Fecha desconocida';

  return (
    <SafeAreaView className='mx-6 flex-1 bg-white dark:bg-[#222222]'>
      <ThemedText className='text-[32px] mb-3 mt-4 font-bold' lightColor='#222222' darkColor='#FAF7F0'>Detalles</ThemedText>
      <ThemedView className='h-[2px] w-full mb-6 bg-gray-200 dark:bg-gray-700'></ThemedView>

      <View className='mb-6'>
        <ThemedText className='text-[18px] opacity-70 mb-1'>ID de Operación</ThemedText>
        <ThemedText className='text-[24px] font-semibold'>{selectedId}</ThemedText>
      </View>

      <View className='mb-6'>
        <ThemedText className='text-[18px] opacity-70 mb-1'>Fecha</ThemedText>
        <ThemedText className='text-[24px] font-semibold'>{dateStr}</ThemedText>
      </View>

      <ThemedView className='h-[2px] w-full mb-6 bg-gray-200 dark:bg-gray-700'></ThemedView>

      <View className='mb-2'>
        <ThemedText className='text-[20px] mb-2 font-bold'>Operación (RPN)</ThemedText>
        <View className='bg-gray-100 dark:bg-[#333] p-4 rounded-xl'>
            <ThemedText className='text-[24px] text-right font-mono'>{selectedOperation}</ThemedText>
        </View>
      </View>

      <View className='mt-4 mb-8'>
        <ThemedText className='text-[20px] mb-2 font-bold'>Resultado</ThemedText>
        <View className='bg-green-100 dark:bg-green-900/30 p-4 rounded-xl border border-green-500'>
             <ThemedText className='text-[32px] text-right font-bold text-green-700 dark:text-green-400'>{selectedResult}</ThemedText>
        </View>
      </View>

      <View className='flex-1 justify-end mb-4'>
        <ThemedButton className='rounded-xl h-[56px] flex flex-row items-center justify-center'
            lightColor='#DDDDDD'
            darkColor='#333333'
            onPress={() => router.back()}
            >
            <ThemedText className='text-[20px] font-semibold'>Regresar</ThemedText>
        </ThemedButton>
      </View>
    </SafeAreaView>
  )
}

export default details