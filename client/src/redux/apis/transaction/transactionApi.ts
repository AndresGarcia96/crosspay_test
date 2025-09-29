import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { ITransaction } from "@/utils/interfaces/transaction.interface";

const addTokenToRequest = async (headers: Headers, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const transactionApi = createApi({
  reducerPath: "transactionApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createTransaction: builder.mutation<
      ITransaction,
      { userId: string; data: Partial<ITransaction> }
    >({
      query: ({ userId, data }) => ({
        url: `createTransaction/${userId}`,
        method: "POST",
        body: data,
      }),
    }),

    findAllTransactions: builder.query<ITransaction[], null>({
      query: () => ({
        url: "findAllTransactions",
        method: "GET",
      }),
    }),

    findOneTransaction: builder.query<ITransaction, string>({
      query: (id) => ({
        url: `findOneTransaction/${id}`,
        method: "GET",
      }),
    }),

    updateTransaction: builder.mutation<
      ITransaction,
      { id: string; data: Partial<ITransaction> }
    >({
      query: ({ id, data }) => ({
        url: `updateTransaction/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    removeTransaction: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({
        url: `removeTransaction/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useFindAllTransactionsQuery,
  useFindOneTransactionQuery,
  useUpdateTransactionMutation,
  useRemoveTransactionMutation,
} = transactionApi;
