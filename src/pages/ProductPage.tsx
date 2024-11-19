import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, /*addProduct, updProduct, */delProduct, selectAllProducts } from "../slices/productsSlice";
import { AppDispatch } from '../app/store';
import { Status } from "../models/Status";
import ProductsTable from "../components/products/ProductsTable";
import { SubmitHandler } from "react-hook-form";
import { Product } from "../models/Product";
import Toast from "../components/Toast";
import Modal from "../components/Modal";



function ProductPage() {
    const dispatch: AppDispatch = useDispatch();

    // const { data: products, status, errors, insert, update, destroy, errorsModal } = useSelector( selectAllProducts );

    const { data, status, errors, destroy } = useSelector( selectAllProducts );

    // const [modalToggle, setModalToggle] = useState(false);

    const [toastToggle, setToastToggle] = useState({
        toggle: false,
        message: '',
        status: '',
    });

    // const newProductInitialState = {
    //     name: '',
    //     cod: '',
    //     price: 0,
    //     size: '',
    // };
    // const [modalValues, setModalValues] = useState(newProductInitialState);


    useEffect( () => {
        dispatch( fetchProducts() );
    }, []);

    // useEffect( () => {
    //     if (insert === Status.fulfilled) {
    //         setModalToggle(false);
    //         setToastToggle({
    //             toggle: true,
    //             message: 'Prodotto aggiunto con successo',
    //             status: 'success',
    //         });
    //     }
    // }, [insert]);


    // useEffect( () => {
    //     if (update === Status.fulfilled) {
    //         setModalToggle(false);
    //         setToastToggle({
    //             toggle: true,
    //             message: 'Prodotto modificato con successo',
    //             status: 'success',
    //         });
    //     }
    // }, [update]);

    useEffect( () => {
        if (toastToggle.toggle) {
            setTimeout( () => {
                setToastToggle({
                    toggle: false,
                    message: '',
                    status: '',
                });
            }, 4000);
        }
    }, [toastToggle]);



    useEffect( () => {
        if (destroy === Status.fulfilled) {
            setToastToggle({
                toggle: true,
                message: "Prodotto cancellato con successo",
                status: "success",
            })
        }
        if (destroy === Status.rejected) {
            setToastToggle({
                toggle: true,
                message: "Errore nella cancellazione del prodotto",
                status: "danger",
            })
        }
    }, [destroy]);


    // // const newProductInitialState = {
    // //     name: '',
    // //     cod: '',
    // //     price: 0,
    // //     size: '',
    // // };


    // const saveProductHandler: SubmitHandler<Partial<FormValues>> = (newProduct) => {
    //     if (newProduct.id) {
    //         dispatch( updProduct(newProduct) );
    //     }
    //     else {
    //         dispatch( addProduct(newProduct) );
    //     }
    // }

    const delButtonHandler = (product: Product) => {
        dispatch( delProduct(product) );
    }

    // const addButtonHandler = () => {
    //     setModalToggle(true);
    //     setModalValues(newProductInitialState);
    // }

    // const editButtonHandler = (product: Product) => {
    //     setModalToggle(true);
    //     setModalValues(product);
    // }


    // /* FORM VALIDATION */
    // type FormValues = {
    //     id: number;
    //     name: string;
    //     cod: string;
    //     price: number;
    //     size: string;
    // }
    // /* FORM VALIDATION */

    // const addButton = (
    //     <div className="my-4">
    //         <button 
    //             className="btn btn-primary"
    //             onClick={ addButtonHandler }
    //             >Aggiungi prodotto
    //         </button>
    //     </div>
    // );


    let content;

    if (status === Status.loading ) {
        content = <p>Caricamento in corso...</p>
    }
    else if (status === Status.rejected ) {
        content = <p>{ errors }</p>
    }
    else if (status === Status.empty ) {
        content = (
            <>
                {/* { addButton }  */}
                <p>Nessun prodotto presente</p>
            </>
        )
    }
    else if (status === Status.fulfilled ) {
        const columns = ['#', 'Nome', 'Codice', 'Prezzo', 'Misura', 'Modifica', 'Cancella'];
        
        content = (
            <>
                {/* { addButton }  */}
                
                <ProductsTable 
                    columns={columns} 
                    data={data} 
                    onBtn1={delButtonHandler} 
                    // onBtn2={editButtonHandler}
                />
                
                {/* <Modal 
                    modalToggle={modalToggle} 
                    errorsModal={errorsModal} 
                    onSubmit={saveProductHandler}
                    closeModal={setModalToggle}
                    isSubmitSuccessful={insert}
                    defaultValues={modalValues}
                />
*/}
                <Toast toastToggle={toastToggle.toggle} message={toastToggle.message} status={toastToggle.status} /> 
            </>
        )
    }

    return (
        <>
            <h1>Prodotti</h1>
            { content }
        </>
    )
}

export default ProductPage;