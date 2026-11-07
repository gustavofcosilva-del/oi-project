export type Section='home'|'lessons'|'practice'|'graphs'|'enem'|'progress'
export interface Lesson{id:string;title:string;subtitle:string;icon:string;concepts:string[];explanation:string[];example?:string}
export interface Question{id:number;source:'Aula'|'Propostos'|'ENEM';text:string;options:string[];answer:number;topic:string}