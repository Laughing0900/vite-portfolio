import Image from "next/image";

export default Image;

export function cloudinaryLoader({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality?: number;
}) {
    const params = [
        "f_auto",
        "c_limit",
        `w_${width}`,
        `q_${quality || "auto"}`,
    ];
    return `https://res.cloudinary.com/dicmdiiov/image/upload/${params.join(",")}/v1/Pawn/portfolio${src}`;
}
