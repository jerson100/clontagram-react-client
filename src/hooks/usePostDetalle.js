const { useState, useEffect } = require("react");
const { getDetallePost } = require("../services/posts");

export const usePostDetalle  = (idPost, mostrarError) => {

    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null);
    const [isExistsPost, setIsExistsPost] = useState(false);

    useEffect(() => {

        setLoading(true);
        setIsExistsPost(false);
        // setPost(null);

        const getData = async ()=>{
            try{
                const postD = await getDetallePost(idPost);
                setPost(postD);
            }catch(e){
                if(e.response && (e.response.status === 404||e.response.status === 400)){
                    setIsExistsPost(true);
                }else{
                    mostrarError("Error interno en el sevidor");
                }
            }finally{
                setLoading(false);
            }
        };

        getData();

    }, [idPost, mostrarError]);

    return {
        post, 
        setPost,
        loading,
        isExistsPost
    };

};