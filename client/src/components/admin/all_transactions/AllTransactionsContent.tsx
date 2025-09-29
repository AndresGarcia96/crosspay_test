"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import { tableColumnsTransactions } from "./table_columns_transactions/TableColumnsTransactions";
import ModalTransactionDetails from "./modal_transaction_details/ModalTransactionDetails";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { titleStyleCss } from "@/theme/text_styles";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";
import {
  setStateTransaction,
  resetTransaction,
} from "@/redux/features/transaction/transactionSlice";

import { useFindAllTransactionsQuery } from "@/redux/apis/transaction/transactionApi";

import { formatDate } from "@/helpers/format_date_and_hour/format_date_and_hour";
import { ITransaction } from "@/utils/interfaces/transaction.interface";

const AllTransactionsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<ITransaction | null>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const transactionsErrorsState = useAppSelector(
    (state) => state.transaction.errors
  );

  const {
    data: allTransactionsData,
    isLoading: allTransactionsLoading,
    isFetching: allTransactionsFetching,
    error: allTransactionsError,
    refetch: refecthAllTransactions,
  } = useFindAllTransactionsQuery(null);

  const transformedData = Array.isArray(allTransactionsData)
    ? allTransactionsData.map((req: any) => ({
        ...req,
      }))
    : [];

  const handleClickSeeMore = (record: ITransaction) => {
    dispatch(setTableRowId(""));

    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllTransactions();

    dispatch(setStateTransaction({ field: "id", value: record?.id }));
  };

  const handleButtonUpdate = () => {
    refecthAllTransactions();
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            transactionsErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessage?.toString() || `Acción realizada correctamente!`
          }
        />
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-transaction-details"}
          widthCustomModalNoContent={"96%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            dispatch(setTableRowId(""));

            refecthAllTransactions();

            setIsModalVisibleLocalState(false);

            setSelectedRowDataLocalState(null);

            dispatch(resetTransaction());
          }}
          contentCustomModal={
            <>
              <>
                <ModalTransactionDetails
                  transaction={selectedRowDataLocalState}
                />
              </>
            </>
          }
        />
      )}

      <CustomDashboardLayoutAdmins
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <h2
              className="all-transactions-title-table"
              style={{
                ...titleStyleCss,
                textAlign: "center",
                marginTop: "7px",
                marginBottom: "13px",
              }}
            >
              <b>Total de Transacciones</b>
            </h2>

            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsTransactions({
                handleClickSeeMore: handleClickSeeMore,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
              isLoading={
                !transformedData ||
                !allTransactionsData ||
                allTransactionsLoading ||
                allTransactionsFetching
              }
            />
          </div>
        }
      />
    </>
  );
};

export default AllTransactionsContent;
