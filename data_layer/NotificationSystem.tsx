import { action, observable } from "mobx";
import moment from "moment";
import * as Notifications from 'expo-notifications';
import FireStore from "./FireStore";
import workManager from 'react-native-background-worker';

class NotificationSystem {
    @observable data : Map<string, number> = new Map();
    @observable observed : Set<string> = new Set();
    @observable id : string = ""

    constructor(){
        workManager.setWorker( {
            type: "periodic",
            name: "notofication worker",
            notification: {
                title: "Checking rsvp events",
                text: "just a test notification "
            },
            foregroundBehaviour:"blocking",
            workflow: async () => this.downloadRsvpEvents(),
            repeatInterval: 1 * 60 * 12, //every 12 hours
            timeout: 1,
            constraints: {
                network : "connected",
            }
            
        } ).then( res =>
        {
            this.id = res;
        } ).catch( err =>
        {
            console.log(`some notification error ${err}`);
        })

    }

    @action addToWatch = (refs : string, date : number) =>{
        // if not observed, add to app
        if(!this.observed.has(refs)) this.data.set(refs, date);
    }
    @action removeFromWatch = (refs : string) =>{
        // if not observed, add to app
        if(!this.observed.has(refs)) this.data.delete(refs);
    }

    @action downloadRsvpEvents = () => new Promise<void>((resolve, reject)=>{
        FireStore.retrieve.rsvpEvents().then( _ =>{
			[...FireStore.rsvpData.entries()].map(([key,vals], index)=>{
				this.addToWatch(key.toString(),vals.dateNum);
			})

        this.checkTime();
        resolve();
		}).catch( err =>
			{
			reject("no rsvp data");
		} )
    })

    @action checkTime = () => {
        [...this.data.entries()].map(([key,value], index)=>{
            //check if time is the same 
            const today = moment().dayOfYear();
            let partyDay = moment(value).dayOfYear();
            const isSameDay = today == partyDay;
            
            const year = moment().year()
            const partyYear = moment(value).year();
            const isSameYear = year == partyYear;
            
            if(isSameDay && isSameYear){
                //add to observed
                this.observed.add(key);
                this.data.delete(key);
                this.process(key);
            }

            if(today > partyDay && isSameYear){
                this.removeFromWatch(key);
                //should remove from rsvp???
            }
            
        })
    }

    private process = (ref:string) => {
        //should send notification for it

        const partyData = FireStore.rsvpData.get(ref);


        Notifications.setNotificationHandler( {
            handleNotification: async () => ( {
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            } ),
        } );
        
        Notifications.scheduleNotificationAsync( {
            content: {
                title: "Party Today",
                body:`your rsvp'd ${partyData?.title}, the event is today ${moment(partyData?.start).format("ddd MMM d, hh:mm a")}`
            },
            trigger: {
                seconds:1
            },
        })
    }
}

const notificationSystem = new NotificationSystem();
export default notificationSystem