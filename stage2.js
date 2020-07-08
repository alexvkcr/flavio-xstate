let xstate = require("xstate");
let Machine = xstate.Machine;
let interpret = xstate.interpret;

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

const toggleService = interpret(machine).start();
let newState = toggleService.send("TOGGLE");
console.log(newState.value);
newState = toggleService.send("TIMER");
console.log(newState.value);
