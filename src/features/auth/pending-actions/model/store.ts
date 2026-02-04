import { create } from "zustand";
import type { PendingAction } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";

interface PendingActionsState {
  actions: PendingAction[];
  addPendingAction: (action: PendingAction) => void;
  removePendingAction: (action: PendingAction) => void;
  updatePendingAction: (action: PendingAction) => void;
  getPendingActions: () => PendingAction[];
  clearPendingActions: () => void;
  hasPendingActions: () => boolean;
}

export const usePendingActionsStore = create<PendingActionsState>()(
  persist(
    (set, get) => ({
      actions: [],
      addPendingAction: (newAction) => {
        const actions = get().actions;
        const hasSameTypeAction = actions.find(
          (action) => action.type == newAction.type,
        );

        if (hasSameTypeAction) {
          get().updatePendingAction(newAction);
        } else {
          set({ actions: [...actions, newAction] });
        }
      },
      updatePendingAction: (newAction) => {
        const actions = get().actions;

        const updatedActions = actions.map((action) => {
          if (action.type == newAction.type) {
            return newAction;
          }
          return action;
        });

        set({ actions: updatedActions });
      },

      removePendingAction: (action) => {
        const actions = get().actions;
        const filteredActions = actions.filter(
          (act) => act.type !== action.type,
        );
        set({ actions: filteredActions });
      },

      clearPendingActions: () => {
        set({ actions: [] });
      },
      hasPendingActions: () => get().actions.length > 0,

      getPendingActions: () => get().actions,
    }),
    {
      name: "pending-actions-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        actions: state.actions,
      }),
    },
  ),
);
