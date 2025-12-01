// Filters.jsx
import './filter.css';
function Filters({ sortOption, setSortOption, SORT_OPTIONS }) {
  return (
    <select
      value={sortOption || ""}
      onChange={(e) => setSortOption(e.target.value)}
      className="filter-select"
    >
      <option value="" disabled>Filtres</option>
      <option value={SORT_OPTIONS.DATA_ASC}>Data estrena ↑</option>
      <option value={SORT_OPTIONS.DATA_DESC}>Data estrena ↓</option>
      <option value={SORT_OPTIONS.TEMPS_ASC}>Durada ↑</option>
      <option value={SORT_OPTIONS.TEMPS_DESC}>Durada ↓</option>
      <option value={SORT_OPTIONS.VALORACIO_ASC}>Valoració ↑</option>
      <option value={SORT_OPTIONS.VALORACIO_DESC}>Valoració ↓</option>
    </select>
  );
}

export default Filters;
