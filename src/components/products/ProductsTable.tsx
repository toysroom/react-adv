import { Product } from "../../models/Product";
import { Status } from "../../models/Status";

function ProductsTable( { columns, data, onBtn1, onBtn2 }: { columns: string[], data: Product[], onBtn1: (product: Product) => void, onBtn2: (product: Product) => void } ) {
   return (
        <table className="table">
            <thead>
                <tr>
                    {
                        columns.map( (column, index) => {
                            return <th key={index}>{ column }</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map( (el: Product, index) => {
                        return (
                            <tr key={index}>
                                <td>{ index+1 }</td>
                                <td>{ el['name'] }</td>
                                <td>{ el.cod }</td>
                                <td>{ el.price }</td>
                                <td>{ el.size }</td>
                                <td><button className="btn btn-primary" onClick={ () => onBtn2(el) }>Modifica</button></td>
                                <td><button className="btn btn-danger" onClick={ () => onBtn1(el) }>
                                    { el.destroy === Status.loading ? 'Cancellazione in corso...' : 'Cancella'}    
                                </button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
   ) 
}

export default ProductsTable;