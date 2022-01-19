import { child, get, remove } from "firebase/database"

export default function exitRoom(dbRef, roomId='', playerId='', callback= () =>{}, callbackError=()=>{}){
    get(child(dbRef,`salas/${roomId}/players/${playerId}`)).then(() => {
        remove(child(dbRef,`salas/${roomId}/players/${playerId}`)).then( () => {
            localStorage.removeItem('userKey')
            localStorage.removeItem('roomId')
            callback()
        })
    }).catch( () => {
        localStorage.removeItem('userKey')
        localStorage.removeItem('roomId')
        callbackError()
    })
}