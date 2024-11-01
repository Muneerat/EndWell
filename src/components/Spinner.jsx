export default function Spinner({
    size = 4,
    isBase = true,
    spin = false,
    className=''
}) {
    let spinnerSize = {
        4: 'w-4 h-4',
        5: 'w-5 h-5',
        6: 'w-6 h-6',
        7: 'w-7 h-7',
        8: 'w-8 h-8',
        9: 'w-9 h-9',
    }[size];

    let classes = `${spinnerSize} animate-spin border-t border-r rounded-full`;

    classes += isBase
        ? ' border-base-600'
        : ' border-white';

    return (
        <>
            {
                spin && 
                <div className={`${classes} ${className}`}>
                    <span className="sr-only">processing</span>
                </div>

            }
        </>
    )
}