const iconAttributes = (width = 24, height = 24, className = null, rest = {}) => ({
    width: `${width}`,
    height: `${height}`,
    viewBox: "0 0 24 24",
    className,
    ...rest
});

const renderIcon = (d, width, height, className = '', props = {}) => (
    <svg {...iconAttributes(width, height, className, props)} >
        <path fillRule="evenodd" clipRule="evenodd" d={d} />
    </svg>
);

export const xCircle = (...args) => renderIcon("M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM8.70711 16.7071L12 13.4142L15.2929 16.7071L16.7071 15.2929L13.4142 12L16.7071 8.70711L15.2929 7.29289L12 10.5858L8.70711 7.29289L7.29289 8.70711L10.5858 12L7.29289 15.2929L8.70711 16.7071Z", ...args);
export const CheckCircle = (...args) => renderIcon("M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM14.2929 7.29289L9 12.5858L6.70711 10.2929L5.29289 11.7071L9 15.4142L15.7071 8.70711L14.2929 7.29289Z", ...args);