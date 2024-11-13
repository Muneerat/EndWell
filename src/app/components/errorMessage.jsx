export default function ErrorMessage({ 
    error = null
}) {

    return (
        <>
            {
                error && <small className="block text-xs text-red-600 mt-0.5">
                    {error}ccc
                </small>
            }
        </>
    )
}