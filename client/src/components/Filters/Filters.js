import React from "react";

export default function Filters({
  value,
  onChange,
  filterColumns,
  searchColumn,
  setSearchColumn,
}) {
  const handleChange = (column) => {
    const checked = searchColumn.includes(column);
    setSearchColumn((prev) => {
      return checked
        ? prev.filter((selectedColumn) => selectedColumn !== column)
        : [...prev, column];
    });
  };
  return (
    <div>
      <input type="text" value={value} onChange={(e) => onChange(e)} />
      {filterColumns &&
        filterColumns.map((column) => {
          return (
            <label>
              <input
                type="checkbox"
                checked={searchColumn.includes(column)}
                onChange={(e) => handleChange(column)}
                style={{ display: column === "userId" ? "none" : "inline" }}
              />
              {column !== "userId" ? column : null}
            </label>
          );
        })}
    </div>
  );
}
