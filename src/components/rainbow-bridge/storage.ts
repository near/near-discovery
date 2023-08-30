import type { Transfer,Transfers } from '@near-eth/client/dist/types';

const onChangeFns: Array<() => unknown> = [];

/**
 * Get raw transfers object from localStorage
 * @param key localStorage key
 */
function localStorageGet(key: string): Transfers {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
}

/**
 * Set raw transfers object in localStorage
 * @param key localStorage key
 * @param state Raw transfers object
 */
async function localStorageSet(key: string, state: Transfers): Promise<void> {
  if (!key || !state) {
    throw new Error('expected two arguments, only got one');
  }
  const serializedState = JSON.stringify(state);
  localStorage.setItem(key, serializedState);
  await Promise.all(onChangeFns.map((fn) => fn()));
}

const STORAGE_KEY = 'rainbow-bridge-transfers';

/**
 * Get all transfers object
 */
function getAllRaw(): Transfers {
  return localStorageGet(STORAGE_KEY);
}

/**
 * Get raw transfers, stored in localStorage as an object indexed by keys
 * Default sort: descending by ID, which corresponds with time created
 */
export function getAll(): Transfer[] {
  const raw = getAllRaw();
  return Object.keys(raw)
    .sort((a, b) => (b < a ? -1 : 1))
    .map((id) => raw[id]!);
}

/**
 * Get a transfer from, localStorage
 * @param id Transfer id
 */
export function get(id: string): Transfer | undefined {
  if (!id) throw new Error('must provide ID to fetch a single transfer');
  return getAllRaw()[id];
}

/**
 * Add a transfer to localStorage transfers
 * @param transfer Transfer to record
 */
export async function add(transfer: Transfer): Promise<void> {
  await localStorageSet(STORAGE_KEY, {
    ...getAllRaw(),
    [transfer.id]: transfer,
  });
}

/**
 * Update a given transfer in localStorage, returning a new object with the
 * updated version
 * @param transfer Transfer to update
 * @param withData Data to update the transfer with
 */
export async function update(transfer: Transfer, withData: object = {}): Promise<Transfer> {
  if (!transfer.id) {
    throw new Error('Cannot update transfer with no ID');
  }
  const updatedTransfer = { ...transfer, ...withData };
  // TODO: only update if !deepEqual(get(transfer.id), updatedTransfer)
  await localStorageSet(STORAGE_KEY, {
    ...getAllRaw(),
    [transfer.id]: updatedTransfer,
  });
  return updatedTransfer;
}

/**
 * Clear a transfer from localStorage
 * @param id Transfer if to delete
 */
export async function clear(id: string): Promise<void> {
  const transfers = getAllRaw();
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete transfers[id];
  await localStorageSet(STORAGE_KEY, transfers);
}

export async function replaceAll(transfers: Transfers): Promise<Transfers> {
  await localStorageSet(STORAGE_KEY, transfers);
  return transfers;
}

/**
 * Add a function to be called any time the data in storage is updated
 * @param fn Function to add
 */
export function onChange(fn: () => unknown): void {
  onChangeFns.push(fn);
}
