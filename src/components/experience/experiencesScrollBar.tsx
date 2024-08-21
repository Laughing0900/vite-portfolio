import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useExperiences } from "@/components/experience/hooks/useExperiences";

type ExperiencesScrollBarProps = {
    selected: number;
};

const ExperiencesScrollBar = ({ selected }: ExperiencesScrollBarProps) => {
    const { companies } = useExperiences();
    const { filedCompanies } = useMemo(() => {
        return {
            filedCompanies: companies.filter((company) => company.description),
        };
    }, [companies]);
    return (
        <div
            className="absolute right-0 top-40 hidden w-1 flex-col gap-4 overflow-clip text-[88px] lg:flex"
            style={{
                height: `${filedCompanies.length}em`,
            }}
        >
            {filedCompanies.map((_, index) => {
                return (
                    <motion.div
                        key={"exp_bar_" + index}
                        className="relative w-full rounded-full bg-gray-700/50"
                        style={{
                            height: `calc(100% / ${filedCompanies.length})`,
                        }}
                        animate={{
                            transition: {
                                duration: 0.15,
                            },
                        }}
                    >
                        <AnimatePresence>
                            {selected === index && (
                                <motion.span
                                    className="absolute inset-0 block h-full w-full rounded-full lg:bg-white"
                                    layoutId="hoverBackground"
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.15,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            duration: 0.15,
                                        },
                                    }}
                                    key={"desktop_exp_bar" + index}
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ExperiencesScrollBar;
