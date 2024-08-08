import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
export default function NoteEditor() {
    const { id } = useParams<{ id: string }>();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const user_id = localStorage.getItem("user_id");

    const saveNote = async () => {
        const response = await fetch(`http://127.0.0.1:5000/note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, user_id, project_id: id }),
        });
        if (!response.ok) {
            throw new Error("Error while saving note");
        }

        window.history.back();
    };

    return (
        <div>
            <div className="buttons-container-edit">
                <button className="open-button" onClick={() => saveNote()}>Save <FontAwesomeIcon icon={faFloppyDisk} /></button>
                <button className="delete-button" onClick={() => window.history.back()}>Cancel <FontAwesomeIcon icon={faTrash} /></button>
            </div>
            <div className="note-editor-container">
                    <input
                        className="note-title-input"
                        type="text"
                        placeholder="Title here ..."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                <textarea
                    className="note-content"
                    placeholder="Text here ..."
                    onChange={(e) => setContent(e.target.value)}
                    rows={30}
                ></textarea>
            </div>
        </div>
    );
}
