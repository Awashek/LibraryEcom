import { useAppContext } from "../contexts/AppContext";

const UserProfile = () => {
    return (
        <div className="flex flex-col items-center py-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-blue-900">
                <img
                    src="/api/placeholder/128/128"
                    alt="User Profile"
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="mt-4 text-xl font-medium">Full Name</h3>
        </div>
    );
};

export default UserProfile;