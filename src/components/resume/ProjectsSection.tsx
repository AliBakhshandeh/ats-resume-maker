import { AddItemButton, RemoveItemButton } from "@/components/resume/EditActions";
import { EditableLink } from "@/components/resume/EditableLink";
import { EditableText } from "@/components/resume/EditableText";
import { ResumeSection } from "@/components/resume/ResumeSection";
import type { Project } from "@/types/resume";
import { createEmptyProject } from "@/utils/createEmptyResumeItems";
import { renderEmphasizedText } from "@/utils/renderEmphasizedText";

interface ProjectsSectionProps {
  title: string;
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsSection({
  title,
  projects,
  onChange,
}: ProjectsSectionProps) {
  const enabledProjects = projects.filter(
    (project) => project.enabled !== false,
  );

  return (
    <ResumeSection title={title}>
      <div className="space-y-1.5">
        {enabledProjects.map((project) => {
          const projectIndex = projects.findIndex(
            (item) => item.name === project.name,
          );
          const enabledHighlights = project.highlights?.filter(
            (highlight) => highlight.enabled !== false,
          );
          const updateProject = (patch: Partial<Project>) => {
            if (projectIndex < 0) {
              return;
            }

            const nextProjects = [...projects];
            nextProjects[projectIndex] = { ...project, ...patch };
            onChange(nextProjects);
          };

          return (
            <article
              key={`${project.name}-${projectIndex}`}
              className="relative break-inside-avoid page-break-inside-avoid"
            >
              <div className="absolute -right-1 -top-1">
                <RemoveItemButton
                  label="Remove project"
                  onClick={() =>
                    onChange(
                      projects.filter((_, index) => index !== projectIndex),
                    )
                  }
                />
              </div>
              <h3 className="font-semibold text-slate-950">
                <EditableLink
                  label={project.name}
                  href={project.url ?? ""}
                  editorTitle="Edit project link"
                  labelFieldName="Project name"
                  hrefFieldName="Project URL"
                  onChange={({ label, href }) =>
                    updateProject({
                      name: label,
                      url: href || undefined,
                    })
                  }
                />
              </h3>
              <p className="leading-snug">
                <EditableText
                  value={project.description}
                  ariaLabel={`${project.name} project description`}
                  onChange={(description) => updateProject({ description })}
                />
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {(enabledHighlights ?? []).map((highlight, highlightUiIndex) => {
                  const highlightIndex =
                    project.highlights?.findIndex(
                      (item) => item === highlight,
                    ) ?? -1;

                  return (
                    <li
                      key={`${highlight.text}-${highlightUiIndex}`}
                      className="relative pr-4"
                    >
                      <EditableText
                        value={highlight.text}
                        ariaLabel={`${project.name} project bullet`}
                        onChange={(text) =>
                          updateProject({
                            highlights: project.highlights?.map((item, index) =>
                              index === highlightIndex
                                ? { ...item, text }
                                : item,
                            ),
                          })
                        }
                        renderValue={renderEmphasizedText}
                      />
                      <span className="absolute -right-1 top-0.5">
                        <RemoveItemButton
                          label="Remove bullet"
                          onClick={() =>
                            updateProject({
                              highlights: project.highlights?.filter(
                                (_, index) => index !== highlightIndex,
                              ),
                            })
                          }
                        />
                      </span>
                    </li>
                  );
                })}
              </ul>
              <AddItemButton
                label="Add bullet"
                onClick={() =>
                  updateProject({
                    highlights: [
                      ...(project.highlights ?? []),
                      { text: "Highlight what you built or shipped" },
                    ],
                  })
                }
              />
            </article>
          );
        })}
      </div>
      <AddItemButton
        label="Add project"
        onClick={() => onChange([...projects, createEmptyProject()])}
      />
    </ResumeSection>
  );
}
