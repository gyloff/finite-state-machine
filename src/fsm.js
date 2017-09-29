class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.cash = [];
        this.cash2 = [];
        this.state = 'normal';
        if (config == null){
            throw new Error("config isn't passed");
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state != 'normal' && state != 'hungry' && state != 'busy' && state != 'sleeping'){
            throw new Error("event in current state isn't exist");
        }else {
            this.state = state;
            this.cash.push(this.state);
            this.cash2.length = 0; 
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.state == 'normal' && event == 'study'){
            this.state = 'busy';
            this.cash.push(this.state);
            this.cash2.length = 0;
        }else
        if (this.state == 'hungry' && event == 'eat'){
            this.state = 'normal';
            this.cash.push(this.state);
            this.cash2.length = 0;
        }else
        if (this.state == 'busy' && event == 'get_hungry'){
            this.state = 'hungry';
            this.cash.push(this.state);
            this.cash2.length = 0;
        }else    
        if (this.state == 'sleeping' && event == 'get_up'){
            this.state = 'normal';
            this.cash.push(this.state);
            this.cash2.length = 0;
        }else 
        if (this.state == 'sleeping' && event == 'get_hungry'){
            this.state = 'hungry';
            this.cash.push(this.state);
            this.cash2.length = 0;
        }else
        if (this.state == 'busy' && event == 'get_tired'){
            this.state = 'sleeping';
            this.cash.push(this.state);
            this.cash2.length = 0;
        }else
        throw new Error ("event in current state isn't exist");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = 'normal';
        this.cash.push(this.state);
        this.cash2 = 0 ;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == null){
            return ['normal', 'busy', 'hungry', 'sleeping'];
        }
        switch(event){
            case 'get_hungry': return ['busy', 'sleeping'];
            case 'get_tired': return ['busy'];
            case 'study': return ['normal'];
            case 'get_up': return ['sleeping'];
            default: return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.cash.length == 0){
            return false;
        }else 
        if (this.cash.length == 1){
            this.cash2.push(this.state);
            this.state = 'normal';
            this.cash.pop();
            return true;
        }else{
            this.cash2.push(this.state);
            this.state = this.cash[this.cash.length - 2];
            this.cash.pop();
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.cash2.length == 0){
            return false;
        } else {
            this.state = this.cash2.pop();
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.cash.length = 0;
        this.cash2.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
