import React from 'react';

const ProfilePage = () => {
    return (
        <div className='pl-6'>
            <div className="flex justify-between items-center p-8">
                <h1 className="text-5xl font-bold">Profile</h1>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-8">
                <div>
                    <label className="block text-gray-500 mb-2">First Name</label>
                    <input
                        type="text"
                        placeholder="First name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-500 mb-2">Last Name</label>
                    <input
                        type="text"
                        placeholder="Last name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-500 mb-2">Phone</label>
                    <input
                        type="text"
                        defaultValue="9803237760"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-500 mb-2">Email</label>
                    <input
                        type="email"
                        defaultValue="bookish@gmail.com"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-500 mb-2">Location</label>
                    <input
                        type="text"
                        defaultValue="Mid-Baneshwor"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-500 mb-2">City</label>
                    <input
                        type="text"
                        defaultValue="Kathmandu"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-500 mb-2">Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            defaultValue="**********"
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                        <button className="absolute right-3 top-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-500 mb-2">Confirm Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            defaultValue="**********"
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                        <button className="absolute right-3 top-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex mt-2 space-x-4 justify-start p-8">
                <button className="px-8 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
                    Save
                </button>
                <button className="px-8 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;