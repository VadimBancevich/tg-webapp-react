import React, { useState } from 'react'
import style from './App.css';
import { TopPanel } from './components/TopPanel';
import { SelectServices } from './components/SelectServices'
import { SelectEmployee } from './components/SelectEmployee';
import { SelectDate } from './components/SelectDate';
import { Confirm } from './components/Confirm';

const getDataFromForm = (formElement) => {

  const result = {}

  const fd = new FormData(formElement)

  for (let e of fd.entries()) {

    const key = e[0]
    const value = e[1]

    if (result[key] === undefined) {
      result[key] = value
    } else {

      const type = typeof result[key]
      if (type === 'array') {
        result[key].push(value)
      } else {
        result[key] = [result[key], value]
      }
    }


  }

  return result


}

function App() {

  const [stepIndex, setSetpIndex] = useState(0)

  const [fd, setFd] = useState({
    services: [],
    employee: {},
    dateTime: undefined
  })

  console.log(fd)

  const handleNext = () => {
    if (stepIndex < steps.length) {
      setSetpIndex(stepIndex + 1)
    }
  }

  const handleBackClick = () => {
    if (stepIndex > 0) {
      setSetpIndex(stepIndex - 1)
    }
  }

  const handleServiceSelect = (name) => {
    setFd({ ...fd, services: [...fd.services, name] })
  }

  const handleServiceDiselect = (name) => {
    setFd({ ...fd, services: fd.services.filter(s => s !== name) })
  }

  const handleEmployeeSelect = (empl) => {
    setFd({ ...fd, employee: empl })
  }

  const handleSelectDate = (timeStamp) => {
    setFd({ ...fd, dateTime: timeStamp })
  }

  const steps = [
    {
      el: <SelectServices
        onServiceSelect={handleServiceSelect}
        onServiceDiselect={handleServiceDiselect}
        selectedKeys={fd.services}
      />
    },
    {
      el: <SelectEmployee onEmplSelect={handleEmployeeSelect} selectedEmpl={fd.employee.id} />
    },
    {
      el: <SelectDate {...fd} onSelect={handleSelectDate} selectedTimestamp={fd.dateTime} />
    },
    {
      el:<Confirm {...fd}/>
    }
  ]

  return (

    <div className='layout'>

      <header className='header'>

        <TopPanel
          title={"Choose service"}
          onBackClick={handleBackClick}
          showBack={stepIndex > 0}
        />

      </header>

      <section className='content'>

        {steps[stepIndex].el}

      </section>

      <footer className='footer'>

        {

          fd.services.length > 0 && stepIndex === 0 ||
            fd.employee.id && stepIndex === 1 ||
            fd.dateTime && stepIndex === 2 ||
            stepIndex === steps.length

            ?

            <button className='next_btn' onClick={handleNext}>{stepIndex !==3?  "next":"ORder"}</button> : ''
        }

      </footer>

    </div >

  );

}

export default App;
