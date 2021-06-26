const fs = require("fs");

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile("/path/to/file", callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();
 
  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});

//这里最需要注意的
const fs = require("fs");
const logger = require("../common/logger");
const ITERATIONS_MAX = 2;
let iteration = 0;
process.nextTick(() => {
  logger.info("process.nextTick", "MAINLINE MICROTASK");
});
logger.info("START", "MAINLINE");
const timeout = setInterval(() => {
  logger.info("START iteration " + iteration + ": setInterval", "TIMERS PHASE");

  if (iteration < ITERATIONS_MAX) {
    setTimeout(
      (iteration) => {
        logger.info(
          "TIMER EXPIRED (from iteration " +
            iteration +
            "): setInterval.setTimeout",
          "TIMERS PHASE"
        );
        process.nextTick(() => {
          logger.info(
            "setInterval.setTimeout.process.nextTick",
            "TIMERS PHASE MICROTASK"
          );
        });
      },
      0,
      iteration
    );
    fs.readdir("../data", (err, files) => {
      logger.info(
        "fs.readdir() callback: Directory contains: " + files.length + " files",
        "POLL PHASE"
      );
      process.nextTick(() => {
        logger.info(
          "setInterval.fs.readdir.process.nextTick",
          "POLL PHASE MICROTASK"
        );
      });
    });
    setImmediate(() => {
      logger.info("setInterval.setImmediate", "CHECK PHASE");
      process.nextTick(() => {
        logger.info(
          "setInterval.setTimeout.process.nextTick",
          "CHECK PHASE MICROTASK"
        );
      });
    });
  } else {
    logger.info("Max interval count exceeded. Goodbye.", "TIMERS PHASE");
    clearInterval(timeout);
  }
  logger.info("END iteration " + iteration + ": setInterval", "TIMERS PHASE");
  iteration++;
}, 0);
logger.info("MAINLINE: END");
