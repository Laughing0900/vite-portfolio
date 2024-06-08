type LinkProps = {
    children: React.ReactNode;
} & React.HTMLProps<HTMLAnchorElement>;

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
    return <a {...props}>{children}</a>;
};

export default Link;
