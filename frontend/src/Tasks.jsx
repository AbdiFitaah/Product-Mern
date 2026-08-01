import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"

/// waa function ka api aa daayo ee soo helaayo
async function createNewtodo(newToDo) {

    const response = await fetch("http://localhost:3000/api/task",{
        method:'POST',
        headers:{'Content-Type': "application/json"},
        body: JSON.stringify(newToDo)
    })
    if (!response.ok) {
        throw new Error("Failed to create");
      }

    return response.json()
}

const Tasks = () => {

  const { data } = useQuery({
        queryKey:['tasks'],
        queryFn: () => fetch("http://localhost:3000/api/task/mytask/").then( res=>res.json())
    })

    const [ title,setTitle] = useState("")
    const queryClient = useQueryClient()

   const mutation = useMutation({
        mutationFn:createNewtodo,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['tasks']})
            console.log("TasK Created")
        }
    })

    const handleAdd = () => {
        console.log("object")
        mutation.mutate({ title : title, status:"pending"})
    }   

  return (

        <>
       <input 
            type="text"  
            onChange={(e)=>setTitle(e.target.value)}
            />
       <Button>Register</Button>

        <div>
            <h1>All Tasks</h1>
            { data?.map((task =>  <h3> { task.title } </h3>))}
        </div>
    </>
  )
}

export default Tasks