import { View, Text, Image, StyleSheet } from "react-native"
import React, { useEffect, useState} from "react"

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
}

export default function Weather(props) {
    const [temp, setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        const url = api.url +
        'lat=' + props.latitude +
        '&lon=' + props.longitude +
        '&units=metric' +
        '&appid=' + api.key

        fetch(url)
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            setTemp(json.main.temp)
            setDescription(json.weather[0].description)
            setIcon(api.icons + json.weather[0].icon + '@2x.png')
        })
        .catch((error) => {
            setDescription("Error retrieving weather information.")
            console.log(error)
        })
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.temp}>{temp}°C</Text>
            {icon && <Image source={{ uri: icon }} style={styles.weatherIcon} />}
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    temp: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    weatherIcon: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: 'gray',
    },
});