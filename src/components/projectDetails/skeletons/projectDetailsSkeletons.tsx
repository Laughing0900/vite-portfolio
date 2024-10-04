import MainLayout from "@/components/layout/mainLayout";

const ProjectDetailsSkeleton: React.FC = () => {
    return (
        <MainLayout>
            <section className="grid-template py-10" id="certificate">
                {/* Left */}
                <div className="col-span-full lg:col-span-3">
                    <div className="w-full rounded-8 border-2 border-gray-500 p-10">
                        <h2 className="text-wrap font-cyborg text-2xl leading-normal">
                            Project
                        </h2>
                        <div className="mt-4 h-8 w-3/4 animate-pulse rounded bg-gray-400"></div>
                        <div className="mt-2 h-6 w-1/2 animate-pulse rounded bg-gray-400"></div>
                    </div>
                </div>

                {/* right */}
                <div className="col-span-full h-fit space-y-10 lg:col-span-5">
                    <div className="mb-10 h-96 w-full animate-pulse rounded-8 bg-gray-400"></div>

                    <div className="space-y-5 rounded-8 border-2 border-gray-500 bg-white/10 p-10 drop-shadow backdrop-blur-xl">
                        <div className="h-4 w-full animate-pulse rounded bg-gray-400"></div>
                        <div className="h-4 w-3/6 animate-pulse rounded bg-gray-400"></div>
                        <div className="h-4 w-3/5 animate-pulse rounded bg-gray-400"></div>
                        <div className=""></div>
                        <hr />
                        <div className="h-4 w-full animate-pulse rounded bg-gray-400"></div>
                        <div className="h-4 w-3/6 animate-pulse rounded bg-gray-400"></div>
                        <div className="h-4 w-3/5 animate-pulse rounded bg-gray-400"></div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="h-[2em] w-[4em] animate-pulse rounded-full bg-gray-400 px-3 py-1"></div>
                        <div className="h-[2em] w-[4em] animate-pulse rounded-full bg-gray-400 px-3 py-1"></div>
                        <div className="h-[2em] w-[4em] animate-pulse rounded-full bg-gray-400 px-3 py-1"></div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProjectDetailsSkeleton;
