import React from "react";

const Biography=({imageUrl})=>{
    return(
        <div className="container biography">
            <div className="banner">
                <img src={imageUrl} alt="aboutImg"></img>
            </div>
            <div className="banner">
                <p>Biography</p>
                <h3>Who We Are</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
                    , dolore consequatur perferendis suscipit aut, culpa non, ipsam 
                    nihil fuga aspernatur incidunt. Unde, ab. Placeat voluptatem nostrum,
                     amet fuga illo, iusto vitae nesciunt consequatur rerum vel, dolorem nisi
                      a? Ad neque numquam provident recusandae voluptates sunt sequi magnam veniam
                       suscipit tempora.
                </p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum nulla vitae saepe. Delectus atque, voluptates ex totam alias ab dolore.

                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, numquam.</p>
            </div>
        </div>
    )
}
export default Biography