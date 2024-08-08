import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface NoteProps {
    id: number;
    name: string;
    content: string;

    refresh: () => void;
}

export default function Note({ name, content, id, refresh }: NoteProps) {
    const deleteNote = async () => {
        const response = await fetch(`http://127.0.0.1:5000/note/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error while deleting note");
        }
        refresh();
    };

    return (
        <div className="object">
            <div className="name">{name}</div>
            <div className="description">{content}</div>
            <div className="buttons-container">
                <button className="delete-button" onClick={() => deleteNote()}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}
