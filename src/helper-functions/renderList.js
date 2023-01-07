import { Pagination,List, Input,Message } from 'semantic-ui-react';
import '../css/renderList.css'

const renderList = (response,filter) =>{

    return response.map( el =>{
       console.log(`el.id`, el.id);
        if(el.id == filter && filter){
            return(

                <List.Item  key={el.id} style={{backgroundColor: el.color} }>
                    
                    ID:{el.id} Name: {el.name} Year:{el.year}
                    
                        
                    </List.Item> 
            )
        }
        else if(!filter){
            return(
                <List.Item key={el.id} style={{backgroundColor: el.color} }>ID:{el.id} Name: {el.name} Year:{el.year}</List.Item> 
            )
        }
    })
}
export default renderList;