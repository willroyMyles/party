import { BlurView } from '@react-native-community/blur';
import React, { PureComponent, useEffect } from 'react'
import { useState } from 'react'
import { Dimensions, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Modal, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { animated, useSpring } from 'react-spring/native';

const {width, height} = Dimensions.get("screen");
class BusyOverlay extends PureComponent {

     static instance : BusyOverlay;

    componentDidMount(){
        BusyOverlay.instance = this;
    }

    static showSuccess(t:string, m:string){
        this.instance.setState({
            success:true,
            visible:true,
            title:t,
            msg:m
        })
    }

    static showError(t:string, m:string){
        this.instance.setState({
            success:false,
            visible:true,
            title:t,
            msg:m
        })
    }

    static show() {this.instance.setState({visible:true})}
    static hide() {this.instance.setState({visible:false})}

    onCallBack = (visible:boolean) => {
        this.setState({
            visible:false
        })
 }
     
     state ={
         visible : false,
         success : false,
         title:"title",
         msg:"message",
         callBack : this.onCallBack
     }

 

    render(){
    return (
        <View style={{
            width, height:100, backgroundColor:"transparent",
            position:"absolute", overflow:"visible"
            }}>
           <BusyOverlayContent {...this.state} />

        </View>
    )
    }
}

export default BusyOverlay

const BusyOverlayContent= ({msg,visible,success, callBack}:{callBack:(v:boolean)=>{},msg:string,visible:boolean,success:boolean}) =>{

    const color = success? Colors.green30 : Colors.red30

    const [props, set] = useSpring( () => ( {
        top: -150,
       config: {
           duration:450,
           easing:Easing.linear
       }
    } ) )

    useEffect(() => {
        console.log(visible);
        if(visible){
            
            set({
                top : 0
            });
            setTimeout(() => {
                set({
                    top : -150
                });
                callBack(false);
                
            }, 2500);
        }
    }, [visible])

    const Views = animated(View);

    return (
           <Views centerH style={{
               height:"100%",
               padding:5,
               borderRadius:5,
               elevation: 15,
               backgroundColor:Colors.background,
               borderBottomWidth:5,
               borderBottomColor:color,
               top:props.top
           }}>
                <View>
                    <Text marginT-50>{msg}</Text>
                </View>
           </Views>
    
    )

}
