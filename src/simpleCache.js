export default class SimpleCache {
    constructor() {
        this.lastSyncedDate = null;
        this.lockFlag = false;
        
        this._entities = {
            byId: {},
            all: [],
        };
    }

    get entities() {
        return this._entities;
    }

    addItems = (items = []) => {
        items.forEach(item => {
            let index = this._entities.all.findIndex(entity => entity.id === item.id);

            if (index < 0) {
                index = 0;
            }

            this._entities.all[index] = item;
            this._entities.byId[item.id] = item;
        });
    }

    getItemById = (id) => {
        return this._entities.byId[id];
    }

    // TODO Add more sophisticated cache validation logic
    getIsCacheValid() {
        return this.lastSyncedDate != null;
    }

    invalidateCache() {
        this.lastSyncedDate = null;
    }

    updateCache() {
        this.lastSyncedDate = new Date(); // now
    }

    static invalidateAll() {
        entities.forEach(e => e.invalidateCache());
    }
}


/**
the other way we can solve cahcing is usage of redux's state as a cache storage

small example of usage
actions/accounts.js file

import todaq from "todaq-api-helper";

const cache = new SimpleCache();

export function getAccountsActionCreator(notifications) {
    cache.updateCache();
    return {
        type: ActionType.GET_NOTIFICATIONS,
        notifications,
    };
}

export function getAccount(force = false) {
    return dispatch => {
        if (force) {
            cache.invalidateCache();
        }

        if (cache.getIsCacheValid()) {
            return dispatch(createGetNotificationsAction());
        }

        if (!cache.lock()) {
            return;
        }

        todaq.routes.accounts.get.accountsAll()
            .then(resp => dispatch(getAccountsActionCreator(resp.data)))
            .then(() => cache.unlock());
    }
}

 */
