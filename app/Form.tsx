'use client';

import React, { useState, useRef } from "react";
import "../app/globals.css";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page? 
   * ¿Es este el principal llamado a la acción en la página?
   */
  primary?: boolean;
  /**
   * What background color to use
   * Qué color de fondo usar
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   * ¿Qué tamaño debe tener el botón?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Contenido del botón
   */
  label: string;
  /**
   * Optional click handler
   * Controlador de clics opcional
   */
  onClick?: () => void;
}


type FormElemEvent = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function Form(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElemEvent): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
    
  };

  return (
    <div className="sm:bg-white rounded-none w-[80%] m-auto bg-black sm:px-[40px] py-[10px] sm:rounded-3xl shadow-[0px_0px_19px_1px_#a0aec0] max-w-6xl sm:max-w-4xl sm:w-[100%] sm:m-0" >

      <div className="flex justify-center items-center">
          <div  className="bg-black text-white sm:text-black sm:bg-white w-[80%] md:p-[40px] rounded-3xl md:w-[100%] ">
            <div className="flex justify-center">
              <h1 className="text-sm sm:text-xl text-center py-3 italic font-bold md:text-2xl">Write your homework for the day!</h1>
            </div>

            <div className="w-full">
              <form onSubmit={handleSubmit}  className="flex flex-col">
                <input
                  type="text"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  ref={taskInput} 
                  className="max-w-[90%] sm:w-[100%] m-auto bg-green-200 rounded-full px-[20px] md:px-6 py-2 "
                  maxLength={50}
                  size={50}
                  required
                  autoFocus

                />
                
                <button className="m-auto py-2 text-white rounded-full bg-green-700 my-4 text-xl w-[50%]">Save</button>
              </form>


              {tasks.map((t: ITask, i: number) => (
                
                
                <div key={i} className="max-w-4xl px-5 sm:px-10 my-6 before:p-2 text-2xl border-solid border-2 border-sky-500 rounded-3xl">
                  <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                    {t.name}
                  </h2>
                  <div className="p-2 sm:p-4 flex items-center justify-center">
                    <button
                      onClick={() => toggleDoneTask(i)}
                      className="bg-green-500 rounded-full px-4 py-2 mx-2 text-xl sm:text-2xl"
                      
                    >
                      {t.done ? "✗" : "✓"}
                    </button>
                    <button
                    className="bg-red-500 rounded-full px-4 py-2 mx-2 text-xl sm:text-2xl"
                      onClick={() => removeTask(i)}
                      
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        
      </div>
    </div>
  );
}

export default Form;
