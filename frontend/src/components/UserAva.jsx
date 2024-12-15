import { React } from "react";

const UserAva = ({ src }) => {
    return (
        <button className="rounded-full w-10 h-10">
            <img
                src={src}
                alt="User Avatar"
                className="rounded-full w-10 h-10"
            />
        </button>
    );
}

export default UserAva;