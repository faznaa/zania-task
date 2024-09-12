import Modal from "@/components/Modal";
import SingleTask from "@/components/Task";
import React, { useEffect, useState } from "react";

export default function Task() {
  const dummyTasks = [
    {
      id: 1,
      category: "Shopping",
      title: "Shopping",
      status: "pending",
      description: "Get essentials from Trader Joe&#39;s",
    },
    {
      id: 2,
      category: "Shopping",
      title: "Shoes",
      status: "pending",
      description: "Purchase running shoes",
    },
    {
      id: 3,
      category: "Work",
      title: "Presentation",
      status: "pending",
      description: "Create slides for team meeting",
    },
    {
      id: 4,
      category: "Work",
      title: "Review",
      status: "pending",
      description: "Review frontend team&#39;s pull request",
    },
    {
      id: 5,
      category: "Home",
      title: "Garage",
      status: "pending",
      description: "Organize tools and discard unnecessary items",
    },
    {
      id: 6,
      category: "Home",
      title: "Plants",
      status: "pending",
      description: "Water indoor and outdoor plants",
    },
    {
      id: 7,
      category: "Health",
      title: "Exercise",
      status: "pending",
      description: "Complete 30-minute yoga session",
    },
    {
      id: 8,
      category: "Health",
      title: "Appointment",
      status: "pending",
      description: "Visit dentist for routine check-up",
    },
  ];
  const [tasks, setTasks] = useState(dummyTasks);
  const [isModalOpen,setModalOpen] = useState(false)
  const [searchWord, setSearchWord] = useState('')
  const [inputTask,setInputTask] = useState({
    title:'',
    description:'',
    category:'',
    status:'',
  })
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const handleInputTask = (key:string,e:any) => {
    setInputTask({
        ...inputTask,
        [key]:e.target.value
    })
  }
  const handleAdd = () => {
    if(inputTask.title == '' || inputTask.description == '') {
        alert('Cannot add empty task')
        return;
    }
    const lastTask = tasks.at(tasks.length -1)
    if(!lastTask || !lastTask.id) return;
    setTasks([...tasks,{
        ...inputTask,
        status:'pending',
        id:lastTask.id+1,
    }])
    setModalOpen(false)
  }
  const handleDeleteTask = (id:number) => {
    const _tasks = tasks.filter(_task => _task.id !== id)
    setTasks(_tasks)
  }
  const handleDoneTask = (id:number) => {
    const _tasks = tasks.map(_task => _task.id == id ? ({..._task,status:'done'}): _task)
    setTasks(_tasks)
  }
  const handleSearch = () => {
    const _tasks = tasks.filter(_task => _task.category.toLowerCase() == searchWord)
    setFilteredTasks(_tasks)

  }
  useEffect(() => {
    if(tasks) {
        setFilteredTasks(filteredTasks)
    }
  },[tasks])

  const handleCancel = () => {
    setFilteredTasks(tasks)
    setSearchWord('')

  }


  return <div className="w-screen h-full min-h-screen sm:py-10">

        <div className="flex gap-x-2 w-full max-w-md mx-auto justify-between text-base">
            <button className="px-2 bg-gray-800" onClick={() => setModalOpen(true)}>Add task</button>
            <input className="text-black" placeholder="Search by category" onChange={(e) => setSearchWord(e.target.value)}/>
            <button className="px-2 bg-gray-800" onClick={() => handleSearch()}>Search</button>
            <button className="px-2 bg-gray-800" onClick={() => setFilteredTasks(tasks)}>Cancel</button>
        </div>

        <Modal open={isModalOpen} setOpen={setModalOpen}>
            <div className="text-black">
            <input className="" onChange={(e) => handleInputTask('title',e)} placeholder="Title"/>
            <input className="" onChange={(e) => handleInputTask('description',e)}  placeholder="Description"/>
            <input className="" onChange={(e) => handleInputTask('category',e)}  placeholder="Category"/>
            <div className="flex my-4 gap-x-6">
            <button className="px-2 bg-gray-800" onClick={() => handleAdd()}>Add</button>
            <button className="px-2 bg-gray-800">Cancel</button>
            </div>

            </div>
        </Modal>
        <div className="flex flex-col  justify-center items-center">
        {filteredTasks?.map(_task => <div key={_task.id}>
            <SingleTask data={_task} handleDone={handleDoneTask} handleDelete={handleDeleteTask}/>
        </div>)}
        </div>
  </div>;
}
