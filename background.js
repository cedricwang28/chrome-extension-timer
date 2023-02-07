chrome.alarms.create("Timer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "Timer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        console.log(timer);
        let isRunning = true;
        if (timer === 60 * res.timeOption) {
          console.log(this, "time is up");
          chrome.notifications.create({
            title: `${res.timeOption} minites has passed!`,
            message: `Time is up for doing current`,
            iconUrl: "./icon.png",
            type: "basic",
          });

          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeOption: "timeOption" in res ? res.timeOption : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
