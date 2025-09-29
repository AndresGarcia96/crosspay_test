import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransaction } from "@/utils/interfaces/transaction.interface";
import { IUser } from "@/utils/interfaces/user.interface";

const initialState: ITransaction = {
  id: "",
  currency_type: null,
  transfer_amount: 0,
  description: "",
  paying_username: "",
  paying_user_id_type: null,
  paying_user_id_number: "",
  card_number: "",
  card_expiration: "",
  card_cvv: "",
  user: {} as IUser,
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setStateTransaction: (
      state,
      action: PayloadAction<{
        field?: keyof ITransaction;
        value?: any;
        fieldValues?: Partial<ITransaction>;
      }>
    ) => {
      if (action.payload.fieldValues) {
        Object.assign(state, action.payload.fieldValues);
      } else if (action.payload.field) {
        (state as any)[action.payload.field] = action.payload.value;
      }
    },

    setAllTransactionState: (_state, action: PayloadAction<ITransaction>) => {
      return { ...action.payload };
    },

    resetTransaction: () => {
      return { ...initialState };
    },
  },
});

export const { setStateTransaction, setAllTransactionState, resetTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
