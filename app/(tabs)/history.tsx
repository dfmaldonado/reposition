import { View, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import ThemedButton from '@/components/ThemedButton'
import { router } from 'expo-router'
import useHistory from '@/hooks/useHistory'
import { useHistoryStore, OperationItem } from '@/hooks/useStore' // Importa OperationItem si quieres tipado estricto

const HistoryScreen = () => { 
    const { data } = useHistory()
    
    // CORRECCIÓN AQUÍ: Usamos los nombres nuevos del store (con "Selected")
    const { 
        setSelectedId, 
        setSelectedOperation, 
        setSelectedResult, 
        setSelectedDate 
    } = useHistoryStore()

    const renderItem = ({ item }: { item: OperationItem }) => (
        <ThemedButton 
            className='flex flex-row justify-between px-4 h-[90px] rounded-xl mb-4' 
            lightColor='#E0E0E0' 
            darkColor='#2B2B2B'
            onPress={() => {
                // CORRECCIÓN AQUÍ: Usamos las funciones nuevas
                setSelectedId(item.id)
                setSelectedOperation(item.operation)
                setSelectedResult(item.result)
                setSelectedDate(item.date)
                
                router.push('/details')
            }}
        >
            <View className='flex flex-col justify-center items-center'>
                <ThemedText className='text-lg font-bold' lightColor='#555' darkColor='#aaa'>ID</ThemedText>
                {/* Aseguramos que id sea string o se muestre bien */}
                <ThemedText className='text-2xl font-bold' darkColor='#FAF7F0' lightColor='#222222'>
                    {item.id.toString().slice(-4)} {/* Truco: Muestra solo los ultimos 4 digitos si es muy largo */}
                </ThemedText>
            </View>
            <View className='flex flex-col justify-center items-center'>
                <ThemedText className='text-lg font-bold' lightColor='#555' darkColor='#aaa'>Resultado</ThemedText>
                <ThemedText className='text-2xl font-bold' darkColor='#FAF7F0' lightColor='#222222'>{item.result}</ThemedText>
            </View>
        </ThemedButton>
    )

    return (
        <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}> 
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                
                contentContainerStyle={{ 
                    paddingHorizontal: 24, 
                    paddingBottom: 100,   
                    paddingTop: 10
                }}
                ListHeaderComponent={() => (
                    <View>
                        <ThemedText className='text-[32px] mb-3' lightColor='#222222' darkColor='#FAF7F0'>
                            Historial
                        </ThemedText>
                        <ThemedView className='h-1 w-full mb-6' />
                    </View>
                )}

                ListEmptyComponent={() => (
                    <View className="items-center justify-center mt-10">
                        <ThemedText className='text-xl text-center' darkColor='#888' lightColor='#666'>
                            No hay datos para mostrar
                        </ThemedText>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default HistoryScreen