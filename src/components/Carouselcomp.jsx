import { Carousel } from "bootstrap"
import { Link, useNavigate } from "react-router-dom"


const Carouselcomp=()=>{
    return(
        <section className="row">
            <div className="col-md-12">
                {/*carousel contents*/}
                <div class="carousel slide" data-bs-slide="carousel" id="mycarousel1">
                    {/*Wrappers for our images*/}
                    <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="images/c4.jpg" alt="" className="w-100 d-block" height=""/>
                            </div>
                            <div className="carousel-item">
                                <img src="images/c2.jpg" alt="" className="w-100 d-block" height=""/>
                            </div>  
                            <div className="carousel-item">
                                <img src="images/c3.jpg" alt="" className="w-100 d-block" height=""/>
                            </div> 
                            
                            
                    </div> 
                    {/*controllers*/}
                    <Link to="#mycarousel1" data-bs-slide="prev" className="carousel-control-prev">
                            <span class="carousel-control-prev-icon bg-success"></span>
                         </Link>
                         <Link to="#mycarousel1" data-bs-slide="next" className="carousel-control-next">
                            <span className="carousel-control-next-icon bg-success"></span>
                         </Link>
                    
                </div>

            </div>
        </section>
    )
}

 export default Carouselcomp
    
                
       