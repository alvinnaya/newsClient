

function Card({children,color,gradient}) {



//ini harus disimpan di state
  return (
    <>
        <div style={{backgroundImage:gradient ,backgroundColor: color, gridTemplateColumns: 'repeat(10, minmax(0, 1fr))', gridTemplateRows: 'repeat(12, minmax(0, 1fr))'}} className ={`border-2 border-neutralPrimary1 overflow-hidden font-body m-0 p-0 text-preSecondary bg-neutralPrimary1 rounded-xl w-full h-full aspect-[5/6] grid  auto-rows-fr auto-cols-fr`}>
       {children}
        </div>
    </>
  )
}

export default Card
