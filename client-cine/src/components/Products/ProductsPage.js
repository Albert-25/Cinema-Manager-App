import React, { useState, useEffect } from "react";
import "./ProductsPage.css";
import { useAuth } from "../../contexts/AuthContext";
import { AllProducts, postBuy } from "../../store/actions";
import NavBar from "../Navbar/navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import Products from "./Products";
import { Container } from "react-bootstrap";

const ProductsPage = () => {
    const { itemsCarrito } = useAuth();

    const dispatch = useDispatch();
    const ProductosTotales = useSelector((state) => state.ProductAll);
    const UrlBuy = useSelector((state) => state.cartUrl);
    console.log("Estado cargado", UrlBuy);
    const [container, setContainer] = useState([]);
    useEffect(() => {
        dispatch(AllProducts());
    }, [dispatch]);
    console.log("items carrito", itemsCarrito);

    /*React.useEffect(() => {
        if (container.length === 0) {
            console.log(ProductosTotales)
            setContainer(ProductosTotales);
        }
    }, [ProductosTotales, container]);*/

    React.useEffect(() => {
        if (container.length === 0) {
            console.log(ProductosTotales);
            setContainer(ProductosTotales);
        }
    }, [ProductosTotales]);

    function handleOnClick() {
        alert("done");
        dispatch(postBuy(itemsCarrito));
        localStorage.setItem("compra", JSON.stringify(UrlBuy[0]));
    }
    let variable = 1;
    if (
        UrlBuy &&
        UrlBuy[0] !== undefined &&
        UrlBuy[0].length > 30 &&
        variable === 1
    ) {
        window.open(UrlBuy[0]);
        variable = variable - 1;
    }

    return (
        <>
            <NavBar />
            <Container className="products_main_container" fluid="ls">
                <Products
                    className="Product__Productos"
                    productsInfo={container}
                ></Products>
            </Container>

            <button onClick={handleOnClick}>Submitr</button>
            <div>
                <div>
                    {itemsCarrito &&
                        itemsCarrito.map((item) => {
                            return <p>{item.name}</p>;
                        })}
                </div>
            </div>
        </>
    );
};
export default ProductsPage;
