import { Checkbox } from "@mui/material";
import { CTableCell, CTableRow } from "../CTable";
import CellElementGenerator from "../ElementGenerators/CellElementGenerator";
import PermissionWrapperV2 from "../PermissionWrapper/PermissionWrapperV2";
import TableRowForm from "./TableRowForm";

const TableRow = ({
  row,
  key,
  rowIndex,
  control,
  onRowClick,
  onDeleteClick,
  selected,
  onSelectedRowChange,
  checkboxValue,
  onCheckboxChange,
  currentPage,
  columns,
  tableHeight,
  tableSettings,
  pageName,
  calculateWidth,
  watch,
  setFormValue,
  tableSlug,
  isChecked = () => {},
  formVisible,
  remove,
  limit = 10,
  backClr,
  onRejectedClick,
}) => {
  if (formVisible)
    return (
      <TableRowForm
        selected={selected}
        onSelectedRowChange={onSelectedRowChange}
        onDeleteClick={onDeleteClick}
        remove={remove}
        watch={watch}
        onCheckboxChange={onCheckboxChange}
        checkboxValue={checkboxValue}
        row={row}
        key={key}
        formVisible={formVisible}
        currentPage={currentPage}
        limit={limit}
        control={control}
        setFormValue={setFormValue}
        rowIndex={rowIndex}
        columns={columns}
        tableHeight={tableHeight}
        tableSettings={tableSettings}
        pageName={pageName}
        calculateWidth={calculateWidth}
        tableSlug={tableSlug}
        onRejectedClick={onRejectedClick}
      />
    );

  const colorCell = (num) => {
    if (tableSlug === "inventory") {
      if (num === 0) {
        return "rgba(3, 172, 19,0.5)";
      }
      if (num < 0 || num > 0) {
        return "rgba(254 , 0, 0,0.5)";
      }
    } else {
      return "transparent";
    }
  };
  const tabSlugWidth = (tabSlug) => {
    switch (tabSlug) {
      case "inventory":
        return "auto";
      case "price_list":
        return "auto";
      default:
        return "auto";
    }
  };
  return (
    <CTableRow
      onClick={() => {
        onRowClick(row, rowIndex);
      }}
      style={{ backgroundColor: colorCell(row?.difference) || "#fff" }}
    >
      <CTableCell align="center" className="data_table__number_cell">
        <span className="data_table__row_number">
          {(currentPage - 1) * limit + rowIndex + 1}
        </span>
        {onCheckboxChange && (
          <div
            className={`data_table__row_checkbox ${
              isChecked(row) ? "checked" : ""
            }`}
          >
            <Checkbox
              checked={isChecked(row)}
              onChange={(_, val) => onCheckboxChange(val, row)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </CTableCell>

      {columns.map((column, index) => (
        <CTableCell
          key={column.id}
          className={`overflow-ellipsis ${tableHeight}`}
          style={{
            minWidth: tabSlugWidth(tableSlug),
            padding: "0 4px",
            position: tableSettings?.[pageName]?.find(
              (item) => item?.id === column?.id
            )?.isStiky
              ? "sticky"
              : "relative",
            left: tableSettings?.[pageName]?.find(
              (item) => item?.id === column?.id
            )?.isStiky
              ? calculateWidth(column?.id, index)
              : "0",
            zIndex: tableSettings?.[pageName]?.find(
              (item) => item?.id === column?.id
            )?.isStiky
              ? "1"
              : "",
          }}
        >
          <CellElementGenerator field={column} row={row} />
        </CTableCell>
      ))}
      <PermissionWrapperV2
        tabelSlug={tableSlug}
        type={["update", "delete"]}
      ></PermissionWrapperV2>
    </CTableRow>
  );
};

export default TableRow;
