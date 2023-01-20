import { useState, useEffect, useRef } from 'react';
import { getPost } from '../services/posts';

export const usePost = ({mostrarError}) =>  {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cargandoMasPost,setCargandoMasPost] = useState(false);
    const [todosLosPostCargados,setTodosLosPostCargados] = useState(false);
    const mounted = useRef(true);
    
    const revisarSiHayMasPosts = (posts) => {
        setTodosLosPostCargados(posts.length % 3 !== 0);
    };
    
    useEffect(()=>{
        console.log("effect-posts");
        const getData = async () => {
            
            setLoading(true);
            
            try{
                
                const data = await getPost();
                
                if(mounted.current){
                    
                    setPosts(data);
                    
                }
                
            }catch(e){
                
                mostrarError("Hubo un problema al obtener los posts");
                // console.log(e);
                
            }finally{
                
                if(mounted.current){
                    
                    setLoading(false);
                    
                }
                
            }
            
        }
        
        getData();
        
        return () => {
            mounted.current = false;
        }
        
    },[mostrarError]);
    
    useEffect(()=>{
        console.log(posts.length);
        revisarSiHayMasPosts(posts);
    },[posts]);

    return {
        posts,
        setPosts,
        loading,
        cargandoMasPost,
        setCargandoMasPost,
        todosLosPostCargados
    }
    
}