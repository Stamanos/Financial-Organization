class Counter extends Componemt {
    state = { 
        count: 0
        }
    };
    render(){
        return(
            <div>
                <span>{this.state.count}</span>
                <button>Increment</button>
            </div>
        )
    }
}
export default Counter;