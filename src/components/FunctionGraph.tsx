interface Props{a:number;b:number}
export default function FunctionGraph({a,b}:Props){
const w=520,h=340,p=42,xMin=-10,xMax=10,yMin=-20,yMax=20
const xp=(x:number)=>p+((x-xMin)/(xMax-xMin))*(w-p*2)
const yp=(y:number)=>h-p-((y-yMin)/(yMax-yMin))*(h-p*2)
const xAxis=yp(0),yAxis=xp(0),y1=a*xMin+b,y2=a*xMax+b
return <div className="graph-box"><svg viewBox={'0 0 '+w+' '+h} aria-label={'Gráfico de f(x) = '+a+'x + '+b}><defs><pattern id="grid" width="31" height="31" patternUnits="userSpaceOnUse"><path d="M31 0L0 0 0 31" fill="none" stroke="rgba(148,163,184,.25)"/></pattern></defs><rect x={p} y={p} width={w-p*2} height={h-p*2} fill="url(#grid)"/><line x1={p} y1={xAxis} x2={w-p} y2={xAxis} stroke="currentColor"/><line x1={yAxis} y1={p} x2={yAxis} y2={h-p} stroke="currentColor"/><line x1={xp(xMin)} y1={yp(y1)} x2={xp(xMax)} y2={yp(y2)} stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><circle cx={xp(0)} cy={yp(b)} r="6" fill="currentColor"/><text x={w-p+5} y={xAxis-6} fontSize="13">x</text><text x={yAxis+8} y={p-7} fontSize="13">y</text><text x={yAxis+8} y={yp(b)-10} fontSize="12">b = {b}</text></svg></div>}