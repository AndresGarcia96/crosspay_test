"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";

import {
  getItem,
  getItemSpin,
} from "@/helpers/get_item_menu_dashboard_layout/get_item_menu_dashboard_layout";

import { FaMoneyBillTransfer } from "react-icons/fa6";

import { setStateUser } from "@/redux/features/user/userSlice";

import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout_admins/enums/item_names_and_keys.enums";

export const useMenuItems = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.user.id_number
  );

  useEffect(() => {
    if (!idNumberUserSessionState && idNumberUserSession) {
      dispatch(
        setStateUser({ field: "id_number", value: idNumberUserSession })
      );
    }
  }, [idNumberUserSessionState, idNumberUserSession]);

  const menuItems = useMemo(() => {
    if (!idNumberUserSessionState || !idNumberUserSession) {
      return [getItemSpin("spinner")];
    }

    return [
      getItem(
        ItemNames.ITEM_ALL_TRANSACTIONS,
        ItemKeys.ITEM_ALL_TRANSACTIONS_KEY,
        <FaMoneyBillTransfer size={17} />
      ),
    ].filter(Boolean);
  }, []);

  return menuItems;
};
