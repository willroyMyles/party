import * as Notifications from 'expo-notifications';

export const GetNotificationPermission = () => new Promise<boolean>( async( resolve, reject ) =>
{
    try
    {
        const perm = await Notifications.getPermissionsAsync()

        if ( perm.granted )
        {
            return resolve(true)
        }

        let result;
        if ( !perm.granted && perm.canAskAgain )
        {
            result = await Notifications.requestPermissionsAsync()
        }
        
        if ( !result?.granted )
        {
            reject(false)
        }
        
        if ( result?.granted || perm.granted )
        {
            //get token
            resolve(true)
        }

    } catch ( err )
    {
        reject(false)
    }
} )

export const GetNotificationToken = () => new Promise( async ( resolve, reject ) =>
{
    try
    {
        const perm = await GetNotificationPermission()
        if ( perm )
        {
            const token = await (await Notifications.getDevicePushTokenAsync()).data()
            resolve(token)
        } else
        {
            reject(false)
        }
    } catch ( err )
    {
        reject( false )
    }
})