let xstate = require("xstate");
let Machine = xstate.Machine;

const machine = Machine({
  id: "trafficlights",
  initial: "green",
  states: {
    green: {
      on: {
        TIMER: "yellow",
      },
    },
    yellow: {
      on: {
        TIMER: "red",
      },
    },
    red: {
      on: {
        TIMER: "green",
      },
    },
  },
});

machine.initialState.value;

const currentState = machine.initialState.value;
const newState = machine.transition(currentState, "TIMER");
console.log(newState.value);
