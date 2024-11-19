function Toast( {toastToggle, message, status}: { toastToggle: boolean, message: string, status: string} ) {
    return (
        <div className="toast-container 
            position-absolute 
            top-0 end-0" style={ { right: '20px!important'}}>
            <div className={`toast align-items-center text-bg-${status} border-0 ${ toastToggle ? 'show': '' }`}>
                <div className="d-flex">
                    <div className="toast-body">
                        { message }
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}

export default Toast;