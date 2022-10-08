import {makeAutoObservable} from "mobx";

export default class WeatherStore {
    constructor() {
        this._weathers = []
        // this._actualWeathers = []
        makeAutoObservable(this)
    }

    setWeathers(weathers){
        this._weathers = weathers
    }

    // setActual(weathers){
    //     this._weathers = weathers
    // }

    get weathers(){
        return this._weathers
    }

    // get actualWeathers(){
    //     return this._actualWeathers
    // }
}