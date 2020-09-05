import { getStateFromPath } from '@react-navigation/native'
import React, { Component, createRef } from 'react'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import  Animated, { Transition, Transitioning, TransitioningView, TransitioningViewProps } from 'react-native-reanimated'
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/FontAwesome'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'styled-components'
import { eventEmitter, eventStrings } from '../universal/EventEmitter'

// @refresh reset
const conf = Animated.SpringUtils.makeDefaultConfig()

const { height } = Dimensions.get( "screen" )
const size = 25


const trans = (
    <Transition.Sequence  >
        <Transition.Out type="fade" durationMs={100}/>
    <Transition.Change interpolation="linear" durationMs={100} />
        <Transition.In type="fade" durationMs={100} />
    </Transition.Sequence >
)

export default class RateParty extends Component
{
// @refresh reset

    static rateParty: RateParty
    getSelf = () => this

    constructor(props:any)
    {
        super(props)
        RateParty.rateParty = this

    }
    
    static show = () =>
    {
        RateParty.rateParty.show()
    }

    static hide = () =>
    {
        RateParty.rateParty.hide()
    }

    show = () =>
    {
        console.log( "sm" );

        conf.toValue = height/2.5
     Animated.spring( this.state.height,conf ).start( )
    }

    hide = () =>
    {
        conf.toValue = height
        Animated.spring( this.state.height, conf ).start( () =>
        {
            //rest value
            this.setState({index:undefined})
        })
    }

    state = {
        index: undefined,
        height : new Animated.Value(height)
    }

    componentDidMount()
    {
        RateParty.rateParty = this 
        eventEmitter.addListener(eventStrings.ArrivedAtParty, this.setParty)
    }

    componentWillUnmount()
    {
        eventEmitter.removeListener( eventStrings.ArrivedAtParty, this.setParty )
    }

    setParty = ( reference: string ) =>
    {
        console.log(reference);
        
    }

    view = createRef<TransitioningView>()

    chnageIndex = (index:number) =>
    {
        
        setTimeout( () =>
        {
            if(this.view.current) this.view.current.animateNextTransition()
            this.setState( { index: index } )

            setTimeout(() => {
                //animate out
                this.hide()
            }, 1200);
            
        }, 900);
    }
    render() {
        return (
            <Animated.View style={{
                position: "absolute",
                transform: [{ translateY: this.state.height }],
                zIndex: 20,
                width: "100%",
                padding: 10,
                alignItems: "center",
                justifyContent:"center"
                
            }}>
                <Transitioning.View ref={this.view} transition={trans} bg-background padding-10 style={{
                    width: "90%",
                    elevation: 20,
                    borderRadius:7,
                    backgroundColor: Colors.background,
                    padding:10
                }}>
                    <View padding-4>
                        <Text lvl1> We noticed your at this party. would you like to rate it? </Text>
                    </View>
                    <View>
                       { this.state.index == undefined &&  <View row spread paddingH-25 marginV-15>
                            <Button name="thumbs-down" changeIndex={this.chnageIndex} index={0}/>
                            <Button name="emoticon-neutral" Pack={MCI} changeIndex={this.chnageIndex} index={1}/>
                            <Button name="thumbs-up" changeIndex={this.chnageIndex} index={2}/>
                        </View>}
                        {this.state.index != undefined && <View center>
                        <Text lvl1>Thank you for rating xxx!</Text>
                        </View>}
                    </View>
                </Transitioning.View>
            </Animated.View>
        )
    }
}


const Button = ( { name, Pack, changeIndex, index }: { name: string, Pack?: any, changeIndex: (index:number) => void, index:number} ) =>
{


    const [clicked, setClicked] = useState( false )
    const [cols, setCols] = useState(Colors.grey40)

    const beCol = Colors.grey40
    const afCol = Colors.primary
    
    return <TouchableOpacity onPress={() =>
    {
        setCols( afCol )
        changeIndex(index)
    }}>
        {Pack && <Pack name={name} size={size} color={cols} />}
        {!Pack && <Icon name={name} size={size} color={cols} />}
    </TouchableOpacity>
}