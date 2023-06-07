import { setupModal } from '@near-wallet-selector/modal-ui';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Big from 'big.js';
import { set } from 'lodash';
import Router from 'next/router';
import { createSelector } from 'reselect';

import { reset as resetSegment } from '@/utils/analytics';

import handleAsyncThunkStatus from '../../reducerStatus/handleAsyncThunkStatus';
import initialStatusState from '../../reducerStatus/initialState/initialStatusState';

const LS_ACCOUNT_ID = 'near-social-vm:v01::accountId:';
const SLICE_NAME = 'account';

const initialThunksStatusState = {
  status: {
    requestSignInWithWallet: initialStatusState.status,
    logOut: initialStatusState.status,
    refreshAllowance: initialStatusState.status,
  },
};

const initialState = {
  accountVM: {},
  accountId: '',
  availableStorage: '0',
  storageCostPerByte: '',
  ...initialThunksStatusState,

  // TODO: move to a separate slice that will be responsible for loaders
  showContent: false,
};

export const checkLoggedIn = createAsyncThunk(`${SLICE_NAME}/checkLoggedIn`, (props, { dispatch }) => {
  const optimisticAccountId = window.localStorage.getItem(LS_ACCOUNT_ID) || props?.accountId || '';

  dispatch(setAccountId({ accountId: optimisticAccountId }));
  dispatch(setShowContent({ showContent: true }));
});

export const handleSignIn = createAsyncThunk(
  `${SLICE_NAME}/handleSignIn`,
  ({ account, storageCostPerByte }, { dispatch }) => {
    dispatch(
      setAccount({
        ccountId: account?.ccountId,
        loading: account?.loading,
        pretendAccountId: account?.pretendAccountId,
        signedAccountId: account?.signedAccountId,
        state: account?.state,
        storageBalance: account?.storageBalance,
      }),
    );
    dispatch(setAccountId({ accountId: account.accountId }));

    // TODO: check the implementation
    storageCostPerByte && dispatch(setStorageCostPerByte({ storageCostPerByte: storageCostPerByte.toString() }));

    // TODO: move to utils
    const availableStorage =
      account.storageBalance && storageCostPerByte
        ? Big(account.storageBalance.available).div(storageCostPerByte).toString()
        : '0';

    dispatch(setAvailableStorage({ availableStorage }));
  },
);

export const logOut = createAsyncThunk(`${SLICE_NAME}/logOut`, async ({ near }, { dispatch }) => {
  if (!near) {
    return;
  }

  const wallet = await (await near.selector).wallet();
  wallet.signOut();
  near.accountId = null;
  dispatch(setInitialState());
  resetSegment();

  // TODO: check if it's necessary
  localStorage.removeItem('accountId');
});

export const requestSignInWithWallet = createAsyncThunk(`${SLICE_NAME}/requestSignInWithWallet`, async ({ near }) => {
  const selector = await near.selector;
  const wallet = setupModal(selector, { contractId: near.config.contractName });
  wallet.show();
});

export const requestSignIn = createAsyncThunk(`${SLICE_NAME}/requestSignIn`, async ({ queryParam }) => {
  // TODO: here handle redirecting back to the page that the user was on before redirect to Sign in page
  Router.push(`/signin${queryParam}`);
});

export const refreshAllowance = createAsyncThunk(`${SLICE_NAME}/refreshAllowance`, async (_, { dispatch }) => {
  alert("You're out of access key allowance. Need sign in again to refresh it");
  await dispatch(logOut());
  dispatch(requestSignIn());
});

const accountSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setAccountId: (state, { payload: { accountId } }) => set(state, ['accountId'], accountId),
    setShowContent: (state, { payload: { showContent } }) => set(state, ['showContent'], showContent),
    setAccount: (state, { payload }) => set(state, ['accountVM'], payload),
    setStorageCostPerByte: (state, { payload: { storageCostPerByte } }) =>
      set(state, ['storageCostPerByte'], storageCostPerByte),
    setAvailableStorage: (state, { payload: { availableStorage } }) =>
      set(state, ['availableStorage'], availableStorage),
    setInitialState: (state) => set(state, [], initialState),
  },
  extraReducers: (builder) => {
    handleAsyncThunkStatus({
      asyncThunk: requestSignInWithWallet,
      buildStatusPath: () => ['requestSignInWithWallet'],
      builder,
    });
    handleAsyncThunkStatus({
      asyncThunk: logOut,
      buildStatusPath: () => ['logOut'],
      builder,
    });
    handleAsyncThunkStatus({
      asyncThunk: refreshAllowance,
      buildStatusPath: () => ['refreshAllowance'],
      builder,
    });
  },
});

export const { setShowContent, setInitialState, setAccountId, setAccount, setAvailableStorage, setStorageCostPerByte } =
  accountSlice.actions;

export default accountSlice;

// selectors
const selectAccountSlice = (state) => state[SLICE_NAME] || {};

export const selectAccountId = createSelector([selectAccountSlice], (account) => account.accountId);

export const selectIsSignedIn = createSelector([selectAccountId], (accountId) => !!accountId);

export const selectAvailableStorage = createSelector([selectAccountSlice], (account) => account.availableStorage);

export const selectShowContent = createSelector([selectAccountSlice], (account) => account.showContent);
