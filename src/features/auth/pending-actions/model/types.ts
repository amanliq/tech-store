export type PendingActionType = "ADD_TO_CART";

export interface PendingAction {
  type: PendingActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  redirectTo?: string;
}
