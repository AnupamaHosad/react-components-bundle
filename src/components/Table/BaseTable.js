import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import utils from "../../core/utils";

const DefaultNoDataComponent = () => {
    return (<div className="RCB-no-data">No data found</div>)
};

/* eslint-disable react/prop-types */

const getTDValue = ({ columnValue, rowData = {}, columnConfig = {}, tdProps = {}}) => {
    const { key, valueFormatter, ColumnComponent, componentProps = {} } = columnConfig;
    let tdValue = columnValue;

    if (typeof(valueFormatter) === "function") {
        tdValue = valueFormatter({value: columnValue, record: rowData});
    } else if (ColumnComponent) {
        tdValue = <ColumnComponent record={rowData} {...componentProps} />
    }

    return <td key={key} {...tdProps}>{tdValue}</td>
}

const ExpandableTR = (props) => {
    const { isEven, rowData, columnConfigs, ExpandedRowComponent } = props;
    const [ isExpanded, setIsExpanded ] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const className = "RCB-tr RCB-parent-row " + (isEven ? "RCB-even-tr" : "RCB-odd-tr");

    return (<Fragment>
        <tr className={className}>
            {/* add column for expand toggle icon */}
            {getTDValue({
                columnValue: "",
                columnConfig: {
                    key: "expandIcon"
                },
                tdProps: {
                    onClick: toggleExpanded,
                    className: isExpanded ? "expand-open" : "expand-close"
                }
            })}
            {columnConfigs.map(configObj => {
                const { key } = configObj;
                return getTDValue({
                    columnValue: rowData[key],
                    rowData,
                    columnConfig: configObj,
                    tdProps: {
                        onClick: toggleExpanded
                    }
                });
            })}
        </tr>
        {isExpanded && <tr className="RCB-expanded-row">
            {/* +1 is to accomodate the expand toggle icon column */}
            <td colSpan={columnConfigs.length + 1}>
                <ExpandedRowComponent parentRecord={rowData} />
            </td>
        </tr>}
    </Fragment>);
};

ExpandableTR.propTypes = {
    ExpandedRowComponent: PropTypes.any.isRequired // TODO : check for a React Component
};

const TR = (props) => {
    const { rowData, columnConfigs, isEven } = props;
    const className = "RCB-tr " + (isEven ? "RCB-even-tr" : "RCB-odd-tr");

    return (<tr className={className}>
        {columnConfigs.map(configObj => {
            const { key } = configObj;
            return getTDValue({columnValue: rowData[key], rowData, columnConfig: configObj});
        })}
    </tr>);
};

const BaseTable = (props) => {
    const {
        className,
        records,
        columnConfigs,
        idAttribute,
        isExpandableTable,
        ExpandedRowComponent,
        noDataComponent,
        sortByConfig
    } = props;
    const { sortBy, sortOrder } = sortByConfig;

    const RowComponent = isExpandableTable ? ExpandableTR : TR;
    
    if (records.length === 0) {
        return noDataComponent;
    } else {
        return (<table className={`RCB-table ${className}`}>
            <thead>
                <tr>
                    {/* add empty column for expand icon */}
                    {isExpandableTable && <th key="expandIcon" className="RCB-th RCB-expand-column"></th>}
                    {columnConfigs.map(columnObj => {
                        const { key, label, sortable } = columnObj;
                        let className = "RCB-th";
                        let thAttrs = {};

                        if (sortable) {
                            className += " RCB-th-sortable";
                            
                            if (sortBy === key) {
                                className += ` RCB-th-${sortOrder.toLowerCase()}`;
                            } else {
                                className += " RCB-th-sort";
                            }

                            thAttrs = {
                                onClick: () => {
                                    props.onSort(columnObj);
                                }
                            }
                        }

                        return (<th className={className} key={key} {...thAttrs}>{label}</th>);
                    })}
                </tr>
            </thead>
            <tbody>
                {records.map((rowData, index)=> {
                    return <RowComponent key={rowData[idAttribute]} 
                                        isEven={utils.isEven(index)}
                                        rowData={rowData} 
                                        columnConfigs={columnConfigs} 
                                        ExpandedRowComponent={ExpandedRowComponent} />
                })}
            </tbody>
        </table>)
    }
};

/* eslint-enable react/prop-types */

BaseTable.propTypes = {
    /** Pass any additional classNames to Table component */
    className: PropTypes.string,
    /** Array containing table row data */
    records: function(props, propName) {
        if (props["paginationType"] == "CLIENT") {
            if (!props[propName]) {
                return new Error("Please provide the table records for paginationType 'CLIENT'!");
            }

            if (Object.prototype.toString.call(props[propName]) !== "[object Array]") {
                return new Error("'records' must be an array");
            }
        }
    },
    /** Array containing the table columns config */
    columnConfigs: PropTypes.array.isRequired,
    /** ID attribute key to use when rendering the dropdown items */
    idAttribute: PropTypes.string,
    /** set to "true" if table rows are expandable */
    isExpandableTable: PropTypes.bool,
    /** Component to be rendered on expanding a row */
    ExpandedRowComponent: PropTypes.oneOfType([
        PropTypes.instanceOf(Element),
        PropTypes.func
    ]),
    /** Component to be rendered if the table has no data */
    noDataComponent: PropTypes.any
}

BaseTable.defaultProps = {
    className: "",
    records: [],
    idAttribute: "id",
    isExpandableTable: false,
    noDataComponent: <DefaultNoDataComponent />
};

export default BaseTable;