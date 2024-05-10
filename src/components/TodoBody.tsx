"use client"

import React, { MouseEventHandler, useState } from 'react'
import { createPortal } from 'react-dom';
import { IoMdRadioButtonOn, IoMdRadioButtonOff, IoMdTrash } from 'react-icons/io';

function TodoBody() {
  const [showModal, setShowShowModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 bg-white w-full p-[12px_12px_48px_12px] text-gray-400 shadow-[0_5px_20px_-15px_rgba(0,0,0,0.3)]">
      {
        todos.length
          ? todos.map((todo: string, idx: number) => (
            <TodoItem
              key={idx}
              idx={idx}
              setTodos={setTodos}
              todo={todo} />
          ))
          : "No Todos Yet!"
      }
      <button
        className="absolute bottom-[-30px] left-[184] bg-[#af7eea] text-white p-4 rounded-3xl h-[60px]"
        onClick={() => setShowShowModal(true)}
      >
        + New Todo
      </button>
      {
        showModal && createPortal(
          <TodoModal
            setTodos={setTodos}
            onClose={() => setShowShowModal(false)} />,
          document.body
        )
      }
    </div>
  )
}

const TodoItem = ({
  todo,
  idx,
  setTodos
}: {
  idx: number
  todo: string,
  setTodos: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const handleTodoDelete = (e) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos.slice(0, idx), ...prevTodos.slice(idx + 1)];
      return newTodos;
    })
  }

  return (
    <div onClick={() => setIsSelected(!isSelected)} className="flex flex-row items-center justify-start gap-4 w-4/5">
      {isSelected
        ? <IoMdRadioButtonOn className='cursor-pointer' />
        : <IoMdRadioButtonOff className='cursor-pointer' />
      }
      {todo}
      {isSelected
        ? <IoMdTrash
          onClick={handleTodoDelete}
          className='cursor-pointer' />
        : null
      }
    </div>
  )
}

const TodoModal = (
  { onClose,
    setTodos
  }:
    {
      onClose: MouseEventHandler<HTMLButtonElement>
      setTodos: React.Dispatch<React.SetStateAction<string[]>>
    }
) => {
  const [currTodo, setCurrTodo] = useState<string>('')
  const handleAddTodos = (e) => {
    if (currTodo.length) {
      setTodos((prevTodos) => [...prevTodos, currTodo])
      onClose(e)
    }
  }

  return (
    <div className="absolute h-screen w-screen backdrop-brightness-50 bg-transparent flex justify-center items-center">
      <div className=" bg-white p-4 rounded-xl flex flex-row items-center justify-center gap-4">
        <input
          className="focus:outline-none rounded-lg p-2 border-zinc-300 border-2" placeholder="Enter Todo Title"
          onChange={(e) => { setCurrTodo(e.target.value) }}
        />
        <button
          onClick={handleAddTodos}
          className='bg-[#af7eea] text-white p-2 rounded-lg cursor-pointer'>
          Add Todo
        </button>
        <button
          onClick={onClose}
          className='bg-[#af7eea] text-white p-2 rounded-lg cursor-pointer'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default TodoBody