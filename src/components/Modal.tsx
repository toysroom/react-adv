import { DevTool } from "@hookform/devtools"
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessageField from "./ErroreMessageField";
import { Dispatch, SetStateAction } from "react";
import React from "react";
import { Status } from "../models/Status";
import { Product } from "../models/Product";

type FormValues = {
    name: string;
    cod: string;
    price: number;
    size: string;
}

function Modal( {modalToggle, errorsModal, onSubmit, closeModal, isSubmitSuccessful, defaultValues}: { modalToggle: boolean, errorsModal: string, onSubmit: SubmitHandler<Partial<FormValues>>, closeModal: Dispatch<SetStateAction<boolean>>, isSubmitSuccessful: Status, defaultValues: Partial<Product> } ) {
    const newProductInitialState = {
        name: '',
        cod: '',
        price: 0,
        size: '',
    };

    const { register, handleSubmit, control, reset, formState: { errors: formErrors } } = useForm<Partial<FormValues>>({
        defaultValues: newProductInitialState,
    });

    React.useEffect(() => {
        if (defaultValues) {
            reset(() => ({ ...defaultValues }));
        }
    }, [defaultValues]);

    React.useEffect(() => {
        if (isSubmitSuccessful === Status.fulfilled) {
          reset(newProductInitialState);
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <>
        <div 
        className={ `modal ${ modalToggle ? '' : 'fade' }` } 
        style={ { display: modalToggle ? 'block' : 'none'} }>   
        <div className="modal-dialog">
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Aggiungi prodotto</h1>
                        <button type="button" className="btn-close" onClick={ () => closeModal(false) }></button>
                    </div>
                    <div className="modal-body">
                        {
                            errorsModal && <div className="alert alert-danger">
                                { errorsModal }
                            </div>
                        }

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name"
                                {
                                    ...register('name', {
                                        required: 'Il campo nome è obbligatorio',
                                    })
                                } 
                            />
                            <ErrorMessageField message={formErrors.name?.message} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cod" className="form-label">Codice</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="cod"
                                {
                                    ...register('cod', {
                                        required: 'Il campo cod è obbligatorio',
                                    })
                                }
                            />
                            <ErrorMessageField message={formErrors.cod?.message} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Prezzo</label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="price"
                                {
                                    ...register('price', {
                                        required: 'Il campo price è obbligatorio',
                                    })
                                } 
                            />
                            <ErrorMessageField message={formErrors.price?.message} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="size" className="form-label">Misura</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="size"
                                {
                                    ...register('size', {
                                        required: 'Il campo size è obbligatorio',
                                    })
                                } 
                            />
                            <ErrorMessageField message={formErrors.size?.message} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={ () => closeModal(false) }>Close</button>
                        <button className="btn btn-primary">Salva</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
            <DevTool control={control} />
            </>
    )
}

export default Modal