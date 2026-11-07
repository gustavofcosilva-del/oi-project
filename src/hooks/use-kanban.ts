import {useEffect,useMemo,useState} from "react";
import type {Task,TaskStatus} from "../types/kanban";
const KEY="oi-project-kanban-v1";
const seed:Task[]=[{id:"1",title:"Planejar sprint inicial",description:"Definir as entregas prioritárias do projeto.",priority:"high",status:"todo",assignee:"Equipe",tags:["planejamento"],createdAt:new Date().toISOString()},{id:"2",title:"Criar identidade visual",description:"Definir tipografia, cores e componentes principais.",priority:"medium",status:"doing",assignee:"Design",tags:["design","ui"],createdAt:new Date().toISOString()},{id:"3",title:"Configurar ambiente",description:"Preparar a base React, TypeScript e Vite.",priority:"low",status:"done",assignee:"Dev",tags:["dev"],createdAt:new Date().toISOString()}];
export function useKanban(){
 const [tasks,setTasks]=useState<Task[]>(()=>{if(typeof window==="undefined")return seed;try{const v=localStorage.getItem(KEY);return v?JSON.parse(v):seed}catch{return seed}});
 const [search,setSearch]=useState(""); const [priority,setPriority]=useState<"all"|Task["priority"]>("all");
 useEffect(()=>localStorage.setItem(KEY,JSON.stringify(tasks)),[tasks]);
 const filteredTasks=useMemo(()=>{const q=search.toLowerCase().trim();return tasks.filter(t=>(!q||[t.title,t.description,t.assignee,...t.tags].join(" ").toLowerCase().includes(q))&&(priority==="all"||t.priority===priority))},[tasks,search,priority]);
 const addTask=(data:Omit<Task,"id"|"createdAt">)=>setTasks(v=>[...v,{...data,id:crypto.randomUUID(),createdAt:new Date().toISOString()}]);
 const updateTask=(id:string,data:Partial<Task>)=>setTasks(v=>v.map(t=>t.id===id?{...t,...data}:t));
 const deleteTask=(id:string)=>setTasks(v=>v.filter(t=>t.id!==id));
 const moveTask=(id:string,status:TaskStatus)=>updateTask(id,{status});
 return {tasks,filteredTasks,search,setSearch,priority,setPriority,addTask,updateTask,deleteTask,moveTask};
}