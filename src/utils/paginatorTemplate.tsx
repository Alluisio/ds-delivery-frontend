import React from "react";
import { Dropdown } from "primereact/dropdown";
import {
  PaginatorCurrentPageReportOptions,
  PaginatorRowsPerPageDropdownOptions,
  PaginatorTemplateOptions,
} from "primereact/paginator";

export const paginatorTemplate: PaginatorTemplateOptions = {
  layout: "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
  RowsPerPageDropdown: ({ value, onChange, options }: PaginatorRowsPerPageDropdownOptions) => {
    return (
      <div className="paginator-right-content flex flex-row align-items-center">
        <span style={{ color: "var(--text-color)", userSelect: "none" }}>Itens por página: </span>
        <Dropdown value={value} options={options} onChange={onChange} appendTo={document.body} />
      </div>
    );
  },
  CurrentPageReport: ({ element }: PaginatorCurrentPageReportOptions) => {
    return (
      <>
        <span className="p-paginator-current paginator-right-content">{element}</span>
      </>
    );
  },
  FirstPageLink: undefined,
  LastPageLink: undefined,
  NextPageLink: undefined,
  PageLinks: undefined,
  PrevPageLink: undefined,
  JumpToPageInput: undefined,
};
