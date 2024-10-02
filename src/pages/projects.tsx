import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/mainLayout";

const ProjectPage = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <MainLayout>
            <section className="grid-template" id="certificate">
                <div className="col-span-full md:col-span-4">
                    <h3>Project</h3>
                </div>
                <div className="col-span-¬ull md:col-span-8">
                    <span>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Suscipit natus deserunt voluptatibus quaerat
                        voluptas asperiores explicabo sapiente eius excepturi
                        neque! Atque quis nulla, corrupti alias ex dicta
                        molestiae quam! Ab.
                    </span>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProjectPage;
