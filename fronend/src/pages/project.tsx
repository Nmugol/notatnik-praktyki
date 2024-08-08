import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ProjectCard from "../components/ProjectCard";
import NavBar from "../components/NavBar";

// Definiujemy interfejs dla projektu
interface Project {
    id: number; // lub string, w zależności od tego, co zwraca Twój backend
    name: string;
    description: string;
}

export default function Project() {
    const user_id = localStorage.getItem("user_id");
    const [projects, setProjects] = useState<Project[]>([]); // Typujemy stan
    const [project_name, setProjectName] = useState<string>("");
    const [project_description, setProjectDescription] = useState<string>("");

    useEffect(() => {
        GetProject();
    }, [user_id]);

    const addProject = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: project_name || "New Project",
                    description:
                        project_description || "This is a new project ...",
                    user_id: user_id,
                }),
            });

            if (!response.ok) {
                throw new Error("Error while adding project");
            }

            const data: Project = await response.json();
            setProjects((prevProjects) => [...prevProjects, data]); // Update state with the new project
            setProjectName("");
            setProjectDescription("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="add-project">
                <label>Name </label>
                <input
                    type="text"
                    value={project_name}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="New project ..."
                />
                <label>
                    Description 
                </label>
                <input
                    type="text"
                    value={project_description}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Project about ..."
                    maxLength={100}
                />
                <button onClick={addProject}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <h1 className="heading">Projects:</h1>
            <div className="list-of-objects">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        id={project.id}
                        refresh={GetProject}
                    />
                ))}
            </div>
        </div>
    );

    function GetProject() {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/project?user_id=${user_id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Error while fetching projects");
                }

                const data: Project[] = await response.json();
                setProjects(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }
}
