const SortRepos = ({ sortType, onSort }) => {
  const buttons = [
    { type: "recent", text: "Most recent" },
    { type: "stars", text: "Most stars" },
    { type: "forks", text: "Most forks" },
  ];
  return (
    <div className="flex justify-center lg:justify-end">
      {buttons.map((button) => (
        <button
          key={button.type}
          className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass ${
            sortType === button.type ? "border-blue-500" : ""
          }`}
          onClick={() => onSort(button.type)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default SortRepos;
