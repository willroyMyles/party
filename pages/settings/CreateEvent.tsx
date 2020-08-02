import React, { useState, useRef, createRef } from 'react'
import { StyleSheet, Keyboard } from 'react-native'
import { View, Text, TouchableOpacity, Colors, TextField } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BackDrop from '../../components/BackDrop'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from 'moment'

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
    const { handleSubmit, errors, control, clearErrors, setValue } = useForm();
    const navigation = useNavigation()
    let startRef = useRef()
    let dateRef = useRef()

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
                <TouchableOpacity center style={[style.upload, { backgroundColor: Colors.background }]}>
                    <View marginB-15>
                        <Icon name="image" color={col} size={43} />
                        <Icon name="plus" color={col} size={16} style={{ position: "absolute", bottom: -5, right: -8, backgroundColor: Colors.background, padding: 3, borderRadius: 50 }} />
                    </View>
                    <Text>upload image</Text>
                </TouchableOpacity>
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
                                style={style.input}
                                floatingPlaceholderStyle={style.floater}
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
                                style={style.input}
                                floatingPlaceholderStyle={style.floater}
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
                                ref={dateRef}
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
                                style={[style.input, { width: "40%" }]}
                                floatingPlaceholderStyle={style.floater}
                                placeholder="Date" />)
                        }}
                    />
                    <Controller
                        name="start"
                        control={control}
                        rules={{ required: "start required" }}
                        render={({ onChange, onBlur, value }) => {
                            return (<TextField
                                ref={startRef}
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
                                style={style.input}
                                floatingPlaceholderStyle={style.floater}
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
                                rightButtonProps
                                floatOnFocus
                                floatingPlaceholder
                                keyboardType="numeric"
                                style={[style.input, { width: "70%", marginStart: 0, textAlign: "right", paddingEnd: 10 }]}
                                floatingPlaceholderStyle={[style.floater]}
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

                                onChangeText={(e: any) => onChange(e)} onBlur={() => {
                                    onBlur()
                                    clearErrors("location")
                                }}
                                value={value}
                                floatOnFocus
                                floatingPlaceholder
                                style={style.input}
                                floatingPlaceholderStyle={style.floater}
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
        padding: 20,
        paddingVertical: 30,
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
    input: {

        backgroundColor: "rgba(100,100,150,.03)",
        marginTop: -7,
        padding: 5,
        borderRadius: 7,
        paddingStart: 12,
        marginBottom: -15,
        width: "30%"
    },
    floater: {
        marginStart: 12,
        opacity: .5,
        color: Colors.grey30
    },
    btn: {
        padding: 14,
        width: "90%",
        borderRadius: 7,
        elevation: 15,
        marginTop: 20
    }
})
