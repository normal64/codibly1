import React,{useEffect,useState} from 'react';
import codibly from "../apis/codibly";
import { Pagination,List, Input } from 'semantic-ui-react';
import renderList from "../helper-functions/renderList";
import {setFilterValue} from "../actions/";
import {store} from "../index";



const Products = (props) => {

    const [response, setResponse] = useState();
    const [filter, setFilter] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState()
    const [responseForPagination, setResponseForPagination] = useState();
    
    const getData = async() => {
    
        const res = await codibly.get("", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}
          });
        setResponse(res.data);
        setTotalItems(res.data.total)
        prepareForPagination(res.data,pageSize,page)
    }

    const prepareForPagination = (response,pageSize,page) =>{
        console.log(`page`, page);
        console.log(`totalItems`, totalItems);
        console.log("totalItems /page",totalItems/page);
        
        let start = Number( (page - 1) * pageSize + 1);
        let end = start -1  + pageSize;
        let niceResponse = response.data.filter(elem =>  {
            if(elem.id >= start && elem.id <= end){
                return elem
            } 
        }    )
        setResponseForPagination(niceResponse)
        console.log("start",start)
        console.log("end",end)
        console.log(`niceResponse`, niceResponse);
    }
    
    useEffect(() => {
        getData()
    }, [])
    console.log(`response`, response);
    //  console.log(`store`, store);
    

    const onFormChange = (e) =>{
        if(isNaN(e.target.value  ) == true){
            return
        }
        if(e.target.value == ""){
            setFilter(e.target.value);
            return
        }
        setFilter(e.target.value);
        store.dispatch(setFilterValue(e.target.value)   );
    }
    

    
    return (
        <div className="ui container center aligned"  >
            {response ?
            <div>
            <Input value={filter || ""} onChange={(e) => {onFormChange(e) } } focus placeholder='Type an ID to filter results' />
            <List>
               {responseForPagination?  renderList(responseForPagination,filter) : "Loading.."} 
            </List>
            <Pagination 
            defaultActivePage={page} 
            totalPages={response.total_pages} 
            onPageChange={(event, data) =>{
                console.log("active datapage",data.activePage)
                // setPage(data.activePage)
                prepareForPagination(response,pageSize,data.activePage)
            } }
            />
            </div>
            :
            "loading.."
        }
        </div>
        
    )
}

export default Products
