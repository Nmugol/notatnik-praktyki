import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen , faTrash} from "@fortawesome/free-solid-svg-icons";

interface Project {
    id: number;
    name: string;
    description: string;
    refresh: () => void;
}

export default function ProjectCard({
    name,
    description,
    id,
    refresh,
}: Project) {
    const navigator = useNavigate();
    const deleteProject = async () => {
        const response = await fetch(`http://127.0.0.1:5000/project/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error while deleting project");
        }
        refresh();
    };

    return (
        <div className="object">
            <div className="name">{name}</div>
            <div className="description">{description}</div>
            <div className="buttons-container">
                <button
                    className="open-button"
                    onClick={() => navigator(`/open_project/${id}`)}
                >
                    <FontAwesomeIcon icon={faFolderOpen} />
                </button>
                <button
                    className="delete-button"
                    onClick={() => deleteProject()}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}
