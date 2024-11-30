// Declare global variables for stopwatch and lap tracking
let timerInterval;
let isRunning = false;
let lapCounter = 1;
let laps = [];
let time = { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };

// Function to update the stopwatch display
function updateTimeDisplay() {
  document.getElementById("hours").textContent = formatTime(time.hours);
  document.getElementById("minutes").textContent = formatTime(time.minutes);
  document.getElementById("seconds").textContent = formatTime(time.seconds);
  document.getElementById("milliseconds").textContent = formatTime(time.milliseconds, 3);
}

// Function to format time (e.g., 0 -> 00, 12 -> 12)
function formatTime(num, length = 2) {
  return num.toString().padStart(length, '0');
}

// Start the stopwatch
document.getElementById("start").addEventListener("click", function() {
  if (!isRunning) {
    timerInterval = setInterval(() => {
      time.milliseconds++;
      if (time.milliseconds >= 1000) {
        time.milliseconds = 0;
        time.seconds++;
      }
      if (time.seconds >= 60) {
        time.seconds = 0;
        time.minutes++;
      }
      if (time.minutes >= 60) {
        time.minutes = 0;
        time.hours++;
      }
      updateTimeDisplay();
    }, 1);
    isRunning = true;
  }
});

// Pause the stopwatch
document.getElementById("pause").addEventListener("click", function() {
  clearInterval(timerInterval);
  isRunning = false;
});

// Reset the stopwatch and lap times
document.getElementById("reset").addEventListener("click", function() {
  clearInterval(timerInterval);
  isRunning = false;
  time = { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
  updateTimeDisplay();

  // Clear lap times
  laps = [];
  const lapTableBody = document.getElementById("lap-times").getElementsByTagName('tbody')[0];
  lapTableBody.innerHTML = ''; // Clear all rows
  lapCounter = 1; // Reset lap counter
});

// Add a lap time
document.getElementById("lap").addEventListener("click", function() {
  const currentTime = `${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(time.seconds)}:${formatTime(time.milliseconds, 3)}`;
  
  // Add lap time to the array
  laps.push({ lap: lapCounter++, time: currentTime });

  // Update the lap times table
  const lapTableBody = document.getElementById("lap-times").getElementsByTagName('tbody')[0];
  const newRow = lapTableBody.insertRow();
  const lapCell = newRow.insertCell(0);
  const timeCell = newRow.insertCell(1);
  
  lapCell.textContent = laps[laps.length - 1].lap;
  timeCell.textContent = laps[laps.length - 1].time;
});
