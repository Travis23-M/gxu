import axios from "axios"
import { useState } from "react"
import Footer from "./Footer"


const Addproduct=()=>{
    const[product_name,setProductName]=useState("")
    const[product_description,setProductdescription]=useState("")
    const[product_cost,setProduct_cost]=useState("")
    const[product_photo,setProduct_photo]=useState("")
    const[loading,setLoading]=useState("")
    const[error,setError]=useState("")
    const[success,setSuccess]=useState("")

    // information update
     const submit= async (e) => {
        e.preventDefault()
        setLoading("Please wait...")
        
    // Create form data object
        const data= new FormData()
        // append our updated hooks
        data.append("product_name",product_name)
        data.append("product_description",product_description)
        data.append("product_cost",product_cost)
        data.append("product_photo",product_photo)
        try {
            const response=await axios.post("https://travisjohn23.pythonanywhere.com/api/add_product",data)
            //clearhook
            setLoading("")
            setSuccess(response.data.message)


        } catch (error) {
            //clear hook
            setLoading("")
            // update hook
            setError(error.message)
            
        }
     }



    return(
        <div  className="row justify-content-center mt-4" >
            <div className='col-md-6 card shadow p-4 text-center'>
                <form onSubmit={submit}>
                    <span className="text-info" >{loading} </span>
                    <span className="text-success">{success}</span>
                    <span className="text-danger">{error}</span>
                    <h5 className="head" > Add Products</h5>
                    <input type="text" placeholder="Product name" value={product_name} onChange={(e)=>setProductName(e.target.value)} className="form-control" required/>
                    <br />
                 <textarea name="" id="" rows={2} placeholder="product description" required value={product_description} onChange={(e)=>setProductdescription(e.target.value)} className="form-control"></textarea>
                    <br />
                    <input type="number" placeholder="Product cost" required value={product_cost} onChange={(e)=>setProduct_cost(e.target.value)} className="form-control"/>
                    <br />
                    <h6>Browse/Upload Product Image</h6>
                    <input type="file" className="form-control" accept="image/*" onChange={(e)=>setProduct_photo(e.target.files[0])} required/>
                    <br />
                    <button type="submit" className="btn btn-primary  text-white" >Add Product</button>
                </form>
                
                </div> 
              
                
         </div>
     
    )
  
}

export default Addproduct