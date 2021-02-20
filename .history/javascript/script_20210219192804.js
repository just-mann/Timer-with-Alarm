/*

  Program: Timer With Alarm
  Author: Justin Kollie => just.Codes
      gitHub: just-mann
  Date Started: February 1, 2020
  Date Completed: February 19, 2020

  Description: This program is a frond end digital clock created using HTML5, CSS, and Mostly JavaScript. 
               The program allows user to set an Alarm as well as delete
               said Alarm. Moreover, when the alarm time is met, the alarm goes off, playing a Sound.
               This is just a front end project. No backend or database. When the browser is refreshed,
               the program refreshes.

*/

'use strict';

// ---------- Toggle Background Switch Begins --------------- //
function switchFunction() {

  let checkBox = document.getElementById("myBackgroundColorCheck");
  let body = document.querySelector('body');
  let TimeDisplay = document.getElementById('TimeDisplay');
  let setAlarmText = document.getElementById('setAlarmText');
  let displayCurrentDate = document.getElementById('displayCurrentDate');
  let todaysDay = document.getElementById('todaysDay');
  let setAlarmH1Text = document.getElementById('setAlarmH1Text');

    if (checkBox.checked == true){
      body.style.backgroundColor = '#1c1c31';
      checkBox.style.backgroundColor = "#1c1c31";
      TimeDisplay.style.color = '#ffffff';
      setAlarmText.style.color = '#f7f7f7';
      setAlarmH1Text.style.color = '#f7f7f7'
      displayCurrentDate.style.color = '#f7f7f7';
      todaysDay.style.color = 'white';
    } else {
      body.style.backgroundColor = '#f7f7f7';
      checkBox.style.backgroundColor = "#f7f7f7";
      TimeDisplay.style.color = '#1c1c31';
      setAlarmText.style.color = '#1c1c31';
      displayCurrentDate.style.color = '#1c1c31';
      todaysDay.style.color = '#1c1c31'
      setAlarmH1Text.style.color = '#1c1c31';
    }

}
// ------------------- Toggle Background Switch Ends ---------- //

  
// ------------------- Time Running Begins ---------- //
let timeRunning = () => {
  // -------------------------- Time and Date ---------------------------- //
  const date = new Date();
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let currentMonth = months[date.getMonth()];
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDay = days[date.getDay()];
  let currentDate = `${currentMonth} ${date.getDate()}.`;

  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let currentSeconds = date.getSeconds();

  
  // Convert the value of the current hour to string
  currentHour = currentHour.toString();
  // Add zero to the current hour value if it is a single digit
  if (currentHour.length < 2) {
    currentHour = '0' + currentHour;
  }

  // Convert the value of the current minutes to string
  currentMinutes = currentMinutes.toString();
  // Add zero to the current minutes value if it is a single digit
  if (currentMinutes.length < 2) {
    currentMinutes = '0' + currentMinutes;
  }

  // Convert the value of the current seconds to string
  currentSeconds = currentSeconds.toString();
  // Add zero to the seconds value if it is a single digit
  if (currentSeconds.length < 2) {
    currentSeconds = '0' + currentSeconds;
  }
 
  let currentTime = `${currentHour} : ${currentMinutes}`;
  document.getElementById('TimeDisplay').innerHTML = currentTime;
  document.getElementById('displayCurrentDate').innerHTML = currentDate;
  document.getElementById('todaysDay').innerHTML = `${currentDay} `;

// ---------------- Time Running Ends ------------ //

  setTimeout(timeRunning, 1000);

}

timeRunning(); // Calling timeRunning function

