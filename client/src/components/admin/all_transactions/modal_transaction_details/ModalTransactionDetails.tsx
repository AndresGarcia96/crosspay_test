"use client";

import React from "react";
import { Card, Col, Descriptions, Row } from "antd";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import { ITransaction } from "@/utils/interfaces/transaction.interface";

interface ModalTransactionDetailsProps {
  transaction?: ITransaction | null;
  titleDescription?: string;
}

const ModalTransactionDetails: React.FC<ModalTransactionDetailsProps> = ({
  transaction,
  titleDescription = "Detalles de la Transacción",
}) => {
  if (!transaction) return null;

  return (
    <Col xs={24} sm={24} md={24} lg={24} style={{ padding: 0, margin: 0 }}>
      <Card
        title={titleDescription}
        style={{ marginTop: 22, marginBottom: 7, padding: 0 }}
      >
        <Row
          gutter={24}
          justify="center"
          align="middle"
          style={{ padding: 0, margin: 0 }}
        >
          <Col xs={24} sm={12} md={8} lg={8} style={{ padding: 7 }}>
            <Descriptions
              size="small"
              column={1}
              labelStyle={{ ...titleStyleCss, width: 180 }}
              contentStyle={subtitleStyleCss}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label="ID de Transacción">
                {transaction.id}
              </Descriptions.Item>
              <Descriptions.Item label="Usuario que Paga">
                {transaction.paying_username}
              </Descriptions.Item>
              <Descriptions.Item label="Tipo de Identificación">
                {transaction.paying_user_id_type}
              </Descriptions.Item>
              <Descriptions.Item label="Número de Identificación">
                {transaction.paying_user_id_number}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} style={{ padding: 7 }}>
            <Descriptions
              size="small"
              column={1}
              labelStyle={{ ...titleStyleCss, width: 180 }}
              contentStyle={subtitleStyleCss}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label="Tipo de Moneda">
                {transaction.currency_type}
              </Descriptions.Item>
              <Descriptions.Item label="Monto Transferido">
                {transaction.transfer_amount}
              </Descriptions.Item>
              <Descriptions.Item label="Descripción">
                {transaction.description}
              </Descriptions.Item>
              <Descriptions.Item label="Número de Tarjeta">
                {transaction.card_number}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} style={{ padding: 7 }}>
            <Descriptions
              size="small"
              column={1}
              labelStyle={{ ...titleStyleCss, width: 180 }}
              contentStyle={subtitleStyleCss}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label="Fecha de Expiración">
                {transaction.card_expiration}
              </Descriptions.Item>
              <Descriptions.Item label="CVV">
                {transaction.card_cvv}
              </Descriptions.Item>
              <Descriptions.Item label="Creado en">
                {new Date(transaction.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Actualizado en">
                {new Date(transaction.updatedAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ModalTransactionDetails;
