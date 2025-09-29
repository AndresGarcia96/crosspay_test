"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

import { signOut } from "next-auth/react";
import { persistor } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";

import { Form, Input, Card, Select, InputNumber, Row, Col } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { useCreateTransactionMutation } from "@/redux/apis/transaction/transactionApi";
import { useGetAnyUserByIdNumberQuery } from "@/redux/apis/user/userApi";

import { CurrencyTypeEnum } from "@/utils/enums/currency_type/currency_type.enum";
import { IdentificationTypeEnum } from "@/utils/enums/id_type/identification_type.enum";

const UserCreateTransaction: React.FC<{}> = () => {
  const idNumberAdminState = useAppSelector((state) => state.user.id_number);

  const [showMessage, setShowMessage] = useState(false);

  const [form] = Form.useForm();

  const [createTransaction, { isLoading, error }] =
    useCreateTransactionMutation();

  const { data: userActiveDatabyIdNumberData } = useGetAnyUserByIdNumberQuery(
    idNumberAdminState,
    { skip: !idNumberAdminState }
  );

  const handleSubmit = async (values: any) => {
    try {
      setShowMessage(false);

      await createTransaction({
        userId: userActiveDatabyIdNumberData?.id || "",
        data: values,
      }).unwrap();

      form.resetFields();
      setShowMessage(true);
    } catch (err: any) {
      console.error(err);
      setShowMessage(true);
    }
  };

  const handleClickSignOut = async () => {
    await persistor.purge();

    await signOut();

    await redirect("/login");
  };

  return (
    <Card
      style={{
        width: "77%",
        minWidth: "405px",
        borderRadius: "13px",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
        padding: "13px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBlock: "7px",
        }}
      >
        <img
          src="/logos/crosspay-solutions-logo-color.svg"
          alt="Logo de CrossPay"
          style={{ height: "77px" }}
        />
      </div>

      <h2
        style={{
          ...titleStyleCss,
          textAlign: "center",
          fontSize: "22px",
          color: "#070707",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Realizar Transacción
      </h2>

      {showMessage && (
        <CustomMessage
          typeMessage={error ? "error" : "success"}
          message={
            error
              ? "Ocurrió un error al crear la transacción"
              : "Transacción creada exitosamente"
          }
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Nombre del Usuario"
              name="paying_username"
              rules={[
                { required: true, message: "Ingrese nombre del usuario" },
              ]}
            >
              <Input placeholder="Nombre completo" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  label="Tipo de Identificación"
                  name="paying_user_id_type"
                  rules={[
                    {
                      required: true,
                      message: "Seleccione tipo de identificación",
                    },
                  ]}
                >
                  <Select placeholder="Tipo">
                    {Object.values(IdentificationTypeEnum).map((idType) => (
                      <Select.Option key={idType} value={idType}>
                        {idType}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Número de Identificación"
                  name="paying_user_id_number"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese número de identificación",
                    },
                  ]}
                >
                  <Input placeholder="Número" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Número de Tarjeta"
              name="card_number"
              rules={[
                { required: true, message: "Ingrese número de tarjeta" },
                { min: 10, message: "Número mínimo 10 caracteres" },
                { max: 20, message: "Número máximo 20 caracteres" },
              ]}
            >
              <Input placeholder="Número de tarjeta" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  label="Fecha de Expiración"
                  name="card_expiration"
                  rules={[
                    { required: true, message: "Ingrese fecha de expiración" },
                    { min: 5, message: "Formato mínimo 5 caracteres (MM/AA)" },
                    { max: 5, message: "Formato máximo 5 caracteres (MM/AA)" },
                  ]}
                >
                  <Input placeholder="MM/AA" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="CVV"
                  name="card_cvv"
                  rules={[
                    { required: true, message: "Ingrese CVV" },
                    { min: 3, message: "CVV mínimo 3 caracteres" },
                    { max: 4, message: "CVV máximo 4 caracteres" },
                  ]}
                >
                  <Input placeholder="CVV" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Tipo de Moneda"
              name="currency_type"
              rules={[
                { required: true, message: "Seleccione tipo de moneda" },
                {
                  validator: (_, value) =>
                    Object.values(CurrencyTypeEnum).includes(value)
                      ? Promise.resolve()
                      : Promise.reject("Tipo de moneda inválido"),
                },
              ]}
            >
              <Select placeholder="Seleccione moneda">
                {Object.values(CurrencyTypeEnum).map((currency) => (
                  <Select.Option key={currency} value={currency}>
                    {currency}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Monto Transferido"
              name="transfer_amount"
              rules={[
                { required: true, message: "Ingrese el monto" },
                {
                  type: "number",
                  min: 0,
                  message: "El monto debe ser positivo",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Ingrese monto"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ type: "string", message: "Debe ser texto" }]}
            >
              <Input placeholder="Descripción de la transacción" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "center", marginTop: 22 }}>
          {isLoading ? (
            <CustomSpin />
          ) : (
            <CustomButton
              htmlTypeCustomButton="submit"
              typeCustomButton="primary"
              sizeCustomButton="middle"
              titleCustomButton="Crear Transacción"
              styleCustomButton={{ fontWeight: "bold", paddingInline: "31px" }}
              shapeCustomButton="round"
              onClickCustomButton={() => {}}
            />
          )}
        </Form.Item>
      </Form>

      <Col
        xs={24}
        sm={24}
        md={24}
        style={{ textAlign: "center", marginTop: 22 }}
      >
        <CustomButton
          htmlTypeCustomButton="submit"
          typeCustomButton="primary"
          sizeCustomButton="middle"
          titleCustomButton="Cerrar Sesión"
          styleCustomButton={{
            fontWeight: "bold",
            paddingInline: "31px",
            color: "red",
            borderColor: "red",
            backgroundColor: "white",
          }}
          shapeCustomButton="round"
          onClickCustomButton={handleClickSignOut}
        />
      </Col>
    </Card>
  );
};

export default UserCreateTransaction;
