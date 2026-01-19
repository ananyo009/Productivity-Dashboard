
function OpenPage() {
    var allElems = document.querySelectorAll(".elems")
var fullElems = document.querySelectorAll(".fullElems")
    var closebtn = document.querySelectorAll('.back')
    var allElemContainer = document.querySelector('.allElems')


allElems.forEach((elem) => {
    elem.addEventListener('click', function () {
        allElemContainer.style.display="none"
        fullElems[elem.id].style.display="initial"
    })
})

closebtn.forEach((back) => {
    back.addEventListener('click', function (e) {
        console.log(e.target)
        fullElems[back.id].style.display = "none"
        allElemContainer.style.display="flex"
    })
})
}
OpenPage()


function Todo() {
    let form = document.querySelector('.addTask form')
let taskInput = document.querySelector('.addTask form input')
let taskDetails = document.querySelector('.addTask form textarea')
let taskcheckbox = document.querySelector('.addTask form .mark-imp #check')


let currentTasks = []

if (localStorage.getItem("allTasks")) {
    currentTasks = JSON.parse(localStorage.getItem("allTasks"));
    renderTask();
} else {
  console.log("task is empty");
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    currentTasks.push({
        task: taskInput.value,
        details: taskDetails.value,
        imp: taskcheckbox.checked,
    })
    saveTask();
    renderTask();
    form.reset();
    
})


function renderTask() {
    saveTask()

    var allTasks = document.querySelector('.allTask')

let sum =``

currentTasks.forEach(function (elem,idx) {
    sum += `<div class="Task">
                    <h5>${elem.task}<span class=${elem.imp}>Imp</span></h5>
                     <div class="para">
                     <div id=${idx} class="detail">details      
                <div class="child">
                <p>${elem.details}</p>
        </div>
                     </div>
       
    </div>
                    <button id=${idx}>Mark as complete</button>
                </div>`;
    
            })
    allTasks.innerHTML = sum
    
    let markComplete = document.querySelectorAll('.Task button')

markComplete.forEach((btn) => {
    btn.addEventListener('click', function () {
        currentTasks.splice(btn.id, 1)
        renderTask()
    })
})

    }
    


function saveTask() {
    localStorage.setItem("allTasks", JSON.stringify(currentTasks))
}


let detailbtn = document.querySelectorAll('.detail')
    let child = document.querySelectorAll('.detail .child')
    let count
    detailbtn.forEach((btn) => {
        count =0
        btn.addEventListener('click', function (e) {
            console.log(btn)
            console.log(count)
        if (count === 0) {
            console.log(child[btn.id])
            child[btn.id].style.display = 'block';
            count = 1;
        }
        else {
            console.log(child[btn.id])
            child[btn.id].style.display = "none";
            count = 0;
        }
    })
    })

}

Todo()

function DailyPlanner() {
    
    
    let DailyContainer = document.querySelector('.daily-fullpage .day-planner')



let hours = Array.from({ length: 18 }, function (elem, idx) {
    return `${6+idx}:00 - ${7+idx}:00`
})
    
    
    

    let sum = ``
    let dayPlans 
    function renderPlanner() {
        dayPlans = JSON.parse(localStorage.getItem('Dayplan')) || {}
        console.log()
    hours.forEach((elem, idx) => {
        sum += `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input type="text" name="" id="${idx}" placeholder="..." value='${dayPlans[idx] || ''}'>
                </div>`
    })

    DailyContainer.innerHTML = sum
    }
    
    renderPlanner()

    function savePlanner() {
           localStorage.setItem("Dayplan", JSON.stringify(dayPlans));
    }
    
    let Dailyinput = document.querySelectorAll(".day-planner-time input");

    Dailyinput.forEach((elem) => {
      elem.addEventListener("input", function () {
        dayPlans[elem.id] = elem.value;
            savePlanner()
        // renderPlanner()
      });
    });

    
let reset = document.querySelector("#reset")
reset.addEventListener('click', function () {
    localStorage.removeItem('Dayplan')
    sum = ''
    location.reload()
    // savePlanner()
    renderPlanner()
})


}

DailyPlanner()


function motivation() {
    let motivationQuote = document.querySelector('.motivation-2 h3')
let motivationAuthor = document.querySelector('.motivation-3 h3')

async function fetchQuotes() {
    try {
        motivationQuote.innerHTML = "Loading ..."
        let response = await fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: { "X-Api-Key": "qK3p4ceSZuBSYJE3BqCSpHBAQZn1OO8g93SW3pXj" },
        });
        let data = await response.json();
        // console.log(data)
        motivationQuote.textContent = `${data[0].quote}`
        motivationAuthor.textContent =`- ${data[0].author}`
    }
    catch (error) {
        console.log(error)
    }
}

fetchQuotes()
}

motivation()

function pomodoro() {

let totalSec = 25 * 60;
let timer = document.querySelector('.pomo-timer h1')

function updateTime() {
    let minutes = Math.floor(totalSec / 60);
    let seconds = totalSec % 60;

    timer.innerHTML=`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`

}
let interval = null

let startbtn = document.querySelector('#start')

let stopbtn = document.querySelector('#stop')

let session = document.querySelector('section.pomo-fullpage .session')

let isworkSession = true;


startbtn.addEventListener('click', function () {
    clearInterval(interval)
    if(isworkSession) {
         interval = setInterval(() => {
           if (totalSec > 0) {
             totalSec--;
             updateTime();
           } else {
             isworkSession = false;
               clearInterval(interval);
               timer.innerHTML = `05:00`;
               session.innerHTML = 'Take a Break'
               session.style.backgroundColor = 'red'
               totalSec = 5 * 60;
           }
         }, 1000);
    } else {
         if (!isworkSession) {
           interval = setInterval(() => {
             if (totalSec > 0) {
               totalSec--;
               updateTime();
             } else {
               isworkSession = true;
               clearInterval(interval);
               timer.innerHTML = `25:00`;
               session.innerHTML = "Work Session";
               session.style.backgroundColor = "green";
               totalSec = 25 * 60;
             }
           }, 1000);
         }
    }
   
})

stopbtn.addEventListener('click', function () {
    clearInterval(interval)

})

document.querySelector("#resett").addEventListener('click',function(){
    if (isworkSession) {
        totalSec = 25*60
        updateTime()
        clearInterval(interval)
    }
    else {
        totalSec = 5*60
        updateTime()
        clearInterval(interval)
    }
})
    
}

