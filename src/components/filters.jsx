import './filter.css';
function Filters({ sortOption, setSortOption, SORT_OPTIONS }) {
  return (
    <select
      value={sortOption || ""} //opció activa en el desplegable
      onChange={(e) => setSortOption(e.target.value)} //actualitza el valor de sortOption
      className="filter-select"
    >
      <option value="" disabled>Filters</option>
<option value={SORT_OPTIONS.DATA_DESC}>📅 Most recent</option>
<option value={SORT_OPTIONS.DATA_ASC}>📅 Oldest</option>
<option value={SORT_OPTIONS.TEMPS_DESC}>⏱️ Longest</option>
<option value={SORT_OPTIONS.TEMPS_ASC}>⏱️ Shortest</option>
<option value={SORT_OPTIONS.VALORACIO_DESC}>⭐ Highest rated</option>
<option value={SORT_OPTIONS.VALORACIO_ASC}>⭐ Lowest rated</option>

    </select>
  );
}

export default Filters;
