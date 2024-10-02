import MainLayout from "@/components/layout/mainLayout";

const ProjectDetailsSkeleton: React.FC = () => {
    return (
        <MainLayout>
            <section className="grid-template py-10" id="certificate">
                {/* Left */}
                <div className="col-span-full lg:col-span-3">
                    <div className="rounded-8 w-full border-2 border-gray-500 p-10">
                        <h2 className="text-wrap font-cyborg text-2xl leading-normal">
                            Project
                        </h2>
                        <div className="mt-4 h-8 w-3/4 animate-pulse rounded bg-gray-700"></div>
                        <div className="mt-2 h-6 w-1/2 animate-pulse rounded bg-gray-700"></div>
                    </div>
                </div>

                {/* right */}
                <div className="rounded-8 col-span-full h-fit overflow-clip lg:col-span-5">
                    <div className="rounded-8 mb-10 h-96 w-full animate-pulse bg-gray-700"></div>

                    <div className="rounded-8 border-2 border-gray-500 bg-white/10 p-10 drop-shadow backdrop-blur-xl">
                        <div className="mb-4 h-4 w-full animate-pulse rounded bg-gray-700"></div>
                        <div className="mb-4 h-4 w-3/6 animate-pulse rounded bg-gray-700"></div>
                        <div className="h-4 w-3/5 animate-pulse rounded bg-gray-700"></div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProjectDetailsSkeleton;
