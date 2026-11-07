export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "backlog" | "todo" | "doing" | "done";
export interface Task { id:string; title:string; description:string; priority:TaskPriority; status:TaskStatus; assignee:string; tags:string[]; dueDate?:string; createdAt:string; }
export interface KanbanColumn { id:TaskStatus; title:string; description:string; }
export const columns:KanbanColumn[]=[
 {id:"backlog",title:"Backlog",description:"Ideias e tarefas futuras"},
 {id:"todo",title:"A fazer",description:"Prontas para começar"},
 {id:"doing",title:"Em andamento",description:"Tarefas em execução"},
 {id:"done",title:"Concluído",description:"Finalizadas"},
];
export const priorityLabels:Record<TaskPriority,string>={low:"Baixa",medium:"Média",high:"Alta",urgent:"Urgente"};
export const priorityClasses:Record<TaskPriority,string>={low:"bg-slate-100 text-slate-700 border-slate-200",medium:"bg-blue-50 text-blue-700 border-blue-200",high:"bg-amber-50 text-amber-700 border-amber-200",urgent:"bg-red-50 text-red-700 border-red-200"};