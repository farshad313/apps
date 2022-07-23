import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { HomeList } from '../../reducers/homeReducer'
export interface HomeListProps {
    data: HomeList,
}
const index = ({ data }: HomeListProps) => {
    useEffect(() => {
    }, [])
    const renderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <Text>{item.content}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={index => index.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

export default React.memo(index)

const styles = StyleSheet.create({
    container: {
        padding:20
    }
})
