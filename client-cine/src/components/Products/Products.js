import React from "react";
import Product from "./Product";
import './Product.css'

export default function Products({productsInfo}) {
    return (
        <div className="ProductsInfo">
            {productsInfo && productsInfo &&
                productsInfo.map((e, index) => (
                    <Product
                        key={index}
                        id={e.id}
                        nombreProducto={e.nombreProducto}
                        imagenProducto={e.imagenProducto}
                        precio={e.precio}
                        stock={e.stock}
                        priceID={e.priceID}
                    />
                ))}
        </div>
    );
}
