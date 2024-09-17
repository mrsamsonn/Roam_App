const Search = () => {
    return (
        <div className="flex items-center">
            <input
                placeholder="Things to do"
                className="rounded-l-lg border outline-none py-2 px-4 h-10"
            />
            <a href="#">
                <div className="rounded-r-lg bg-[#00c0fc] p-2 h-10 flex items-center hover:bg-[#00d6fc] transition duration-500">
                    <svg
                        className="h-6 w-6"
                        aria-labelledby="title desc"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 19.9 19.7"
                    >
                        <title id="title">Search Icon</title>
                        <desc id="desc">A magnifying glass icon.</desc>
                        <g className="search-path" fill="none" stroke="white">
                            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                            <circle cx="8" cy="8" r="7" />
                        </g>
                    </svg>
                </div>
            </a>
        </div>
    );
};

export default Search;
