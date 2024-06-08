type ImageProps = React.HTMLProps<HTMLImageElement>;

const Image: React.FC<ImageProps>= ({children,...props})=>{
  return (
      <img {...props}>
      {children}
    </img>
  ) 
}

export default Image;