let alarmHour = document.getElementById('alarmHour');
let alarmMinutes = document.getElementById('alarmMinutes');
let setAlarmBtn = document.getElementById('setAlarmBtn');

  let playSound = () => {
    alarmSound.play();
    let alarmDisplay = document.querySelector('#alarmDisplay');
    alarmDisplay.style.visibility = (alarmDisplay.style.visibility == 'hidden' ? '' : 'hidden');
    setAlarmH1Text.innerHTML = '<div class="text-danger">((<i class="fas fa-bell text-danger fa-2x"></i>))</div>';
    setAlarmH1Text.style.visibility = (setAlarmH1Text.style.visibility == 'hidden' ? '' : 'hidden');
  }

  let stopSound = () => {
    let setAlarmH1Text = document.getElementById('setAlarmH1Text');
    alarmSound.pause();
    let alarmDisplay = document.querySelector('#alarmDisplay');
    alarmDisplay.style.visibility = 'visible';
    setAlarmH1Text.innerHTML = '<i class="fas fa-bell fa-2x">';
    setAlarmH1Text.style.visibility = 'visible';
  }


// -------- Set Alarm Function Begins --------//
let setAlarm = () => {
  setAlarmH1Text.innerHTML = `<i class='fas fa-bell fa-2x'></i>`;
  
  // Add zero to the hour value if it is a single digit.
  if (alarmHour.length < 2) {
    alarmHour = '0' + alarmHour;
  }

  // Add zero to the alarm minutes value if it is a single digit.
  if (alarmMinutes.length < 2) {
    alarmMinutes = '0' + alarmMinutes;
  }

  let alarmDisplay = document.querySelector('#alarmDisplay');
  
  alarmDisplay.innerHTML = `<i class="fas fa-bell"></i> ${alarmHour.value} : ${alarmMinutes.value} <i class="fas fa-times-circle text-danger ml-4" id='deleteAlarm' title='or press Esc'></i>`;
  alarmHour.setAttribute('disabled', true);
  alarmMinutes.setAttribute('disabled', true);
  setAlarmBtn.setAttribute('disabled', true);

  let deleteAlarm = document.getElementById('deleteAlarm');
  setInterval(() => {
    let d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let alarmDisplay = document.querySelector('#alarmDisplay');
    let alarmHour = document.getElementById('alarmHour');
    let alarmMinutes = document.getElementById('alarmMinutes');
    let setAlarmBtn = document.getElementById('setAlarmBtn');

  // --------------- Alarm Ringer Begins -------------- //
  // --- Checks if alarmTime is equal to current time

    if (hour == alarmHour.value && minutes == alarmMinutes.value && !alarmDisplay.innerHTML == '') {
      playSound();
    } else {
      stopSound();
    };

  // --------------- Alarm Ringer Ends -------------- //
    deleteAlarm.addEventListener('click', () => {
      stopSound();
      location.reload();
      alarmDisplay.innerHTML = '';
      alarmDisplay.style.color = 'red';
      
      setTimeout(() => {
          alarmHour.removeAttribute('disabled', true);
          alarmMinutes.removeAttribute('disabled', true);
          setAlarmBtn.removeAttribute('disabled', true);
          alarmDisplay.innerHTML = '';
      }, 2000);
      
    });
  
  }, 1000);

}


// -------- Input Validation Begins --------- //

let validateForm = () => {
  if (alarmHour.value === '' || alarmMinutes.value === '') {
     alert(`Input Field Cannot Be Empty !!!`);
  } else {
    setAlarm();
  }
}

// ----- If the Enter Button is pressed, run the validateForm() function ----- //

// If the enter key is pressed, run the validateForm() function which runs the setAlarm() function. //
let enterKey = (e) => {
  if (e.keyCode === 13) {
    validateForm();
  }
}

document.addEventListener('keydown', enterKey);
// --------------- Input Validation Ends ------------ //
// --- If the escape [Esc] key is pressed, reset the program => Similar to the delete alarm button in the upper left corner //
let escapeKey = (e) => {
  if (e.keyCode === 27){
      stopSound();
      location.reload();
      alarmDisplay.innerHTML = '';

      setTimeout(() => {
          alarmHour.removeAttribute('disabled', true);
          alarmMinutes.removeAttribute('disabled', true);
          setAlarmBtn.removeAttribute('disabled', true);
          alarmDisplay.innerHTML = '';
          location.reload();
      }, 2000);
  }
}
document.addEventListener('keydown', escapeKey);







// ------------------------ END OF PROJECT -------------------- //