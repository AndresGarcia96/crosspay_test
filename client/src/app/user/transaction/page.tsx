"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

import { setStateUser } from "@/redux/features/user/userSlice";

import useAuthValidationAdmin from "@/utils/hooks/use_auth_validation_admin";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";

import UserCreateTransaction from "@/components/user/user_create_transaction/UserCreateTransaction";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";

const TransactionPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  useAuthValidationAdmin();

  const allowedRoles = [RolesEnum.USER];
  useRoleValidation(allowedRoles);

  const idNumberUserSessionState = useAppSelector(
    (state) => state.user.id_number
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!idNumberUserSessionState && status === "authenticated") {
      dispatch(
        setStateUser({ field: "id_number", value: idNumberUserSession })
      );
    }

    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login");
    }
  }, [status, idNumberUserSessionState]);

  return (
    <div className="transaction-page">
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserSessionState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="background-page"
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundImage:
                "url('/background/back-soft-blue-lines-wave.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2,
            }}
          />
          <div
            className="content-page"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingBlock: "31px",
            }}
          >
            <UserCreateTransaction />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
