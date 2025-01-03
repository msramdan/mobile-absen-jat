import { FlatList, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from "../../components/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../../utils/Axios";
import { Redirect } from "../../utils/Redirect";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import moment from 'moment';


export default function RangkingPointsScreen() {

    const [refresh, setRefersh] = useState(false)
    const [loadingRankingPoint, setLoadingRankingPoint] = useState(true)
    const [arrRankingPoint, setArrRankingPoint] = useState({})

    useEffect(() => {
        loadArrRankingPoint()
    }, [])

    const loadArrRankingPoint = async (apiSourceUrl = null) => {
        setLoadingRankingPoint(true)
        const token = await AsyncStorage.getItem('apiToken')

        Axios.get(apiSourceUrl ? apiSourceUrl : '/attendances/rank-point', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            if (res) {
                if (arrRankingPoint.data && apiSourceUrl) {
                    const dataRankingPoint = [...arrRankingPoint.data]
                    dataRankingPoint.push.apply(dataRankingPoint, res.data.data.data)
                    res.data.data.data = dataRankingPoint
                }
                setArrRankingPoint(res.data.data)
            }
        }).catch((err) => {
            if (err.response.status == 401) {
                Redirect.toLoginScreen(navigation)
            }
        }).finally(() => {
            setLoadingRankingPoint(false)
        })
    }


    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => {
                        setRefersh(true)
                        loadArrRankingPoint()
                        setRefersh(false)
                    }}
                />}
            style={{ padding: 15 }}
        >
            <View >
                <View style={[styles.postContainer, { marginBottom: 10 }]}>
                    <MaterialCommunityIcons
                        name="chart-bar"
                        style={styles.postIcon}
                        size={20}
                    />
                    <Text style={styles.postText}>PRIODE {currentYear}</Text>
                </View>

                {
                    loadingRankingPoint ?
                        <Loading /> :
                        <>
                            <View
                                style={styles.cardListTable}
                            >
                                <View
                                    style={styles.listTableThead}
                                >
                                    <Text style={[{ flex: 0.7 }, styles.listTableTheadTD]}></Text>
                                    <Text style={[{ flex: 1.3 }, styles.listTableTheadTD]}>Rank</Text>
                                    <Text style={[{ flex: 6 }, styles.listTableTheadTD]}>Employee Name</Text>
                                    <Text style={[{ flex: 3 }, styles.listTableTheadTD]}>Points</Text>
                                </View>
                                {
                                    <FlatList
                                        data={arrRankingPoint.data}
                                        renderItem={({ item, index, separators }) => (
                                            <View
                                                key={index}
                                                style={styles.listTableTbody}
                                            >
                                                {/* Determine trophy icon and color based on index */}
                                                {index === 0 ? (
                                                    <MaterialCommunityIcons
                                                        name="trophy"
                                                        style={[styles.postIcon, { color: 'gold' }]}
                                                        size={20}
                                                    />
                                                ) : index === 1 ? (
                                                    <MaterialCommunityIcons
                                                        name="trophy"
                                                        style={[styles.postIcon, { color: 'silver' }]}
                                                        size={20}
                                                    />
                                                ) : index === 2 ? (
                                                    <MaterialCommunityIcons
                                                        name="trophy"
                                                        style={[styles.postIcon, { color: 'bronze' }]}
                                                        size={20}
                                                    />
                                                ) : (
                                                    <View style={[styles.postIcon, { width: 20 }]} />
                                                )}

                                                <Text style={{ flex: 1.3 }}>{index + 1}</Text>
                                                <Text style={{ flex: 6 }}>{item.full_name}</Text>
                                                <Text style={{ flex: 3 }}>{item.total_point}</Text>
                                            </View>
                                        )}
                                        keyExtractor={item => item.id}
                                        scrollEnabled={false}
                                    />
                                }
                            </View>

                            {
                                arrRankingPoint.next_page_url ?
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                const splittedUrl = arrRankingPoint.next_page_url.split('/api/mobile')
                                                loadArrRankingPoint(splittedUrl[splittedUrl.length - 1])
                                            }}
                                            style={{
                                                backgroundColor: '#3498db',
                                                alignSelf: 'center',
                                                paddingVertical: 7,
                                                paddingHorizontal: 20,
                                                borderRadius: 7,
                                                marginTop: 15
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white'
                                                }}
                                            >Show More</Text>
                                        </TouchableOpacity>
                                    </View> : <></>
                            }


                        </>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
    postIcon: {
        marginRight: 5,
        color: '#333333',
    },
    cardListTable: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1
    },
    listTableThead: {
        flexDirection: 'row',
        marginBottom: 6,
        gap: 6,
        alignItems: 'center'
    },
    listTableTheadTD: {
        fontWeight: '600', color: '#444'
    },
    listTableTbody: {
        flexDirection: 'row',
        marginBottom: 5,
        gap: 6,
        alignItems: 'center'
    },
    postText: {
        color: '#333333',
        fontWeight: 'bold',
    },
    tableDataLabelStatus: {
        alignSelf: 'flex-start',
        color: 'white',
        fontWeight: '500',
        paddingVertical: 2,
        paddingHorizontal: 5,
        fontSize: 12,
        borderRadius: 3
    },
    buttonPreviewFileModal: {
        backgroundColor: '#0ea5e9',
        width: 100,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    buttonListTableViewMore: {
        backgroundColor: '#3498db',
        alignSelf: 'center',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 7,
        marginTop: 15
    },
    buttonTextPreviewFileModal: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#FFF'
    },
    buttonTableDataDetailText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
        paddingRight: 3
    },
    buttonTableDataDetailInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    buttonTableDataDetail: {
        backgroundColor: '#3b82f6',
        paddingVertical: 2,
        paddingHorizontal: 5,
        alignSelf: 'flex-start',
        borderRadius: 3
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    filterWrapper: {
        flexDirection: 'row',
        gap: 10
    },
    filterButtonWrapper: {
        justifyContent: 'flex-end'
    },
    filterButton: {
        marginBottom: 10,
        backgroundColor: '#1f2937',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    }
})