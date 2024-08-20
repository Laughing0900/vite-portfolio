type ExperienceDescProps = {
    description: string;
};

const ExperienceDesc = ({ description }: ExperienceDescProps) => {
    return (
        <ul
            dangerouslySetInnerHTML={{
                __html: description,
            }}
        >
            {}
        </ul>
    );
};

export default ExperienceDesc;
