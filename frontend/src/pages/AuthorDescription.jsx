import React from "react";
import authorDescImg from "../assets/images/books/authordesc.png";


const AuthorDescription = () => {
  return (
    <main>
      {/* Blog Topic Section */}
      <section className="flex justify-center items-center mt-10">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-10 offset-1 w-10/12 mx-auto">
              <h1 className="text-3xl font-bold text-[#1E1E1E] text-center sm:text-2xl">
                AUTHOR INTERVIEW AND INSIGHTS
              </h1>
              <p className="text-base text-[#3D3D3D] text-center mt-2">
                Interview local authors or discuss the works of renowned authors, delving into their writing process,
                inspirations, and thoughts on literature.
              </p>
              <img
                src={authorDescImg}
                alt="authordesc image"
                className="w-full h-[330px] mt-2 mb-9 sm:h-auto md:h-[230px] lg:h-auto xl:h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Text Section */}
      <section className="flex flex-col">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-10 offset-1 w-10/12 mx-auto">
              <div className="parttwo">
                <p className="text-lg font-bold text-[#1E1E1E]">
                  Delving into Inspirations with [Author's Name].
                </p>
                <p className="text-base text-[#1E1E1E] mt-2">
                  An Interview with [Author's Name] In this intimate interview, we embark on a voyage through [Author's
                  Name]'s creative odyssey. From the spark that ignited their passion for writing to the experiences that
                  have carved the path for their literary endeavors, we unravel the layers of inspiration that have shaped
                  their unique voice. [Author's Name] generously shares anecdotes, triumphs, and tribulations, offering
                  readers a rare glimpse into the heart and mind of a{" "}
                  <a href="#" className="text-blue-500">
                    Storyteller.
                  </a>
                </p>
              </div>
              <br />
              <div className="parttwo">
                <p className="text-lg font-bold text-[#1E1E1E]">
                  Delving into Inspirations with [Author's Name].
                </p>
                <p className="text-base text-[#1E1E1E] mt-2">
                  An Interview with [Author's Name] In this intimate interview, we embark on a voyage through [Author's
                  Name]'s creative odyssey. From the spark that ignited their passion for writing to the experiences that
                  have carved the path for their literary endeavors, we unravel the layers of inspiration that have shaped
                  their unique voice. [Author's Name] generously shares anecdotes, triumphs, and tribulations, offering
                  readers a rare glimpse into the heart and mind of a storyteller
                </p>
              </div>
              <br />
              <div className="parttwo">
                <p className="text-lg font-bold text-[#1E1E1E]">
                  Delving into Inspirations with [Author's Name].
                </p>
                <p className="text-base text-[#1E1E1E] mt-2">
                  An Interview with{" "}
                  <a href="#" className="text-blue-500">
                    [Author's Name]
                  </a>{" "}
                  In this intimate interview, we embark on a voyage through [Author's Name]'s creative odyssey. From the
                  spark that ignited their passion for writing to the experiences that have carved the path for their
                  literary endeavors, we unravel the layers of inspiration that have shaped their unique voice. [Author's
                  Name] generously shares anecdotes, triumphs, and tribulations, offering readers a rare glimpse into the
                  heart and mind of a storyteller.
                </p>
              </div>
              <br />
              <div className="parttwo">
                <p className="text-lg font-bold text-[#1E1E1E]">
                  Delving into Inspirations with [Author's Name].
                </p>
                <p className="text-base text-[#1E1E1E] mt-2">
                  <ul className="list-disc pl-5">
                    <li>An Interview with [Author's Name] In this intimate interview</li>
                    <li>An Interview with [Author's Name] In this intimate interview</li>
                    <li>An Interview with [Author's Name] In this intimate interview</li>
                    <li>An Interview with [Author's Name] In this intimate interview</li>
                  </ul>
                </p>
              </div>
              <div className="parttwo">
                <p className="text-lg font-bold text-[#1E1E1E]">
                  Delving into Inspirations with [Author's Name].
                </p>
                <p className="text-base text-[#1E1E1E] mt-2">
                  An Interview with [Author's Name] In this intimate interview, we embark on a voyage through [Author's
                  Name]'s creative odyssey. From the spark that ignited their passion for writing to the experiences that
                  have carved the path for their literary endeavors, we unravel the layers of inspiration that have shaped
                  their unique voice. [Author's Name] generously shares anecdotes, triumphs, and tribulations, offering
                  readers a rare glimpse into the heart and mind of a storyteller
                  <a href="#" className="text-blue-500">
                    -the story teller
                  </a>
                </p>
              </div>
              <br />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthorDescription;