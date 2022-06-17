let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const global_date = new Date();
const global_month = global_date.getMonth();

console.log(global_month)

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const newEventModalCreate = document.getElementById('newEventModalCreate');

const eventFNameInput = document.getElementById('eventFNameInput');
const eventLNameInput = document.getElementById('eventLNameInput');
const eventEmailInput = document.getElementById('eventEmailInput');
const eventGenderInput = document.getElementById('eventGenderInput');
const eventAgeInput = document.getElementById('eventAgeInput');
const eventTimeInput = document.getElementById('eventTimeInput');

const eventFNameInputNew = document.getElementById('eventFNameInputNew');
const eventLNameInputNew = document.getElementById('eventLNameInputNew');
const eventEmailInputNew = document.getElementById('eventEmailInputNew');
const eventGenderInputNew = document.getElementById('eventGenderInputNew');
const eventAgeInputNew = document.getElementById('eventAgeInputNew');
const eventTimeInputNew = document.getElementById('eventTimeInputNew');
const eventDateInput = document.getElementById('eventDateInput');


const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];




function openModalNew(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.Fname;
        // document.getElementById('eventText').innerText = eventForDay.Lname
        deleteEventModal.style.display = 'block';
    } else {
        newEventModalCreate.style.display = 'block';
    }

    backDrop.style.display = 'block';
}



function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('FirstName').innerText = eventForDay.Fname;
        document.getElementById('LastName').innerText = eventForDay.Lname;
        document.getElementById('Age').innerText = eventForDay.age;
        document.getElementById('Gender').innerText = eventForDay.gender;
        document.getElementById('Email').innerText = eventForDay.email;
        document.getElementById('Time').innerText = eventForDay.time;
        document.getElementById('Date').innerText = eventForDay.date;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);

    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    console.log(month);

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = 'Appoinment';
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function closeModalNew() {
    eventFNameInput.classList.remove('error');
    eventLNameInput.classList.remove('error');
    newEventModalCreate.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventFNameInput.value = '';
    //eventLNameInput.value = '';
    clicked = null;
    load();
}

function closeModal() {
    eventFNameInput.classList.remove('error');
    eventLNameInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventFNameInput.value = '';
    //eventLNameInput.value = '';
    clicked = null;
    load();
}


function saveEventNew() {

    const date = eventDateInput.value;

    const fixed = date.replace(/-0+/g, '-')

    console.log(fixed)

    const [year, month, day] = fixed.split('-');

    const result = [month, day, year].join('/');



    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let x = eventFNameInputNew.value
    let y = eventLNameInputNew.value
    if (x.length > 40) {
        alert("First Name cannot contain more than 40 characters!")

    } else if (y.length > 40) {
        alert("Last Name cannot contain more than 40 characters!")

    } else if (!filter.test(eventEmailInputNew.value)) {
        alert('Please provide a valid email address')

    } else {
        if (eventFNameInputNew.value && eventLNameInputNew.value && eventEmailInputNew.value && eventTimeInputNew.value) {
            eventFNameInputNew.classList.remove('error');
            eventLNameInputNew.classList.remove('error');
            eventEmailInputNew.classList.remove('error');

            events.push({
                date: result,
                Fname: eventFNameInputNew.value,
                Lname: eventLNameInputNew.value,
                email: eventEmailInputNew.value,
                gender: eventGenderInputNew.value,
                age: eventAgeInputNew.value,
                time: eventTimeInputNew.value,

            });

            localStorage.setItem('events', JSON.stringify(events));
            closeModalNew();
        } else {
            // eventFNameInput.classList.add('error');
            // eventLNameInput.classList.add('error');
            // eventEmailInput.classList.add('error');
            alert('Please fill all necessary fields')

        }
    }
}

function saveEvent() {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let x = eventFNameInput.value
    let y = eventLNameInput.value
    if (x.length > 40) {
        alert("First Name cannot contain more than 40 characters!")

    } else if (y.length > 40) {
        alert("Last Name cannot contain more than 40 characters!")

    } else if (!pattern.test(eventEmailInput.value)) {
        alert('Please provide a valid email address')

    } else {
        if (eventFNameInput.value && eventLNameInput.value && eventEmailInput.value && eventTimeInput.value) {
            eventFNameInput.classList.remove('error');
            eventLNameInput.classList.remove('error');
            eventEmailInput.classList.remove('error');

            events.push({
                date: clicked,
                Fname: eventFNameInput.value,
                Lname: eventLNameInput.value,
                email: eventEmailInput.value,
                gender: eventGenderInput.value,
                age: eventAgeInput.value,
                time: eventTimeInput.value,

            });

            localStorage.setItem('events', JSON.stringify(events));
            closeModal();
        } else {
            // eventFNameInput.classList.add('error');
            // eventLNameInput.classList.add('error');
            // eventEmailInput.classList.add('error');
            alert('Please fill all necessary fields')

        }
    }
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        //nav = global_month
        // console.log(nav)
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        console.log(nav)
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('saveButtonNew').addEventListener('click', saveEventNew);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('cancelButtonNew').addEventListener('click', closeModalNew);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
    document.getElementById('appointment').addEventListener('click', openModalNew);
}

initButtons();
load();