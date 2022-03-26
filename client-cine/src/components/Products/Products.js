import React from "react";
import Product from "./Product";

export default function Products({productsInfo}) {
    return (
        <div className="productsInfo">
            {productsInfo && productsInfo &&
                productsInfo.map((e, index) => (
                    <Product
                        key={index}
                        id={e.id}
                        nombreProducto={e.nombreProducto}
                        imagenProducto={e.imagenProducto}
                        precio={e.precio}
                        stock={e.stock}
                    />
                ))}
        </div>
    );
}
