let xstate = require("xstate");
let Machine = xstate.Machine;
let interpret = xstate.interpret;

const machine = Machine(
  {
    id: "roomlights",
    initial: "nolights",
    states: {
      nolights: {
        on: {
          p1: {
            target: "l1",
            actions: "turnOnL1",
          },
          p2: {
            target: "l1",
            actions: "turnOnL1",
          },
        },
      },
      l1: {
        on: {
          p1: {
            target: "l2",
            actions: "turnOnL2",
          },
          p2: {
            target: "l3",
            actions: "turnOnL3",
          },
        },
      },
      l2: {
        on: {
          p1: {
            target: "nolights",
            actions: ["turnOffAll"],
          },
          p2: {
            target: "nolights",
            actions: ["turnOffAll"],
          },
        },
      },
      l3: {
        on: {
          p1: {
            target: "nolights",
            actions: "turnOffAll",
          },
          p2: {
            target: "nolights",
            actions: "turnOffAll",
          },
        },
      },
    },
  },
  {
    actions: {
      turnOnL1: (context, event) => {
        console.log("turnOnL1");
      },
      turnOnL2: (context, event) => {
        console.log("turnOnL2");
      },
      turnOnL3: (context, event) => {
        console.log("turnOnL3");
      },
      turnOffAll: (context, event) => {
        console.log("turnOffAll");
      },
    },
  }
);

const toggleService = interpret(machine).start();
toggleService.send("p1").value; //'l1'
toggleService.send("p1").value; //'l2'
toggleService.send("p1").value; //'nolights'
