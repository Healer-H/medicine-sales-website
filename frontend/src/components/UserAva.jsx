import { React } from "react";

const UserAva = ({ src, handleClick }) => {
    return (
        <button className="rounded-full w-10 h-10">
            <img
                src={src}
                alt="User Avatar"
                className="rounded-full w-10 h-10 cursor-pointer"
                onClick={handleClick}
            />
        </button>
    );
}

export default UserAva;