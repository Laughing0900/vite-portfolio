import Image from "@/components/ui/image";

const ProjectCardSkeleton = () => {
    return (
        <div className="relative h-fit w-[400px] rounded-lg border-2 border-foreground bg-black/5 p-10 backdrop-blur-sm sm:w-[600px] md:w-[800px]">
            <div className="aspect-video max-h-[50vh]">
                <div className="h-full max-h-[60vh] animate-pulse rounded-md border-foreground bg-slate-700 object-cover" />
            </div>
            <div className="mt-10">
                <p className="h-[1em] w-1/2 animate-pulse rounded-full bg-slate-700 text-2xl"></p>
                <p className="mt-2 h-[1em] w-1/3 animate-pulse rounded-full bg-slate-700 text-lg"></p>
            </div>
            <Image
                className="absolute bottom-3 right-3 aspect-square w-12 opacity-10 drop-shadow md:w-20"
                src={`images/pawn-white.svg`}
                alt={"my-logo"}
                width={48}
                height={48}
            />
        </div>
    );
};

export default ProjectCardSkeleton;
