import React, { useState, useRef, createRef } from 'react'
import { StyleSheet, Keyboard } from 'react-native'
import { View, Text, TouchableOpacity, Colors, TextField, Image } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BackDrop from '../../components/BackDrop'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from 'moment'
import { Region } from 'react-native-maps'
import { getImage } from '../../universal/GetImage'
import { GS } from '../../universal/GS'

interface Flyer {
    flyer: string
    title: string
    description: string
    date: Date
    start: Date
    duration: number
    location: string
}

const CreateEvent = () => {
    const theme = useTheme()
    const col = Colors.grey30
    const { handleSubmit, errors, control, clearErrors, setValue } = useForm<Flyer>();
    const navigation = useNavigation()

    const [image, setImage] = useState<string>()


    const [dateValue, setDateValue] = useState<string>()
    const [timeValue, setTimeValue] = useState<string>()
    const [dateShown, setDateShown] = useState(false)
    const [timeShown, settimeShown] = useState(false)

    const onStartChange = (event: any, selectedDate: Date | undefined) => {
        settimeShown(false)
        setValue("start", selectedDate)
        setTimeValue(moment(selectedDate).format("hh:mm A"))
    }

    const onDateChange = (event: any, selectedDate: Date | undefined) => {
        setDateShown(false)
        setDateValue(moment(selectedDate).format("MMM D, yy"))
        setValue("date", selectedDate)
    }

    const handleShowDate = () => {
        Keyboard.dismiss()
        setDateShown(true)
    }

    const handleShowTime = () => {
        Keyboard.dismiss()
        settimeShown(true)
    }

    const onSubmit = (data: any) => {
        console.log(data);
    }

    const onLocation = (loc: Region) => {
        setValue("location", [loc?.latitude, loc?.longitude].toString())
    }

    const getFlyer = async () => {
        getImage().then((res: any) => {
            if (!res.cancelled) {
                setImage(res.uri)
                setValue("flyer", res.uri)
                clearErrors("flyer")
            }
        })
    }

    return (
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View center >
                {dateShown && <DateTimePicker onChange={(e, d) => {
                    onDateChange(e, d)
                }} mode="date" value={new Date()} />}

                {timeShown && <DateTimePicker onChange={(e, d) => {
                    onStartChange(e, d)
                }} mode="time" value={new Date()} />}
                <BackDrop />
                <TouchableOpacity onPress={getFlyer} center style={[style.upload, { backgroundColor: Colors.background, overflow: "hidden" }]}>
                    <Controller
                        control={control}
                        name="flyer"
                        rules={{ required: "A flyer is required" }}
                    />
                    <View marginV-15>
                        <Icon name="image" color={col} size={43} />
                        <Icon name="plus" color={col} size={16} style={{ position: "absolute", bottom: -5, right: -8, backgroundColor: Colors.background, padding: 3, borderRadius: 50 }} />
                    </View>
                    <Text marginB-25>upload image</Text>
                    {image && <View absT style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,.3)" }}>
                        <Image source={{ uri: image }} resizeMode="cover" cover />

                    </View>}
                </TouchableOpacity>
                {errors.flyer && <Text>{errors.flyer.message}</Text>}
                {Image && <View style={{ justifyContent: "flex-end", alignItems: "flex-end", width: "90%", zIndex: 5 }}>
                    <TouchableOpacity onPress={() => {
                        setImage(undefined)
                    }}
                        row padding-5 marginV-5 bg-background style={{ elevation: 2, borderRadius: 4 }}>
                        <Text>clear image</Text>
                    </TouchableOpacity></View>}
                <View bg-background style={style.cont}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "title required" }}
                        render={({ onChange, onBlur, value }) => {
                            return (<TextField
                                hideUnderline
                                error={errors.title ? errors.title.message : ""}
                                maxLength={16}

                                onChangeText={(e: any) => onChange(e)} onBlur={() => {
                                    onBlur()
                                    clearErrors("title")
                                }}
                                value={value}
                                floatOnFocus
                                floatingPlaceholder
                                style={GS.input}
                                floatingPlaceholderStyle={GS.floater}
                                placeholder="Party name" />)
                        }}
                    />
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: "description required" }}
                        render={({ onChange, onBlur, value }) => {
                            return (<TextField
                                hideUnderline
                                error={errors.description ? errors.description.message : ""}
                                maxLength={16}
                                showsMaxLength

                                onChangeText={(e: any) => onChange(e)} onBlur={() => {
                                    onBlur()
                                    clearErrors("description")
                                }}
                                value={value}
                                floatOnFocus
                                floatingPlaceholder
                                style={GS.input}
                                floatingPlaceholderStyle={GS.floater}
                                placeholder="Description" />)
                        }}
                    />

                </View>

                <View row spread bg-background style={style.cont}>
                    <Controller
                        name="date"
                        control={control}
                        rules={{ required: "date required" }}
                        render={({ onChange, onBlur, value }) => {
                            return (<TextField
                                allowFontScaling
                                hideUnderline
                                error={errors.date ? errors.date.message : ""}
                                maxLength={16}
                                onFocus={handleShowDate}
                                // onChangeText={(value: any) => onChange(value)}
                                value={dateValue}
                                floatOnFocus
                                floatingPlaceholder
                                autoGrow
                                style={[GS.input, { width: "40%" }]}
                                floatingPlaceholderStyle={GS.floater}
                                placeholder="Date" />)
                        }}
                    />
                    <Controller
                        name="start"
                        control={control}
                        rules={{ required: "start required" }}
                        render={({ onChange, onBlur, value }) => {
                            return (<TextField
                                hideUnderline
                                error={errors.start ? errors.start.message : ""}
                                maxLength={16}
                                showsMaxLength
                                onFocus={handleShowTime}

                                // onChangeText={(e: any) => onChange(e)} onBlur={() => {
                                //     onBlur()
                                //     clearErrors("start")
                                // }}
                                value={timeValue}
                                floatOnFocus
                                floatingPlaceholder
                                style={GS.input}
                                floatingPlaceholderStyle={GS.floater}
                                placeholder="Start Time" />)
                        }}
                    />
                    <Controller
                        name="duration"
                        control={control}
                        rules={{ required: "duration required" }}
                        render={({ onChange, onBlur, value }) => {
                            return (<View center row style={{ width: "30%" }}><TextField
                                hideUnderline
                                error={errors.duration ? errors.duration.message : ""}
                                maxLength={16}
                                showsMaxLength

                                onChangeText={(e: any) => onChange(e)} onBlur={() => {
                                    onBlur()
                                    clearErrors("duration")
                                }}
                                value={value}
                                floatOnFocus
                                floatingPlaceholder
                                keyboardType="numeric"
                                style={[GS.input, { width: "70%", marginStart: 0, textAlign: "center", paddingEnd: 10 }]}
                                floatingPlaceholderStyle={[GS.floater]}
                                placeholder="Duration" />
                                <Text style={{ color: Colors.grey40, margin: 5 }}>Hr</Text>

                            </View>)
                        }}
                    />

                </View>

                <View bg-background style={style.cont}>
                    <Controller
                        name="location"
                        control={control}
                        rules={{ required: "location required" }}
                        render={({ onChange, onBlur, value }) => {
                            return (<TextField
                                hideUnderline
                                error={errors.location ? errors.location.message : ""}
                                maxLength={16}
                                onFocus={() => navigation.navigate("useMap", { set: onLocation })}

                                onChangeText={(e: any) => onChange(e)} onBlur={() => {
                                    onBlur()
                                    clearErrors("location")
                                }}
                                value={value}
                                floatOnFocus
                                floatingPlaceholder
                                style={GS.input}
                                floatingPlaceholderStyle={GS.floater}
                                placeholder="Location" />)
                        }}
                    />

                </View>

                <TouchableOpacity onPress={() => {
                    handleSubmit(onSubmit)()
                }} activeOpacity={.8} bg-primary center style={style.btn}>
                    <Text>create party</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default CreateEvent

const style = StyleSheet.create({
    upload: {
        borderWidth: 0,
        borderStyle: "dashed",
        borderColor: Colors.grey40,
        elevation: 10,
        // padding: 20,
        // paddingVertical: 30,
        borderRadius: 7,
        marginTop: 20,
        width: "90%",
    },
    cont: {
        padding: 20,
        borderRadius: 7,
        marginTop: 20,
        width: "90%",
        elevation: 3
    },

    btn: {
        padding: 14,
        width: "90%",
        borderRadius: 7,
        elevation: 15,
        marginTop: 20,
        marginBottom: 20
    }
})
