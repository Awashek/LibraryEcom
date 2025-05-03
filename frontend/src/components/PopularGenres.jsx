import React from 'react';

const PopularGenres = () => {
    const genres = [
        {
            name: "Science",
            image: "https://parade.com/.image/t_share/MTkwNTgwODczNzM5ODM5MzU2/life.jpg",
            reads: "100 reads"
        },
        {
            name: "Romance",
            image: "https://cristinharber.com/wp-content/uploads/2018/04/evolution-of-the-romance-novel-history_cropped-2.png",
            reads: "100 reads"
        },
        {
            name: "Fantasy",
            image: "https://w0.peakpx.com/wallpaper/769/266/HD-wallpaper-fantasy-world-anime-draw-fantacy-nature.jpg",
            reads: "100 reads"
        },
        {
            name: "Mystery",
            image: "https://media.istockphoto.com/id/837345268/photo/noir-movie-character.jpg?s=612x612&w=0&k=20&c=WGaAh-xWelYuEoxhUE69T4e4k45Bp-MTC6KLG7edN8Y=",
            reads: "100 reads"
        },
        {
            name: "Fiction",
            image: "https://assets3.thrillist.com/v1/image/2791995/381x254/crop;webp=auto;jpeg_quality=60.jpg",
            reads: "100 reads"
        }
    ];

    return (
        <div className="w-full bg-white py-12 px-4">
            <h2 className="text-3xl font-normal text-center mb-12 tracking-wider">POPULAR GENRE & THEMES</h2>

            <div className="flex flex-wrap justify-center gap-6">
                {genres.map((genre, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-56 h-72 relative mb-2">
                            <div className="absolute inset-0 rounded-full border border-gray-200 border-dashed"></div>
                            <div className="absolute inset-2 overflow-hidden rounded-full">
                                <img
                                    src={genre.image}
                                    alt={genre.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-medium mt-2">{genre.name}</h3>
                        <p className="text-gray-500 text-sm">-{genre.reads}-</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularGenres;