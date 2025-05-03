import { useState, useEffect } from 'react';
import TopSellers from '../components/TopSellers';
import RecommendedForYou from '../components/RecommendedForYou';
import { ArrowUpRight } from 'lucide-react';
const HomePage = () => {
    // Mock data for featured books
    const [featuredBooks, setFeaturedBooks] = useState([
        {
            id: 1,
            title: "I Want A Better Catastrophe",
            author: "Andrew Boyd",
            cover: "/images/catastrophe-book.jpg",
            price: 19.99,
            description: "Navigating the Climate Crisis with Grief, Hope, and Gallows Humor"
        },
        {
            id: 2,
            title: "The Mentor",
            author: "Sarah Hewlett",
            cover: "/images/mentor-book.jpg",
            price: 18.50,
            description: "How to Find a Mentor to Help Track Your Career"
        },
        {
            id: 3,
            title: "Time to Come",
            author: "Emily Leitch",
            cover: "/images/time-book.jpg",
            price: 21.99,
            description: "A New Story"
        },
        {
            id: 4,
            title: "The Silent Path",
            author: "Michael Roberts",
            cover: "/images/placeholder-book.jpg",
            price: 15.99,
            description: "A Journey Through Mindfulness"
        },
        {
            id: 5,
            title: "Ocean's Echo",
            author: "Lisa Chen",
            cover: "/images/placeholder-book.jpg",
            price: 23.50,
            description: "Tales from the Deep"
        }
    ]);

    // Categories
    const categories = [
        "Fiction", "Non-fiction", "Biography", "Self-help", "Science",
        "History", "Business", "Children's Books", "Poetry", "Cookbooks"
    ];

    // For placeholder images
    useEffect(() => {
        // This would normally be an API call to get real book data
        console.log("Home component mounted");
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                        <div>
                            <h1 className="text-xl font-thin tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block">New Releases This Week</span>
                            </h1>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500">
                                It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone
                            </p>
                            <div className="mt-8 flex space-x-4">
                                <button className='bg-black text-white py-2 px-6 rounded-full flex items-center gap-2'>
                                    Explore <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-0">
                            <div className="pl-4 -ml-16 -mr-16 sm:pl-6 md:-ml-16 lg:pl-0 lg:ml-0 lg:mr-0">
                                <img
                                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
                                    src="/images/placeholder-book.jpg"
                                    alt="BookShop collection"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TopSellers books={featuredBooks} />
            <RecommendedForYou books={featuredBooks} />
        </div>
    );
};

export default HomePage;