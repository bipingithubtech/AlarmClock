// Array to store alarms
const alarms = [];

function showTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;
  document.getElementById("current_time").innerText = time;

  // Check if any alarm should go off
  checkAlarms(hours, minutes, seconds);
}

// Function to check if the current time matches any alarm
function checkAlarms(hours, minutes, seconds) {
  alarms.forEach((alarm) => {
    if (
      alarm.hour === hours &&
      alarm.minute === minutes &&
      alarm.seconds === seconds
    ) {
      alert(`Alarm ringing at ${hours}:${minutes}:${seconds}`);

      removeAlarm(alarm.id);
    }
  });
}

// Function to set a new alarm
function setAlarm(e) {
  e.preventDefault();

  const alarmTime = document.getElementById("alarm-time").value;
  const [hour, minute] = alarmTime.split(":");
  const seconds = "00";

  const id = Date.now();

  alarms.push({ id, hour, minute, seconds });

  updateAlarmList();
}

// Function to remove an alarm
function removeAlarm(id) {
  const index = alarms.findIndex((alarm) => alarm.id === id);
  if (index > -1) {
    alarms.splice(index, 1);
  }
  updateAlarmList();
}

// Function to update the list of alarms displayed
function updateAlarmList() {
  const alarmList = document.getElementById("list");
  alarmList.innerHTML = "";

  alarms.forEach((alarm) => {
    const li = document.createElement("li");
    li.textContent = `${alarm.hour}:${alarm.minute}:${alarm.seconds}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteBtn";
    deleteButton.onclick = () => removeAlarm(alarm.id);

    li.appendChild(deleteButton);
    alarmList.appendChild(li);
  });
}

// Attach event listener to the form
document.getElementById("alarm_form").addEventListener("submit", setAlarm);

setInterval(showTime, 1000);
