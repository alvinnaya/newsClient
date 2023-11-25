import { useContext,useState } from 'react';
import { AppStateContext,AppStateProvider } from '@/components/AppStateContext';

const HeadlineEdit = (props) => {
  const {setEditor,editor,setCard,card} = useContext(AppStateContext);
  const [Image,setImage] = useState(false)
    const HandleContentChange = (e)=>{
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        // console.log(range.startOffset, range.endOffset);
        if(range.endOffset - range.startOffset == 0){
          const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
          newContent[editor.index.cardIndex].components[editor.index.componentIndex].contents.target = e.target.innerText ; // Mengganti nilai contents pada komponen pertama
          setCard(newContent);
        }
        }

    const HandleImage = ()=>{
        setImage(true)
    }

       const handleselect = (e)=>{
      
        if(e.shiftKey){
          let condition = true;
          componentsSelect.map((item)=>{
            console.log(item)
            if(item == card[props.page].components[props.componentIndex] ){
              condition = false
              console.log("the same")
              return;
            }
          })
          console.log(condition)
          if(!isSelected && condition ){
          
            console.log('shift')
            const newSelectedComponent = [...componentsSelect,card[props.page].components[props.componentIndex]]
            console.log('new',newSelectedComponent)
            setComponentsSelect(newSelectedComponent)
            console.log(componentsSelect)
            setIsSelected(true)
          }else{
            return;
          }
          
        }else{
        console.log(componentsSelect.length)
        console.log( [card[props.page].components[props.componentIndex]])
        setComponentsSelect([card[props.page].components[props.componentIndex]])
        setIsSelected(false) 
        }
      }

    return (
        <>

            <div className='w-full h-full h-[min-content] ' style={{zIndex:`1`,gridColumnStart: `2`,gridColumnEnd: `10`,gridRowStart: `6`,gridRowEnd: `10`}}>
                  <div onClick={HandleImage} className='w-full h-full ' style={{}}>
                    <img className={`w-full h-full object-cover`}  src='https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'/>
                  </div>
            </div>
            <div style={{zIndex:`4`,gridColumnStart: `2`,gridColumnEnd: `10`,gridRowStart: `3`,gridRowEnd: `5`}}>
             <p  onBlur={HandleContentChange} contentEditable={true} className="block font-bold box-border w-full leading-[1.1] text-[4rem] focus:outline-none focus:border-zinc-300 border-transparent rounded-lg p-2 border-2 ">
                {props.all.contents.Text}
             </p>
            </div>
            <div className='w-full h-full bg-gradient-to-r from-primary to-transparent rotate-90 ' style={{zIndex:`3`,gridColumnStart: `1`,gridColumnEnd: `11`,gridRowStart: `1`,gridRowEnd: `11`}}>

            </div>
        </>
    );
};

export default HeadlineEdit;