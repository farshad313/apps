import React, { useEffect, useRef, useState } from 'react'
import {
    Animated, NativeScrollEvent,
    NativeSyntheticEvent, RefreshControl,
    SafeAreaView, ScrollView, StyleSheet,
    Text, View, KeyboardAvoidingView
} from 'react-native'
import { useDispatch } from 'react-redux'
import { FetchPostListSuccess, LoadMorePostListRequest } from '../../actions/homeActions'
import ListItems from '../../components/ListItems'
import { SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from '../../constants'
import { useSelector } from '../../reducers'



export const Home = () => {
    const dispatch = useDispatch()
    const homeList = useSelector(state => state.home)
    const _loadingDeg = new Animated.Value(0)
    const _scrollRef = useRef<ScrollView>(null)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const ref = useRef<{
        scrollHeight: number,
        preOffsetY: number,
        currentCommentId: number,
        commentContents: {
            id: number, content: string
        }[]
    }>({
        scrollHeight: 0, preOffsetY: 0,
        commentContents: [], currentCommentId: 0
    })
    const [refreshing, setRefreshing] = useState<boolean>(false)

//_-----------------------------_useEffects
    useEffect(() => {
        (async () => {
            setRefreshing(true)
            await dispatch(FetchPostListSuccess())
            setRefreshing(false)
        })()
    }, [])

//_-----------------------------------------------_
    const _onRefresh = async () => {
        setRefreshing(true)
        await dispatch(FetchPostListSuccess())
        setRefreshing(false)
    }


//_---------------------------------------------_
    const _onScroll = ({ nativeEvent: {
        contentOffset: { y }, contentSize: { height }
    } }: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (y / height > 0.45
            && y > ref.current.preOffsetY
            && !loadingMore && !refreshing
        ) {
            (async () => {
                setLoadingMore(true)
                await dispatch(LoadMorePostListRequest())
                setLoadingMore(false)
            })()
        }
        ref.current.preOffsetY = y
    }


    const _startAnimateLoading = () => {
        Animated.timing(_loadingDeg, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start(() => {
            _loadingDeg.setValue(0)
            _startAnimateLoading()
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingViewContainer} behavior="height">
                <ScrollView
                    keyboardDismissMode="on-drag"
                    ref={_scrollRef}
                    style={{
                        height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44 
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                    scrollEventThrottle={10}
                    onScroll={_onScroll}
                    showsVerticalScrollIndicator={false}
                >
                    <ListItems  data={homeList} />
                    <View style={{
                        ...styles.loadingIcon,
                        opacity: loadingMore ? 1 : 0
                    }}>
                        {loadingMore && <>
                            {/* <Animated.Image
                                onLayout={_startAnimateLoading}
                                style={{
                                    width: 30,
                                    height: 30,
                                    transform: [
                                        {
                                            rotate: _loadingDeg.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '360deg']
                                            })
                                        }
                                    ]
                                }}
                                source={require('../../assets/icons/waiting.png')} /> */}
                            <Text style={{
                                fontWeight: '500',
                                marginLeft: 5,
                                marginBottom:15
                            }}>Loading more...</Text></>}
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    keyboardAvoidingViewContainer: {
        position: "relative"
    },
    scrollContainer: {

    },
    loadingIcon: {
        position: 'relative',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
