import { useEffect } from "react";
import AuthUser from "../auth/AuthUser";
const {http} = AuthUser();

export const FetchData = (link,details,setDetails) => {
    useEffect(()=> {
        fetch(link)
    },[link]);

   

    async function fetch(link){
        if (link.url) {
            try {
            const response = await http.get(link.url);
            console.log(response.data.datos);
            setDetails(response.data.datos);
            }catch (error) {
            console.log(error);
            }
        }else{
            try {
            const response = await http.get(link);
            console.log(response.data.datos);
            setDetails(response.data.datos);
            }catch (error) {
            console.log(error);
            }
        }
    }

    return {details,fetch};
}

export async function orderColumn(url,e,setDetails,fetchData = false){
 
    let {value,name} = ""
    if (!e.target) {
        console.log(url+'/'+e.params+'/'+e.search);
        name  = e.params
        value = ""
    
    }else{
        value  = e.target.value
        name = e.target.name
        console.log(url+name+'/'+value);
    }

    try {
        const response = await http.get(url+value+'/'+name);
        console.log(response.data.datos);
        setDetails(response.data.datos);
    
    }catch (error) {
        console.log(error);
        // console.log(link)
        fetchData(url)
    }
}

export function paginator(listPaginate,fetch) { 

    return Object.values(listPaginate).map((elemento,index) => (
        <li className="page-item mt-3" key={index}>
        {
            elemento.url !== null ? <button id={elemento.label} className={elemento.active ? 'active page-link' : 'page-link'} onClick={()=> {fetch(elemento.url)}} tabIndex={elemento.id}>{elemento.label ===  "pagination.next"  ? "siguiente" : elemento.label === "pagination.previous" ? "anterior" : elemento.label}</button> : null
        }
        </li>
    ))
}

