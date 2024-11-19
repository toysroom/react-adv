function ErrorMessageField( { message }: { message: string | undefined} ) {

    if (!message) return null;

    return (
        <div style={ { color: 'red' } }>
            {message}
        </div>
    )
}

export default ErrorMessageField