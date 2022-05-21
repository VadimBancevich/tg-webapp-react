export const fetchServices = async () => {

    return new Promise((resolve) => {
        setTimeout(() => resolve(["Стрижка", "Стрижка бороды", "Супер стрижка", "Супер пупер стрижка"]), 500)
    })

}

class Employee {

    id;
    firstName;
    lastName;
    imageUrl;

    constructor(id, firstName, lastName, imageUrl) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;

    }

}

const employees = [
    new Employee(1, "Иван"),
    new Employee(2, "Антон"),
    new Employee(3, "Ольга"),
    new Employee(4, "Дмитрий", "Куль")
]

export const fetchEmployees = async () => {

    return new Promise((resolve) => {
        setTimeout(() => resolve(employees), 2000)
    })

}




const availableDates = []

const date = new Date()


for (let i = 0; i < Math.random() * 10; i++) {




}

class Time {
    time;
    constructor(time) {

    }
}

class Day {
    day;
    aTimes;
    constructor(day, aTimes) {

    }
}

class Month {
    month
    aDays;
    constructor(month, availableDays) {
        this.month = month;
        this.aDays = availableDays;
    }
}

class AvailableDate {
    monthes
    constructor(monthes) {
        this.monthes = monthes
    }
}

new AvailableDate([new Month(1, [new Day(2, [new Time("10:00")])])])

const j = {
    monthes: [
        {
            month: "April",
            monthIndex: 5,
            days: [
                {
                    day: "1",
                    times: [
                        "10:00", "10:05", "10:10", "11:20", "11:25"
                    ]
                }
            ]
        }
    ]
}

export const getAvailableTimes = async (emplId, monthIndex, dayNumber, servicesIds) => {

    await new Promise((res) => { setTimeout(() => res(), 1000) })

    const t = []

    let temp = "10:00"

    while (temp !== "20:05") {
        t.push(temp)

        const time = temp.split(":")
        let hours = time[0]
        let minutes = time[1]

        if (minutes === "55") {
            hours = (Number.parseInt(hours) + 1).toString()
            minutes = "00"
        } else {
            if (minutes.endsWith('0')) {
                minutes = minutes.charAt(0) + "5";
            } else {
                minutes = (Number.parseInt(minutes.charAt(0)) + 1).toString() + "0"
            }
        }

        temp = `${hours}:${minutes}`

    }

    return t

}