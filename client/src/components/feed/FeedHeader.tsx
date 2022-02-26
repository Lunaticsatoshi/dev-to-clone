const FeedHeader = () => {
  return (
    <header className="feed-header flex justify-between items-center">
      <h1>Posts</h1>
      <nav>
        <a href="/#">Feed</a>
        <a href="/#">Week</a>
        <a href="/#">Month</a>
        <a href="/#">Infinity</a>
        <a href="/#">Latest</a>
      </nav>
      <select id="dropdown-select" className="dropdown">
        <option value="Feed" defaultValue={"Feed"}>
          Feed
        </option>

        <option value="Week">Week</option>
        <option value="Month">Month</option>
        <option value="Year">Feed</option>
        <option value="Infinity">Infinity</option>
      </select>
    </header>
  );
};

export default FeedHeader;
