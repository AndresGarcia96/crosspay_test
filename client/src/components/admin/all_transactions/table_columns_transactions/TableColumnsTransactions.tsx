import { Button } from "antd";
import { FaRegEye } from "react-icons/fa";
import { ITransaction } from "@/utils/interfaces/transaction.interface";

interface TableColumnProps {
  handleClickSeeMore: (record: ITransaction) => void;
}

export const tableColumnsTransactions = ({
  handleClickSeeMore,
}: TableColumnProps) => {
  const idKey: keyof ITransaction = "id";
  const payingUserKey: keyof ITransaction = "paying_username";
  const idTypeKey: keyof ITransaction = "paying_user_id_type";
  const idNumberKey: keyof ITransaction = "paying_user_id_number";
  const currencyKey: keyof ITransaction = "currency_type";
  const amountKey: keyof ITransaction = "transfer_amount";
  const descriptionKey: keyof ITransaction = "description";
  const cardNumberKey: keyof ITransaction = "card_number";
  const cardExpKey: keyof ITransaction = "card_expiration";
  const cardCvvKey: keyof ITransaction = "card_cvv";
  const createdAtKey: keyof ITransaction = "createdAt";
  const updatedAtKey: keyof ITransaction = "updatedAt";

  return [
    {
      title: "ID DE TRANSACCIÓN",
      key: idKey,
      dataIndex: idKey,
      width: 250,
      ellipsis: true,
      searchable: true,
    },
    {
      title: "USUARIO QUE PAGA",
      key: payingUserKey,
      dataIndex: payingUserKey,
      width: 137,
      ellipsis: true,
      searchable: true,
    },
    {
      title: "TIPO DE IDENTIFICACIÓN",
      key: idTypeKey,
      dataIndex: idTypeKey,
      width: 173,
      ellipsis: true,
    },
    {
      title: "NÚMERO DE IDENTIFICACIÓN",
      key: idNumberKey,
      dataIndex: idNumberKey,
      width: 137,
      ellipsis: true,
      searchable: true,
    },
    {
      title: "MONEDA",
      key: currencyKey,
      dataIndex: currencyKey,
      width: 88,
      ellipsis: true,
    },
    {
      title: "MONTO",
      key: amountKey,
      dataIndex: amountKey,
      width: 103,
      ellipsis: true,
      sorter: (a: ITransaction, b: ITransaction) =>
        Number(a.transfer_amount) - Number(b.transfer_amount),
    },
    {
      title: "FECHA DE TRANSACCIÓN",
      key: createdAtKey,
      dataIndex: createdAtKey,
      width: 180,
      ellipsis: true,
      sorter: (a: ITransaction, b: ITransaction) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "VER MÁS",
      key: idKey,
      dataIndex: idKey,
      width: 77,
      fixed: "right" as "right",
      render: (_: any, record: ITransaction) => (
        <Button
          style={{
            display: "flex",
            flexFlow: "row wrap",
            color: "#F7F7F7",
            backgroundColor: "#015E90",
            borderRadius: 22,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingInline: 13,
            paddingBlock: 13,
          }}
          size="small"
          icon={<FaRegEye />}
          onClick={() => handleClickSeeMore(record)}
        />
      ),
    },
  ];
};
