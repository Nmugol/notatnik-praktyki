import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from "../components/Note";
import NavBar from "../components/NavBar";

export default function OpenProject() {
    const { id } = useParams<{ id: string }>();
    const navigator = useNavigate();

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        GetNotsInProejrct();
    }, [id]);

    return (
        <div>
            <NavBar />
            <div className="add-project">
                <button onClick={() => navigator(`/note_editor/${id}`)}>
                    <FontAwesomeIcon icon={faPlus} /> Note
                </button>
            </div>
            <div className="list-of-objects">
                {notes.map((note: any) => (
                    <Note
                        key={note.id}
                        name={note.title}
                        content={note.content}
                        id={note.id}
                        refresh={GetNotsInProejrct}
                    />
                ))}
            </div>
        </div>
    );

    function GetNotsInProejrct() {
        const fetchData = async () => {
            const response = await fetch(
                `http://127.0.0.1:5000/project_all_notes?project_id=${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error while fetching notes");
            }
            const data = await response.json();
            setNotes(data);
        };

        fetchData();
    }
}
