import Project from "@/components/project/Project";
import { useEffect } from "react";

const ProjectPage = () => {
  useEffect(() => {
    window.snap.addElement(document.getElementById("footer") as HTMLElement, {
      align: ["start", "end"],
    });
  }, []);
  return (
    <main>
      <Project />
    </main>
  );
};

export default ProjectPage;
