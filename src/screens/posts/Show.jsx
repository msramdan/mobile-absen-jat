import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    Linking,
} from 'react-native';

import React, { useState, useEffect } from 'react';

//import material icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//import render html
import RenderHtml from 'react-native-render-html';

//import momen js
import moment from 'moment';


//import component loading
import Loading from '../../components/Loading';
import Axios from '../../utils/Axios';
import { Redirect } from '../../utils/Redirect';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostsShowScreen({ route }) {
    //destruct slug
    const { id, navigation } = route.params;

    //destruct width dimension
    const { width } = useWindowDimensions();

    //init state loading
    const [loadingPost, setLoadingPost] = useState(true);

    //init state
    const [post, setPost] = useState({});

    //method fetchDetailPost
    const fetchDetailPost = async () => {
        //set loading true
        const token = await AsyncStorage.getItem('apiToken')
        setLoadingPost(true);

        await Axios.get(`/news/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            //assign data to state
            setPost(response.data.data);

            //set loading false
            setLoadingPost(false);
        }).catch((err) => {
            if (err.response.status == 401) {
                Redirect.toLoginScreen(navigation)
            }
        });
    };

    //hook useEffect
    useEffect(() => {
        //call method "fetchDetailPost"
        fetchDetailPost();
    }, []);


    return (
        <SafeAreaView>
            <ScrollView style={{ padding: 15 }}>
                {loadingPost ? (
                    <Loading />
                ) : (
                    <View>
                        <Text style={styles.title}>{post.title}</Text>
                        <View style={styles.containerUserAndDate}>
                            <View style={styles.containerUser}>
                                <MaterialIcons
                                    name="person"
                                    style={styles.iconUser}
                                    size={18}
                                />
                                <Text style={styles.textUser}>{post.user.name}</Text>
                            </View>
                            <View style={styles.containerDate}>
                                <MaterialIcons name="today" style={styles.iconDate} size={18} />
                                <Text style={styles.textDate}>
                                    {moment(post.date, 'DD-MM-YYYY').format('LL')}
                                </Text>
                            </View>
                        </View>
                        <Image source={{ uri: post.thumbnail }} style={styles.image} />
                        <View style={{ marginTop: 20, marginBottom: 20 }}>
                            <RenderHtml
                                tagsStyles={{
                                    p: {
                                        color: '#333333',
                                        fontSize: 14,
                                        margin: 0,
                                        padding: 0,
                                        textAlign: 'justify',
                                    },
                                    br: {
                                        margin: 0,
                                        padding: 0,
                                    },
                                    h1: { color: '#333333', fontSize: 16, margin: 0, padding: 0 },
                                    h2: { color: '#333333', fontSize: 16, margin: 0, padding: 0 },
                                    h3: { color: '#333333', fontSize: 16, margin: 0, padding: 0 },
                                }}
                                contentWidth={width}
                                source={{ html: post.description }}
                                enableExperimentalMarginCollapsing={true}
                                enableExperimentalGhostLinesPrevention={true}
                            />

                        </View>
                        {post.file_attachment && (
                            <TouchableOpacity
                                onPress={() => {
                                    Linking.openURL(post.file_attachment);
                                }}
                                style={styles.logoContainer}
                            >
                                <Text style={[styles.label, { fontWeight: 'bold' }]}>File Attachment</Text>
                                <Image
                                    source={{ uri: 'https://cdn3.iconfinder.com/data/icons/basic-regular-2/64/85-512.png' }}
                                    style={styles.logoImage}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        )}

                    </View>
                )}
                <View style={styles.marginToBottom}></View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },

    containerUserAndDate: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    containerUser: {
        flexDirection: 'row',
        marginTop: 10,
    },

    iconUser: {
        marginRight: 5,
        color: '#333333',
    },

    textUser: {
        fontSize: 13,
        color: '#333333',
        marginRight: 25,
    },

    containerDate: {
        flexDirection: 'row',
        marginTop: 10,
        paddingRight: 13,
    },

    iconDate: {
        marginRight: 5,
        color: '#333333',
    },

    textDate: {
        fontSize: 13,
        color: '#333333',
    },

    image: {
        width: '100%',
        height: 200,
        marginBottom: 5,
        borderRadius: 10,
    },

    logoImage: {
        width: '100%',
        height: 75,
        marginBottom: 5,
        borderRadius: 10,
    },

    logoContainer: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    },

    marginToBottom: {
        marginBottom: 20,
    },
});