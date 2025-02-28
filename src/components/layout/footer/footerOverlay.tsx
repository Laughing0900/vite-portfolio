import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type FooterOverlayProps = {
    children: React.ReactNode;
};

const FooterOverlay = ({ children }: FooterOverlayProps) => {
    const footerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <motion.div
            ref={footerRef}
            className="pointer-events-none relative z-20 h-dvh bg-background will-change-[opacity]"
            style={{ opacity: opacity }}
        >
            {children}
        </motion.div>
    );
};

export default FooterOverlay;
