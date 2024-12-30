import React from 'react'

import { useActiveFunctionality } from '../hooks/useActiveFunctionality'

import TasksList from '../components/Dashboard/TasksList/TasksList'

const Dashboard: React.FC = React.memo(() => {
  const { activeFunctionality } = useActiveFunctionality()

  const renderActiveFunctionality = () => {
    switch(activeFunctionality) {
      case 'Tasks': return <TasksList />
      default: return null
    }
  }

  return (
    <section className='flex flex-col h-full w-full'>
      <Header />
      {renderActiveFunctionality()}
    </section>
  )
})

/* When the function of displaying notifications for the user is available,
an appropriate icon will be displayed depending on whether there is a notification or not. */
const Header: React.FC = React.memo(() => {
  return (
    <div className='flex justify-end items-center h-8 w-full pr-4 pt-4'>
      <svg className='h-6 w-6 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="currentColor" d="M5.5 18.77q-.213 0-.356-.145T5 18.268t.144-.356t.356-.143h1.116V9.846q0-1.96 1.24-3.447T11 4.546V4q0-.417.291-.708q.291-.292.707-.292t.709.292T13 4v.546q1.904.365 3.144 1.853t1.24 3.447v7.923H18.5q.213 0 .356.144q.144.144.144.357t-.144.356t-.356.143zm6.497 2.615q-.668 0-1.14-.475t-.472-1.14h3.23q0 .67-.475 1.142q-.476.472-1.143.472M7.616 17.77h8.769V9.846q0-1.823-1.281-3.104T12 5.462t-3.104 1.28t-1.28 3.104z" /> </svg>
      {/* <svg className='h-6 w-6 fill-brand-50 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M11.997 21.385q-.668 0-1.14-.475q-.472-.474-.472-1.14h3.23q0 .67-.475 1.143q-.476.472-1.143.472M5.5 18.769q-.213 0-.356-.144T5 18.268t.144-.356t.356-.143h1.116V9.846q0-1.96 1.24-3.447T11 4.546V4q0-.417.291-.708q.291-.292.707-.292t.709.292T13 4v.075q-.217.339-.38.683t-.255.732l-.178-.02Q12.1 5.462 12 5.462q-1.823 0-3.104 1.28t-1.28 3.104v7.923h8.769v-6.078q.238.045.491.071t.508.007v6H18.5q.213 0 .356.144q.144.144.144.357t-.144.356t-.356.143zm11.464-9.365q-1.041 0-1.772-.729t-.73-1.769t.728-1.772t1.77-.73t1.77.728t.732 1.77t-.729 1.771t-1.77.73" /> </svg> */}
    </div>
  )
})

export default Dashboard