pomodoro()

function navbar() {

    let time = document.querySelector("section.allElems header .time h1");

    let Datetop = document.querySelector("section.allElems header .time h2");

    let backImage = document.querySelector("section.allElems header");
    // console.log(backImage)

    let hours = null;

    function timeDate() {
        const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        
        const monthsofYear = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        let date = new Date()
        hours = String(date.getHours()).padStart(2,"0")
        let minutes = String(date.getMinutes()).padStart(2,"0")
        let seconds = String(date.getSeconds()).padStart(2,"0")
        let day = date.getDay()
        let daynum = date.getDate()
        let months = date.getMonth()
        let year = date.getFullYear()
        if (hours >= 12) {
            time.innerHTML = `${dayWeek[day]} , ${hours - 12}:${minutes}:${seconds} PM`
             backImage.style.backgroundImage =
                "url('https://i.pinimg.com/1200x/ec/dd/bc/ecddbcf765789dccfe4d40780d3e2eb7.jpg')";
            backImage.style.color = "white";
        }
        else {
            time.innerHTML = `${dayWeek[day]} , ${hours}:${minutes}:${seconds} AM`;
             backImage.style.backgroundImage =
                " url('https://i.pinimg.com/1200x/44/0c/35/440c35f43d6651d106ae817ae38a1895.jpg')";
            backImage.style.color = "black";
           
        }
        Datetop.innerHTML = `${daynum} ${monthsofYear[months]} ,${year}`
    }

    setInterval(function () {
        timeDate()
    },1000)
    
    let temp = document.querySelector("section.allElems header .weather h2");
    let sky = document.querySelector("#sky")
    let precipitate = document.querySelector("#preci")
   
    let humidity = document.querySelector("#humid")
 

    let data = null
    let city = 'Kolkata'
    async function fetchWeather() {
        let ApiKey = "5c5f993ed3bc45963601fdf9780d30eb";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
        let response = await fetch(url);
        data = await response.json();
        console.log(data)

        temp.innerHTML = `${data.main.temp}°C `;
        sky.innerHTML = `${data.weather[0].description}`
        precipitate.innerHTML = `feels like : ${data.main.feels_like} °C`;
        humidity.innerHTML = `humidity: ${data.main.humidity} %`

    }

    fetchWeather()



}
navbar()


function ExpenseTracker() {

    let expenseHolder = [];

    if (localStorage.getItem('Expense')) {
        expenseHolder = JSON.parse(localStorage.getItem("Expense"));
    } else {
        expenseHolder = []
    }
    let inputexpense = document.querySelector('#expense-name')
    let inputamt = document.getElementById('amount')
    let totalamt = document.querySelector(".total h3");



    let container = document.querySelector(
        "section.expense-fullpage .container .expenses .allExpense"
    );

    let form = document.querySelector(
        "section.expense-fullpage .container .expense-input form",
    );
    renderExpenses()

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        expenseHolder.push({
            name: inputexpense.value,
            amount: inputamt.value,
        })
        saveExp()
        renderExpenses()
        form.reset()
    })

    function saveExp() {
        localStorage.setItem('Expense', JSON.stringify(expenseHolder))
    }



    function renderExpenses() {
        saveExp()
        let sum = ``
        expenseHolder.forEach(function (elem, idx) {
            sum += ` <div class="data">
                        <p>${elem.name}</p>
                        <p>Rs ${elem.amount}</p>
                        <button class="deleted" id="${idx}">delete</button>
                    </div>`;
        
        })
        container.innerHTML = sum
    
        let total = 0
        total = expenseHolder.reduce(function (acc, val) {
            return acc + Number(val.amount)
        }, 0)
    
        totalamt.innerHTML = `total amount = Rs ${total}`

        let deletebtn = document.querySelectorAll(".deleted");

        deletebtn.forEach((btn) => {
            btn.addEventListener('click', function () {
                // console.log(btn.id);
                expenseHolder.splice(btn.id, 1)
                renderExpenses()
            })
        })
    
   
    }
}
ExpenseTracker()


function themechange(){
    
let themebtn = document.querySelector('.theme')

let rootElement = document.documentElement
let flag = 0

themebtn.addEventListener('click', function () {
    if (flag == 0) {
        rootElement.style.setProperty("--prim", "#3A0519");
        rootElement.style.setProperty("--sec", "#670D2F");
        rootElement.style.setProperty("--ter", "#A53860");
        rootElement.style.setProperty("--quad", "#EF88AD");
        flag =1
    }
    else if (flag == 1) {
        

        rootElement.style.setProperty("--prim", "#2D033B");
        rootElement.style.setProperty("--sec", " #810CA8");
        rootElement.style.setProperty("--ter", " #C147E9");
        rootElement.style.setProperty("--quad", "#E5B8F4");
        flag =2
    }
    else {
          rootElement.style.setProperty("--prim", "#213448");
          rootElement.style.setProperty("--sec", " #547792");
          rootElement.style.setProperty("--ter", " #94B4C1");
          rootElement.style.setProperty("--quad", "#EAE0CF");
        flag =0
    }

})
}

themechange()
