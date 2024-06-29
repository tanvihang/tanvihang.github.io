// State manager using subscribe-publisher method
// mock useState etc.

class ViStateManager{
    // accept initial state object
    constructor(initialState = {}){
        // create state
        this.state = initialState;
        
        // store subscriber
        this.subscriber = []
    }

    // get state
    getState(){
        return this.state;
    }

    // set state
    setState(newState){
        this.state = {...this.state, ...newState};
        this.notifySubscribers();
    }

    // things happen when notify
    subscribe(callback){
        this.subscriber.push(callback)
    }

    notifySubscribers(){
        for(let callback of this.subscriber){
            callback(this.state)
        }
    }
}

export {
    ViStateManager
}