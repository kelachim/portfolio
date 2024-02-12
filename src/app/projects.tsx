import React, { useState } from "react";
import { SiVuedotjs, SiTypescript, SiTailwindcss, SiFramer, SiGit, SiPostgresql, SiSupabase, SiNextdotjs, SiDocker, SiRust } from "react-icons/si";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

interface ProjectsProps {
  projects: Project[];
}

const TechnologyIcon = ({ tech }: { tech: string }) => {
    const icons: { [key: string]: React.FC<{}> | undefined } = {
        "Next.js": SiNextdotjs,
        Typescript: SiTypescript,
        TailwindCSS: SiTailwindcss,
        Framer: SiFramer,
        Git: SiGit,
        Postgresql: SiPostgresql,
        Supabase: SiSupabase,
        "Vue.js": SiVuedotjs,
        Docker: SiDocker,
        Rust: SiRust,
    };

    const IconComponent = icons[tech];

    return IconComponent ? <IconComponent /> : null;
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

    const { t } = useTranslation();
  
    const languages = [
      { code: "en", name: "English" },
      { code: "cs", name: "Čeština" },
    ];
  
    const handleLanguageChange = (lang: string) => {
      setSelectedLanguage(lang);
      changeLanguage(lang);
    };
  

  return (
    <main className="w-screen bg-black flex items-center flex-col text-center xl:text-left">
      <div className="text-[3rem] p-1 xs:p-12 block w-full lg:w-2/3">
        {t("myProjects")}
      </div>
      <div className="flex justify-center items-center flex-wrap w-full lg:w-10/12">
        {projects.map((project, index) => (
            <div
                key={index}
                className="w-full xs:w-[30rem] bg-gradient-to-bl from-neutral-900 to-neutral-950 border-neutral-700 border-[1.5px] rounded-xl p-2 xs:p-3 m-3 flex flex-col justify-start items-center"
            >
                <img src={project.image} alt="" className="w-full h-[14rem] block rounded-xl object-cover bg-black" />
                <div className="p-2 text-xl">{project.title}</div>
                <div className="p-1 text-center text-neutral-400 sm:h-20">
                {t(project.description)}
                </div>
                <div className="py-2 flex gap-2 flex-wrap items-center justify-center">
              {project.technologies.map((tech) => (
                <TechnologyIcon key={tech} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Projects;
