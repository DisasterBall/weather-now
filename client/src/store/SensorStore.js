import {makeAutoObservable} from "mobx";

export default class SensorStore {
    constructor() {
        this._sensors = []
        makeAutoObservable(this)
    }

    setSensors(sensors) {
        this._sensors = sensors
    }

    get sensors() {
        return this._sensors
    }
}