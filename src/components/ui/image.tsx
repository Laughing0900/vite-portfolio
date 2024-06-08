type ImageProps = React.HTMLProps<HTMLImageElement>;

const Image: React.FC<ImageProps> = ({ ...props }) => {
    return <img {...props}></img>;
};
export default Image;
