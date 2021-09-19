import { useState ,useEffect} from 'react';
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';
import Feuille from './components/feuille';
import Popup from './components/popup';

function App() {

  const [donnees, setstate] = useState([])
  const [showPopup,setShowPopup]=useState(true)
  const [popupMessage,setPopupMessage]=useState("Bonjour!!! Bienvenu sur mon texte technique. Prenez plaisir à le découvrir.")
  const [popupType,setPopupType]=useState("")

  useEffect(()=>{
    setstate([])
    setPopupType("safe")
    
    axios.get('http://localhost:8000/employes')
    .then(response => {

      let data = []
      let latestCity=""
      let marquesdata=[]

      response.data.forEach(item => {
        if(latestCity!==item.ville.nom){

          
          if(marquesdata.length!==0){
            
            data.push({city:latestCity,marques: marquesdata})
            
            marquesdata=[]
            
          }

          latestCity=item.ville.nom

        }

        marquesdata.push(item)
      });
      
      data.push({city:latestCity,marques: marquesdata})


      setstate(data)

    })

  },[])

  const handleOnDragEnd =(result)=>{
    if (!result.destination) return;
    if(result.source.index > result.destination.index){
      setPopupType("danger")
      setShowPopup(true)
      setPopupMessage(" Ce mouvement n'est pas autorisé.")
      return;
    } 
    console.log(result.source)
    console.log("destination : "+result.destination)
    const items = Array.from(donnees);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setstate(items);
  }




  
  
  return (
    <div className="App">
      <Popup
        showPopup={showPopup}
        callback = {(state)=>{setShowPopup(state)}}
        message = {popupMessage}
        popupType = {popupType}
      />
      <header className="header">
        <div>Test technique SustainEcho</div>
        <div>Prince Nick BALLO</div>

      </header>
      <main className="body">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="boxes" >
            {(provided)=>(

              <div className="boxes" {...provided.droppableProps} ref={provided.innerRef}>
                {donnees.map((items,index) => {
                  return(
                    <Draggable  key={index} draggableId={""+index} index={index} >
                      {(provided)=>(
                        <div className="box" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="parent"><Feuille>{items.city}</Feuille></div>
                          {items.marques.map((item) => {
                            return(
                              <div className="fils">
                                <div  className="ligne">
                                  <Feuille>{item.marque.nom}</Feuille>
                                  <Feuille>{item.nb_employe}</Feuille>
                                </div>
                              </div>
                            )})
                          }
                        </div>

                      )}
                    </Draggable>
                    
                  )})
                }
                {provided.placeholder}
                
              </div>
            )}
          </Droppable>
        </DragDropContext>
   
      </main>
    </div>
  );
}

export default App;
