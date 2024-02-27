import { useEffect } from "react";
import AuthUser from "../auth/AuthUser";

export const FetchData = (link,details,setDetails) => {

    const {http} = AuthUser();
    useEffect(()=> {
        fetch(link)
    },[link]);

    async function fetch(link){
        try {
            if (link.url) {
                const response = await http.get(link.url);
                setDetails(response.data.datos);
            }else{
                const response = await http.get(link);
                setDetails(response.data.datos);
            }
        }catch (error) {
            console.log(error);
        }
    }

    return {details,fetch};
}

export async function orderColumn(url,e,http,setDetails,fetchData = false,link){

    let {value,name} = ""
    if (!e.target) {
      
        name  = e.params
        value = ""
    }else{
        value  = e.target.value
        name = e.target.name
    }

    try {
        const response = await http.get(url+value+'/'+name);
        setDetails(response.data.datos);
    
    }catch (error) {
        console.log(error);
       
        fetchData(link)
    }
}

export function paginator(listPaginate,fetch) { 

    return Object.values(listPaginate).map((elemento,index) => (
        <li className="page-item mt-3" key={index}>
        {
            <button id={elemento.label} className={elemento.active ? 'active page-link' : 'page-link'} onClick={()=> {fetch(elemento.url)}} tabIndex={elemento.id}>{elemento.label}</button>
        }
        </li>
    ))
}


