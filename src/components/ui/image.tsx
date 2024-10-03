type ImageProps = React.HTMLProps<HTMLImageElement>;

const Image: React.FC<ImageProps & { loading?: "lazy" | "eager" }> = ({
    ...props
}) => {
    return <img {...props}></img>;
};
export default Image;
