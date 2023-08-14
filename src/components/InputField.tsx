import { useRef } from "react";
import "../style.css";

interface props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            className="formulaire"
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur();
            }}
        >
            <input
                type="text"
                placeholder="Entrez une tache"
                value={todo}
                ref={inputRef}
                onChange={(e) => setTodo(e.target.value)}
                className="formulaire__input"
            />
            <button type="submit" className="formulaire__btn ">
                +
            </button>
        </form>
    );
};

export default InputField;