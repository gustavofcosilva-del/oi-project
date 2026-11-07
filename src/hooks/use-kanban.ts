import {useEffect,useMemo,useState} from "react";
import type {Task,TaskStatus,ChecklistItem} from "@/types/kanban";
const KEY="oi-project-kanban-v2";
const seed:Task[]=[
{id:"1",title:"Planejar sprint inicial",description:"Definir as entregas prioritárias do projeto.",priority:"high",status:"todo",assignee:"Equipe",tags:["planejamento"],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),checklist:[]},
{id:"2",title:"Criar identidade visual",description:"Definir tipografia, cores e componentes principais.",priority:"medium",status:"doing",assignee:"Design",tags:["design","ui"],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),checklist:[{id:"c1",text:"Definir tipografia",completed:true},{id:"c2",text:"Definir cores",completed:false}]},
{id:"3",title:"Configurar ambiente",description:"Preparar a base React, TypeScript e Vite.",priority:"low",status:"done",assignee:"Dev",tags:["dev"],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),checklist:[]}];
export function useKanban(){
const [tasks,setTasks]=useState<Task[]>(()=>{if(typeof window==="undefined")return seed;try{const v=localStorage.getItem(KEY);return v?JSON.parse(v):seed}catch{return seed}});
const [search,setSearch]=useState(""); const [priority,setPriority]=useState<"all"|Task["priority"]>("all");
useEffect(()=>localStorage.setItem(KEY,JSON.stringify(tasks)),[tasks]);
const filteredTasks=useMemo(()=>{const q=search.trim().toLowerCase();return tasks.filter(t=>(!q||[t.title,t.description,t.assignee,...t.tags].join(" ").toLowerCase().includes(q))&&(priority==="all"||t.priority===priority))},[tasks,search,priority]);
const touch=(t:Task):Task=>({...t,updatedAt:new Date().toISOString()});
const addTask=(data:Omit<Task,"id"|"createdAt"|"updatedAt">)=>setTasks(v=>[...v,{...data,id:crypto.randomUUID(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}]);
const updateTask=(id:string,data:Partial<Task>)=>setTasks(v=>v.map(t=>t.id===id?touch({...t,...data}):t));
const deleteTask=(id:string)=>setTasks(v=>v.filter(t=>t.id!==id));
const moveTask=(id:string,status:TaskStatus)=>updateTask(id,{status});
const toggleChecklist=(taskId:string,itemId:string)=>setTasks(v=>v.map(t=>t.id===taskId?touch({...t,checklist:t.checklist.map(i=>i.id===itemId?{...i,completed:!i.completed}:i)}):t));
const addChecklistItem=(taskId:string,text:string)=>{if(!text.trim())return;const item:ChecklistItem={id:crypto.randomUUID(),text:text.trim(),completed:false};updateTask(taskId,{checklist:[...(tasks.find(t=>t.id===taskId)?.checklist??[]),item]})};
return{tasks,filteredTasks,search,setSearch,priority,setPriority,addTask,updateTask,deleteTask,moveTask,toggleChecklist,addChecklistItem};
}