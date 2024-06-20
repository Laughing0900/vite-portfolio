import { useCertificates } from "@/components/certificate/hooks/useCertificates";
import { useExperiences } from "@/components/experience/hooks/useExperiences";
import { useProjects } from "@/components/project/hooks/useProjects";

const useOnFetching = () => {
    const { isLoading: CertLoading } = useCertificates();
    const { isLoading: ExpLoading } = useExperiences();
    const { isLoading: ProjLoading } = useProjects();

    // return { isLoading: CertLoading || ExpLoading || ProjLoading };
    return { isLoading: false };
};

export default useOnFetching;
